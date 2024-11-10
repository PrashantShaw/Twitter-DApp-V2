"use client";
import { getEthNetworkId } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowDownUp, CheckCheck } from "lucide-react";
import { useAccount, useSwitchChain } from "wagmi";

// TODO: store required network name along with the required chain ID
const SwitchChainButton = () => {
  const { chainId: selectedChainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const requiredChainId = getEthNetworkId();

  return (
    <div className="">
      {selectedChainId === requiredChainId ? (
        <Button>
          <CheckCheck className="text-green-600" strokeWidth={3} />
          Sepolia
        </Button>
      ) : (
        <Button onClick={() => switchChain({ chainId: requiredChainId })}>
          <ArrowDownUp className="text-amber-400" />
          Switch to Sepolia
        </Button>
      )}
    </div>
  );
};

export default SwitchChainButton;
