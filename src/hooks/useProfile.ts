import { getRequiredEthChain } from "@/lib/utils";
import { LOCALSTORAGE_KEYS, PROFILE_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useMemo, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import useLocalStorage from "./useLocalStorage";
import { useDataAccessLayer } from "./useDataAccessLayer";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getConfig } from "@/wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { type WriteContractErrorType } from "@wagmi/core";
import { type WaitForTransactionReceiptErrorType } from "@wagmi/core";

export const useProfile = (enableFetch = false) => {
  const [isRegisteringUser, setIsRegisteringUser] = useState(false);
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { id: requiredChainId } = getRequiredEthChain();
  const {
    data: userProfile,
    isPending: isFetchingProfile,
    error: errorFetching,
    queryKey: getProfileQueryKey,
  } = useReadContract({
    address: PROFILE_CONTRACT_CONFIG.address,
    abi: PROFILE_CONTRACT_CONFIG.abi,
    functionName: "getProfile",
    chainId: getRequiredEthChain().id,
    args: [address!],
    query: { enabled: enableFetch },
  });
  const { writeContractAsync } = useWriteContract();
  const { setItem } = useLocalStorage();
  const { verifyConnectionAndChain } = useDataAccessLayer();

  const isRegistered = useMemo(() => {
    const isUserRegistered = userProfile
      ? userProfile.displayName.length > 0
      : false;

    setItem(LOCALSTORAGE_KEYS.isUserRegistered, isUserRegistered);
    return isUserRegistered;
  }, [userProfile, setItem]);

  const registerUser = useCallback(
    async (displayName: string, bio: string) => {
      if (displayName.length < 3 || bio.length < 3) {
        toast.error("Invalid Inputs: minimum 3 characters required!", {
          position: "bottom-right",
          duration: 5000,
        });
      }

      try {
        verifyConnectionAndChain();
        setIsRegisteringUser(true);

        const hash = await writeContractAsync({
          address: PROFILE_CONTRACT_CONFIG.address,
          abi: PROFILE_CONTRACT_CONFIG.abi,
          functionName: "setProfile",
          args: [displayName, bio],
          chainId: requiredChainId,
        });
        await waitForTransactionReceipt(getConfig(), {
          hash,
          chainId: requiredChainId,
        });

        queryClient.invalidateQueries({ queryKey: getProfileQueryKey });
        // optionally, u can fetch event which is emitted when tweet is liked using 'useWatchContractEvent' hook
        toast.success("User Successfully Registered!", {
          position: "top-center",
          duration: 3000,
        });
      } catch (error) {
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
        setIsRegisteringUser(false);
      }
    },
    [
      getProfileQueryKey,
      queryClient,
      requiredChainId,
      verifyConnectionAndChain,
      writeContractAsync,
    ]
  );

  return {
    userProfile,
    isRegistered,
    isFetchingProfile,
    errorFetching,
    isRegisteringUser,
    registerUser,
  };
};
