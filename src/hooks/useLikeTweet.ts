"use client";

import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLikeTweet = () => {
  const queryClient = useQueryClient();
  const {
    writeContract,
    data: hash,
    error,
    writeContractAsync,
  } = useWriteContract();
  const { queryKey } = useGetTweets();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
  } = useWaitForTransactionReceipt({
    hash,
  });
  console.log("from useLikeTweet >>>>>>>>>>", hash, isConfirming, isConfirmed);
  useEffect(() => {
    if (!error) return;
    const shortErrorMessage = error.message.split("\n")[0];
    console.log(
      "inside useLikeTweet useEffect 1",
      shortErrorMessage,
      isConfirming,
      isConfirmed
    );
    toast.error(shortErrorMessage, {
      position: "bottom-right",
      duration: 5000,
    });
  }, [error]);

  useEffect(() => {
    if (isConfirming || !isConfirmed) return;
    console.log("RESULT !!!", isConfirming && !isConfirmed);
    console.log(
      "inside useLikeTweet useEffect 2",
      hash,
      isConfirming,
      isConfirmed
    );
    queryClient.invalidateQueries({ queryKey });
    toast.success("Tweet Liked!", {
      position: "bottom-center",
      duration: 3000,
    });
  }, [hash, isConfirmed, isConfirming, queryClient, queryKey]);

  const likeTweet = useCallback(
    async (author: `0x${string}`, id: string) => {
      writeContract({
        address: TWITTER_CONTRACT_CONFIG.address,
        abi: TWITTER_CONTRACT_CONFIG.abi,
        functionName: "likeTweet",
        args: [author, BigInt(id)],
      });
      toast.success("Tweet Like req sent!!!!!!!!", {
        position: "bottom-center",
        duration: 3000,
      });
    },
    [writeContract]
  );
  return { likeTweet, hash, data, isConfirming, isConfirmed };
};

export default useLikeTweet;
