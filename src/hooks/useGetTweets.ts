"use client";
import { TWITTER_ABI } from "@/abi/TwitterAbi";
import { TWITTER_CONTRACT_ADDRESS } from "@/utils/constants";
import { Tweet } from "@/utils/definitions";
import { useMemo } from "react";
import { sepolia } from "viem/chains";
import { useReadContract } from "wagmi";

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
    chainId: sepolia.id,
  });
  console.log("useGetTweets hook called", rawTweets);
  type RawTweet =
    Exclude<typeof rawTweets, undefined> extends readonly (infer U)[]
      ? U
      : never;

  const tweets = useMemo(
    () =>
      rawTweets
        ? rawTweets.reduce((acc: Tweet[], tweet: RawTweet) => {
            const parsedTweet = {
              id: tweet.id.toString(),
              author: tweet.author,
              content: tweet.content,
              timestamp: new Date(Number(tweet.timestamp) * 1000),
              likes: tweet.likes.toString(),
            };
            const insertIndex = acc.findIndex(
              (t) => t.timestamp.getTime() < parsedTweet.timestamp.getTime()
            );

            insertIndex === -1
              ? acc.push(parsedTweet)
              : acc.splice(insertIndex, 0, parsedTweet);

            return acc;
          }, [])
        : null,
    [rawTweets]
  );
  return { tweets, isPending, error, queryKey };
};
