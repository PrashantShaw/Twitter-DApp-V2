import { getEthNetworkId } from "@/lib/utils";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useAccount, useSwitchChain } from "wagmi";
import { getChainId } from "@wagmi/core";
import { getConfig } from "@/wagmi";

const useSetCorrectChain = () => {
  const { isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const requiredChainId = getEthNetworkId();

  const setCorrectChain = useCallback(async () => {
    const config = getConfig();
    const selectedChainId = getChainId(config);
    let isCorrectChain = selectedChainId === requiredChainId;
    console.log("selectedChainId:", selectedChainId);
    console.log("requiredChainId:", requiredChainId);
    try {
      if (isConnected && !isCorrectChain) {
        await switchChainAsync({ chainId: requiredChainId });
        toast.success("Chain Switched!", {
          position: "bottom-right",
          duration: 3000,
        });
        isCorrectChain = true;
      }
    } catch (error: any) {
      const shortErrorMessage = error.message.split("\n")[0];
      toast.error(shortErrorMessage, {
        position: "bottom-right",
        duration: 5000,
      });
      isCorrectChain = false;
    }
    return isCorrectChain;
  }, [isConnected, requiredChainId, switchChainAsync]);
  return { setCorrectChain };
};

export default useSetCorrectChain;
