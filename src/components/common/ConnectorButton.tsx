import { useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useConnectToWallet from "@/hooks/useConnectToWallet";

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
  const { connectors } = useConnect();
  const connectorProvider = connectors.filter((conn) => conn.name === name);
  const { connectToWallet } = useConnectToWallet();

  return (
    <>
      {connectorProvider.length > 0 ? (
        connectorProvider.map((connector) => (
          <Button
            variant="default"
            key={connector.uid}
            onClick={connectToWallet}
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
