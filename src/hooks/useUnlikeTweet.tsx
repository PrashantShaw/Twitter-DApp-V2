"use client";

import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { injected } from "wagmi/connectors";
import { getEthNetworkId } from "@/lib/utils";

const useUnlikeTweet = () => {
  const [isNotified, setIsNotified] = useState(false);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const queryClient = useQueryClient();
  const { queryKey } = useGetTweets();
  const {
    writeContract,
    data: hash,
    error,
    isPending: isTriggeringWrite,
  } = useWriteContract();
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
      toast.success("Tweet Unliked!", {
        position: "bottom-center",
        duration: 3000,
      });
      setIsNotified(true);
    }
  }, [hash, isConfirmed, isConfirming, queryClient, queryKey, isNotified]);

  const unlikeTweet = useCallback(
    async (author: `0x${string}`, id: string) => {
      try {
        if (!isConnected) {
          await connectAsync({
            chainId: getEthNetworkId(),
            connector: injected(),
          });
        }
        writeContract({
          address: TWITTER_CONTRACT_CONFIG.address,
          abi: TWITTER_CONTRACT_CONFIG.abi,
          functionName: "unlikeTweet",
          args: [author, BigInt(id)],
        });
      } catch (error: any) {
        const shortErrorMessage = error.message.split("\n")[0];
        toast.error(shortErrorMessage, {
          position: "bottom-right",
          duration: 5000,
        });
      }
      setIsNotified(false);
    },
    [writeContract, connectAsync, isConnected]
  );
  return {
    unlikeTweet,
    hash,
    data,
    isConfirming,
    isConfirmed,
    isTriggeringWrite,
  };
};

export default useUnlikeTweet;
