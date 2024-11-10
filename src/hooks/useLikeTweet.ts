"use client";

import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getEthNetworkId } from "@/lib/utils";

const useLikeTweet = () => {
  const [isNotified, setIsNotified] = useState(false);
  const { isConnected, chainId: selectedChainId } = useAccount();
  const requiredChainId = getEthNetworkId();
  const isCorrectChain = selectedChainId === requiredChainId;

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
      if (!isConnected) {
        toast.error("Wallet not connected", {
          position: "bottom-right",
          duration: 5000,
        });
        return;
      }
      if (!isCorrectChain) {
        toast.error("Switch chain to sepolia", {
          position: "bottom-right",
          duration: 5000,
        });
        return;
      }

      writeContract({
        address: TWITTER_CONTRACT_CONFIG.address,
        abi: TWITTER_CONTRACT_CONFIG.abi,
        functionName: "likeTweet",
        args: [author, BigInt(id)],
      });
      setIsNotified(false);
    },
    [isConnected, isCorrectChain, writeContract]
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
