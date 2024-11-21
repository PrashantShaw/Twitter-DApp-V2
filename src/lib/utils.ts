import { ETH_CHAINS } from "@/utils/constants";
import { ETH_NETWORKS, RawTweet, Tweet } from "@/utils/definitions";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const getRequiredEthChain = () => {
  const ETH_NETWORK =
    (process.env.NEXT_PUBLIC_ETH_NETWORK as ETH_NETWORKS) || "sepolia";

  return ETH_CHAINS[ETH_NETWORK];
};

export const parseTweet = (tweet: RawTweet): Tweet => ({
  id: tweet.id.toString(),
  author: tweet.author,
  content: tweet.content,
  timestamp: new Date(Number(tweet.timestamp) * 1000),
  likes: tweet.likes.toString(),
});
