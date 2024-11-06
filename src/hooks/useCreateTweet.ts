import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useGetTweets } from "./useGetTweets";
import { TWITTER_CONTRACT_CONFIG } from "@/utils/constants";
import { getEthNetworkId } from "@/lib/utils";
import { injected } from "wagmi/connectors";

const useCreateTweet = () => {
  const [isNotified, setIsNotified] = useState(false);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const queryClient = useQueryClient();
  const { queryKey } = useGetTweets();
  const {
    data: hash,
    error,
    isPending: isTriggeringWrite,
    writeContract,
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
      toast.success("Tweet Created!", {
        position: "bottom-center",
        duration: 3000,
      });
      setIsNotified(true);
    }
  }, [hash, isConfirmed, isConfirming, queryClient, queryKey, isNotified]);

  const createTweet = useCallback(
    async (tweet: string) => {
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
          functionName: "createTweet",
          args: [tweet],
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
    createTweet,
    hash,
    data,
    isConfirming,
    isConfirmed,
    isTriggeringWrite,
  };
};

export default useCreateTweet;
