"use client";
import React from "react";
import { useAccount, useChainId } from "wagmi";
import ConnectWallet from "@/components/common/ConnectWallet";
import { shortedAccountAddress } from "@/lib/utils";
import { sepolia } from "viem/chains";

const Account = () => {
  const { address, isConnected, chainId } = useAccount();
  const selectedChainId = useChainId();

  return (
    <div className=" flex flex-col items-center gap-3">
      <ConnectWallet />
      <div className="flex gap-2">
        Account:
        {isConnected && address ? (
          <p className="font-semibold">{shortedAccountAddress(address)}</p>
        ) : (
          <p className="text-gray-400">Account Not Connected</p>
        )}
      </div>
      {/* FIXME: selected chain not updating when chaning chain */}
      <p>
        Selected Chain:{" "}
        <span className="font-semibold">
          {selectedChainId === sepolia.id ? "Sepolia" : "Ethereum Mainnet"}
        </span>
        <span className="pl-1 text-sm">({selectedChainId})</span>
      </p>
      <p>{chainId}</p>
    </div>
  );
};

export default Account;
