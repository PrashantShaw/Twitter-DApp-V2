import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { mainnet, sepolia } from "viem/chains";

const ETH_NETWORK_IDS = {
  sepolia: sepolia.id,
  mainnet: mainnet.id,
};
type ETH_NETWORKS = keyof typeof ETH_NETWORK_IDS;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortedAccountAddress = (address: `0x${string}`) => {
  return (address?.substring(0, 6) + "..." + address?.slice(-5)).toUpperCase();
};

export const formatDateTime = (datetime: Date) => {
  return datetime.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getEthNetworkId = () => {
  const ETH_NETWORK =
    (process.env.NEXT_PUBLIC_ETH_NETWORK as ETH_NETWORKS) || "sepolia";

  return ETH_NETWORK_IDS[ETH_NETWORK];
};
