"use client";

import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useConnectToWallet from "./useConnectToWallet";
import useSetCorrectChain from "./useSetCorrectChain";

const useLikeTweet = () => {
  const [isNotified, setIsNotified] = useState(false);
  const { connectToWallet } = useConnectToWallet();
  const { setCorrectChain } = useSetCorrectChain();
  const queryClient = useQueryClient();
  const {
    writeContract,
    data: hash,
    error,
    isPending: isTriggeringWrite,
  } = useWriteContract();
  const { queryKey } = useGetTweets();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
  } = useWaitForTransactionReceipt({
    hash,
  });
  useEffect(() => {
    if (!error) return;
    const shortErrorMessage = error.message.split("\n")[0];
    toast.error(shortErrorMessage, {
      position: "bottom-right",
      duration: 5000,
    });
    setIsNotified(true);
  }, [error]);

  useEffect(() => {
    if (isConfirmed && !isNotified) {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Tweet Liked!", {
        position: "bottom-center",
        duration: 3000,
      });
      setIsNotified(true);
    }
  }, [isConfirmed, queryClient, queryKey, isNotified]);

  const likeTweet = useCallback(
    async (author: `0x${string}`, id: string) => {
      const isConnected = await connectToWallet();
      const isCorrectChain = await setCorrectChain();

      // TODO: check if wallet is connected and correct chain before calling the contract (look inside NavbarActions.tsx)
      if (isConnected && isCorrectChain) {
        writeContract({
          address: TWITTER_CONTRACT_CONFIG.address,
          abi: TWITTER_CONTRACT_CONFIG.abi,
          functionName: "likeTweet",
          args: [author, BigInt(id)],
        });
      }
      setIsNotified(false);
    },
    [writeContract, connectToWallet, setCorrectChain]
  );
  return {
    likeTweet,
    hash,
    data,
    isConfirming,
    isConfirmed,
    isTriggeringWrite,
  };
};

export default useLikeTweet;
