"use client";

import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { useQueryClient } from "@tanstack/react-query";

const useLikeTweet = () => {
  const queryClient = useQueryClient();
  const { writeContract, data: hash, writeContractAsync } = useWriteContract();
  const { queryKey } = useGetTweets();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
  } = useWaitForTransactionReceipt({
    hash,
  });
  console.log(
    "from useLikeTweet >>>>>>>>>>",
    hash,
    data,
    isConfirming,
    isConfirmed
  );
  useEffect(() => {
    if (!isConfirmed) return;
    queryClient.invalidateQueries({ queryKey });
  }, [isConfirmed, queryClient, queryKey]);

  const likeTweet = useCallback(
    async (author: `0x${string}`, id: string) => {
      writeContract({
        address: TWITTER_CONTRACT_CONFIG.address,
        abi: TWITTER_CONTRACT_CONFIG.abi,
        functionName: "likeTweet",
        args: [author, BigInt(id)],
      });
    },
    [writeContract]
  );
  return { likeTweet, hash, data, isConfirming, isConfirmed };
};

export default useLikeTweet;
