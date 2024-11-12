import { Connector, useConnect } from "wagmi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getRequiredEthChain, shortedAccountAddress } from "@/lib/utils";
import { type ConnectErrorType } from "@wagmi/core";
import { useCallback } from "react";

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
  const { connectors, connectAsync } = useConnect();
  const connectorProvider = connectors.filter((conn) => conn.name === name);
  const { id: requiredChainId } = getRequiredEthChain();

  const handleConnectWallet = useCallback(
    (connector: Connector) => {
      (async () => {
        try {
          const { accounts } = await connectAsync({
            connector,
            chainId: requiredChainId,
          });
          const connectedAccount = accounts[0];
          toast.success(
            `Account ${shortedAccountAddress(connectedAccount)} Connected!`,
            {
              position: "bottom-right",
              duration: 3000,
            }
          );
        } catch (error: unknown) {
          const typedError = error as ConnectErrorType | Error;
          const shortErrorMessage = typedError.message.split("\n")[0];
          toast.error(shortErrorMessage, {
            position: "bottom-right",
            duration: 5000,
          });
        }
      })();
    },
    [connectAsync, requiredChainId]
  );
  return (
    <>
      {connectorProvider.length > 0 ? (
        connectorProvider.map((connector) => (
          <Button
            variant="default"
            key={connector.uid}
            onClick={() => handleConnectWallet(connector)}
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
