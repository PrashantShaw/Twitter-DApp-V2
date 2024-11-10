import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <Button
          variant={"outline"}
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      ) : (
        <ConnectorButton name="MetaMask" />
      )}
    </div>
  );
};

export default ConnectWallet;

type ConnectorButtonProps = {
  name: "MetaMask";
  label?: string;
};

export const ConnectorButton = ({ name, label }: ConnectorButtonProps) => {
  const { connectors, connect, error } = useConnect();
  useEffect(() => {
    if (!error) return;
    const shortErrorMessage = error.message.split("\n")[0];
    toast.error(shortErrorMessage, {
      position: "bottom-right",
      duration: 5000,
    });
  }, [error]);
  return (
    <>
      {connectors
        .filter((conn) => conn.name === name)
        .map((connector) => (
          <Button
            variant="default"
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            {label ?? connector.name}
          </Button>
        ))}
    </>
  );
};
