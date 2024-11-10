import { getEthNetworkId } from "@/lib/utils";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Connector, CreateConnectorFn, useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const useConnectToWallet = (
  connector: CreateConnectorFn | Connector = injected()
) => {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const connectToWallet = useCallback(async () => {
    let isSuccessfullyConnected = isConnected;
    try {
      if (!isConnected) {
        await connectAsync({
          connector,
          chainId: getEthNetworkId(), // this will ask the user to switch the chain after wallet is connected
        });
        toast.success("Wallet Connected!", {
          position: "bottom-right",
          duration: 3000,
        });
        isSuccessfullyConnected = true;
      }
    } catch (error: any) {
      const shortErrorMessage = error.message.split("\n")[0];
      toast.error(shortErrorMessage, {
        position: "bottom-right",
        duration: 5000,
      });
      isSuccessfullyConnected = false;
    }
    return isSuccessfullyConnected;
  }, [isConnected, connectAsync, connector]);
  return { connectToWallet };
};

export default useConnectToWallet;
