"use client";
import { getRequiredEthChain, parseTweet } from "@/lib/utils";
import { LOCALSTORAGE_KEYS, TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { RawTweet, Tweet } from "@/utils/definitions";
import { useMemo } from "react";
import { useReadContract } from "wagmi";
import useLocalStorage from "./useLocalStorage";

export const useGetTweets = () => {
  const {
    data: rawTweets,
    isPending,
    error,
    queryKey,
  } = useReadContract({
    address: TWITTER_CONTRACT_CONFIG.address,
    abi: TWITTER_CONTRACT_CONFIG.abi,
    functionName: "getAllTweets",
    chainId: getRequiredEthChain().id,
    query: { enabled: true }, // optionally control the fetch whenever this hook is called
  });
  const { setItem } = useLocalStorage();
  console.log("useGetTweets hook called", rawTweets);

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

    setItem(LOCALSTORAGE_KEYS.getAllTweetsQueryKey, queryKey);
    return newTweetsFirst;
  }, [rawTweets, queryKey, setItem]);
  return { tweets, isPending, error, queryKey };
};
