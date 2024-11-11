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

const useCreateTweet = () => {
  const [isPending, setIsPending] = useState(false);
  const { isConnected, chainId: selectedChainId } = useAccount();
  const requiredChainId = getEthNetworkId();
  const isCorrectChain = selectedChainId === requiredChainId;
  const { getItem } = useLocalStorage();
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();

  const createTweet = useCallback(
    async (tweet: string) => {
      let success = false;

      if (!isConnected) {
        toast.error("Wallet not connected", {
          position: "bottom-right",
          duration: 5000,
        });
        return { success };
      }
      if (!isCorrectChain) {
        toast.error("Switch chain to sepolia", {
          position: "bottom-right",
          duration: 5000,
        });
        return { success };
      }

      setIsPending(true);
      try {
        const hash = await writeContractAsync({
          address: TWITTER_CONTRACT_CONFIG.address,
          abi: TWITTER_CONTRACT_CONFIG.abi,
          functionName: "createTweet",
          args: [tweet],
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
        // optionally, u can fetch event which is emitted when tweet is created using 'useWatchContractEvent' hook
        success = true;
        toast.success("Tweet Created!", {
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

      return { success };
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
    isPending,
    createTweet,
  };
};

export default useCreateTweet;
