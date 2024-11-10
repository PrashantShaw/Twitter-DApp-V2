import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  iconUrl?: string;
};

export const ConnectorButton = ({
  name,
  label,
  iconUrl,
}: ConnectorButtonProps) => {
  const { connectors, connect, error } = useConnect();
  const connectorProvider = connectors.filter((conn) => conn.name === name);
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
      {connectorProvider.length > 0 ? (
        connectorProvider.map((connector) => (
          <Button
            variant="default"
            key={connector.uid}
            onClick={() => connect({ connector })}
          >
            {iconUrl ? (
              <Image
                className="w-[1.25rem] h-[1.25rem]"
                src={iconUrl}
                alt="connector icon"
                width={64}
                height={64}
              />
            ) : null}
            {label ?? connector.name}
          </Button>
        ))
      ) : (
        <Button>Provider not Found</Button>
      )}
    </>
  );
};
