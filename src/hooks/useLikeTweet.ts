"use client";

import { LOCALSTORAGE_KEYS, TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useState } from "react";
import { useWriteContract } from "wagmi";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getRequiredEthChain } from "@/lib/utils";
import { waitForTransactionReceipt } from "@wagmi/core";
import { type WriteContractErrorType } from "@wagmi/core";
import { type WaitForTransactionReceiptErrorType } from "@wagmi/core";
import { getConfig } from "@/wagmi";
import useLocalStorage from "./useLocalStorage";
import { useDataAccessLayer } from "./useDataAccessLayer";
import { RawTweet } from "@/utils/definitions";

const useLikeTweet = () => {
  const [isPending, setIsPending] = useState(false);
  const { id: requiredChainId } = getRequiredEthChain();
  const { getItem } = useLocalStorage();
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();
  const { verifyAllChecks } = useDataAccessLayer();

  const likeTweet = useCallback(
    async (author: `0x${string}`, id: string) => {
      try {
        verifyAllChecks();
        setIsPending(true);

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
        // TODO: update tanstack-query state after mutation in all other places just like the below one.
        const getAllTweetsQueryKey: QueryKey | undefined = getItem(
          LOCALSTORAGE_KEYS.getAllTweetsQueryKey
        );
        queryClient.setQueryData(
          getAllTweetsQueryKey!,
          (prevTweets: RawTweet[]) => {
            const updatedTweets = prevTweets.map((t) => {
              const shouldUpdateThisTweet =
                t.author === author && String(t.id) == id;
              return shouldUpdateThisTweet
                ? {
                    ...t,
                    likes: t.likes + BigInt(1),
                  }
                : t;
            });
            // console.log("updatedTweets :::::", updatedTweets);
            return updatedTweets;
          }
        );
        // queryClient.invalidateQueries({ queryKey: getAllTweetsQueryKey });
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
    [verifyAllChecks, writeContractAsync, requiredChainId, getItem, queryClient]
  );
  return {
    likeTweet,
    isPending,
  };
};

export default useLikeTweet;
