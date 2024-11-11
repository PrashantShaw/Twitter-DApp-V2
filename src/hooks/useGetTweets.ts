"use client";
import { TWITTER_ABI } from "@/abi/TwitterAbi";
import { getEthNetworkId } from "@/lib/utils";
import {
  QUERY_KEYS_FROM_LOCALSTORAGE,
  TWITTER_CONTRACT_ADDRESS,
} from "@/utils/constants";
import { Tweet } from "@/utils/definitions";
import { useCallback, useMemo } from "react";
import { useReadContract } from "wagmi";
import useLocalStorage from "./useLocalStorage";

export const useGetTweets = () => {
  const {
    data: rawTweets,
    isPending,
    error,
    queryKey,
  } = useReadContract({
    address: TWITTER_CONTRACT_ADDRESS,
    abi: TWITTER_ABI,
    functionName: "getAllTweets",
    chainId: getEthNetworkId(),
  });
  const { setItem } = useLocalStorage();
  console.log("useGetTweets hook called", rawTweets);
  type RawTweet =
    Exclude<typeof rawTweets, undefined> extends readonly (infer U)[]
      ? U
      : never;

  const parseTweet = useCallback(
    (tweet: RawTweet): Tweet => ({
      id: tweet.id.toString(),
      author: tweet.author,
      content: tweet.content,
      timestamp: new Date(Number(tweet.timestamp) * 1000),
      likes: tweet.likes.toString(),
    }),
    []
  );
  const tweets = useMemo(() => {
    if (!rawTweets) return [];

    const newTweetsFirst = rawTweets.reduce((acc: Tweet[], tweet: RawTweet) => {
      const parsedTweet = parseTweet(tweet);
      const insertIndex = acc.findIndex(
        (t) => t.timestamp.getTime() < parsedTweet.timestamp.getTime()
      );

      insertIndex === -1
        ? acc.push(parsedTweet)
        : acc.splice(insertIndex, 0, parsedTweet);

      return acc;
    }, []);

    setItem(QUERY_KEYS_FROM_LOCALSTORAGE.getAllTweets, queryKey);
    return newTweetsFirst;
  }, [rawTweets, parseTweet, queryKey, setItem]);
  return { tweets, isPending, error, queryKey };
};
