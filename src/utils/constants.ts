import { TWITTER_ABI } from "@/abi/TwitterAbi";
import { mainnet, sepolia } from "wagmi/chains";

export const TWITTER_CONTRACT_ADDRESS =
  "0x9B02b8fe74608161d0790d2D45f2076458daD255" as `0x${string}`;

export const TWITTER_CONTRACT_CONFIG = {
  address: TWITTER_CONTRACT_ADDRESS,
  abi: TWITTER_ABI,
};

export const QUERY_KEYS_FROM_LOCALSTORAGE = {
  getAllTweets: "queryKey__getAllTweets",
} as const;

export const ETH_CHAINS = {
  sepolia,
  mainnet,
} as const;
