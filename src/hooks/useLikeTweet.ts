"use client";

import {
  QUERY_KEYS_FROM_LOCALSTORAGE,
  TWITTER_CONTRACT_CONFIG,
} from "@/utils/constants";
import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getEthNetworkId } from "@/lib/utils";
import { waitForTransactionReceipt } from "@wagmi/core";
import { type WriteContractErrorType } from "@wagmi/core";
import { type WaitForTransactionReceiptErrorType } from "@wagmi/core";
import { getConfig } from "@/wagmi";
import useLocalStorage from "./useLocalStorage";

const useLikeTweet = () => {
  const [isPending, setIsPending] = useState(false);
  const { isConnected, chainId: selectedChainId } = useAccount();
  const requiredChainId = getEthNetworkId();
  const isCorrectChain = selectedChainId === requiredChainId;
  const { getItem } = useLocalStorage();
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();

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

      setIsPending(true);
      try {
        const hash = await writeContractAsync({
          address: TWITTER_CONTRACT_CONFIG.address,
          abi: TWITTER_CONTRACT_CONFIG.abi,
          functionName: "likeTweet",
          args: [author, BigInt(id)],
          chainId: requiredChainId,
        });
        await waitForTransactionReceipt(getConfig(), {
          hash,
          chainId: requiredChainId,
        });
        const getAllTweetsQueryKey: QueryKey | undefined = getItem(
          QUERY_KEYS_FROM_LOCALSTORAGE.getAllTweets
        );
        queryClient.invalidateQueries({ queryKey: getAllTweetsQueryKey });
        // optionally, u can fetch event which is emitted when tweet is liked using 'useWatchContractEvent' hook
        toast.success("Tweet Liked!", {
          position: "bottom-center",
          duration: 3000,
        });
      } catch (error: unknown) {
        const typedError = error as
          | WriteContractErrorType
          | WaitForTransactionReceiptErrorType
          | Error;
        const shortErrorMessage = typedError.message.split("\n")[0];
        toast.error(shortErrorMessage, {
          position: "bottom-right",
          duration: 5000,
        });
      } finally {
        setIsPending(false);
      }
    },
    [
      getItem,
      isConnected,
      isCorrectChain,
      writeContractAsync,
      queryClient,
      requiredChainId,
    ]
  );
  return {
    likeTweet,
    isPending,
  };
};

export default useLikeTweet;
