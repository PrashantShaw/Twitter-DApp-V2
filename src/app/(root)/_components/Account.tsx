"use client";
import React from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import ConnectWallet from "@/components/common/ConnectWallet";
import { shortedAccountAddress } from "@/lib/utils";

const Account = () => {
  const { address, isConnected } = useAccount();
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
    </div>
  );
};

export default Account;
