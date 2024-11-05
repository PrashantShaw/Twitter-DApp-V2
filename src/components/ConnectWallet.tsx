import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/button";

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
};

const ConnectorButton = ({ name }: ConnectorButtonProps) => {
  const { connectors, connect, error } = useConnect();

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
            {connector.name}
          </Button>
        ))}
      <p className="text-red-600 text-sm">{error?.message}</p>
    </>
  );
};
