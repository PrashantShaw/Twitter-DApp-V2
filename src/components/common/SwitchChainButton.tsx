"use client";
import { getRequiredEthChain } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckCheck, ChevronsUpDown } from "lucide-react";
import { useAccount, useSwitchChain } from "wagmi";

const SwitchChainButton = () => {
  const { chainId: selectedChainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const requiredChain = getRequiredEthChain();

  return (
    <div className="">
      {selectedChainId === requiredChain.id ? (
        <Button>
          <CheckCheck className="text-green-600" strokeWidth={3} />
          {requiredChain.name}
        </Button>
      ) : (
        <Button onClick={() => switchChain({ chainId: requiredChain.id })}>
          <ChevronsUpDown className="text-amber-400" />
          Switch to {requiredChain.name}
        </Button>
      )}
    </div>
  );
};

export default SwitchChainButton;
