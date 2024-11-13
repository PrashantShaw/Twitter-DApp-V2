import { getRequiredEthChain } from "@/lib/utils";
import { LOCALSTORAGE_KEYS, PROFILE_CONTRACT_CONFIG } from "@/utils/constants";
import { useCallback, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import useLocalStorage from "./useLocalStorage";

export const useProfile = (enableFetch = false) => {
  const { address } = useAccount();
  const {
    data: userProfile,
    isPending,
    error,
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

  const isRegistered = useMemo(() => {
    const isUserRegistered = userProfile
      ? userProfile.displayName.length > 0
      : false;

    setItem(LOCALSTORAGE_KEYS.isUserRegistered, isUserRegistered);
    return isUserRegistered;
  }, [userProfile]);

  const registerUser = useCallback(async (displayName: string, bio: string) => {
    // TODO: implement this method
  }, []);

  return { userProfile, isRegistered, isPending, error, registerUser };
};
