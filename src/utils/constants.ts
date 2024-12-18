import { PROFILE_ABI } from "@/abi/ProfileAbi";
import { TWITTER_ABI } from "@/abi/TwitterAbi";
import { mainnet, sepolia } from "wagmi/chains";

export const TWITTER_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_TWITTER_CONTRACT_ADDRESS as `0x${string}`;
// old Twitter contract: 0x9B02b8fe74608161d0790d2D45f2076458daD255

export const PROFILE_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_PROFILE_CONTRACT_ADDRESS as `0x${string}`;
// new Profile contract: 0x89911A1FE463F81eB62FCEA45d94A413a4E8f64e

export const TWITTER_CONTRACT_CONFIG = {
  address: TWITTER_CONTRACT_ADDRESS,
  abi: TWITTER_ABI,
} as const;

export const PROFILE_CONTRACT_CONFIG = {
  address: PROFILE_CONTRACT_ADDRESS,
  abi: PROFILE_ABI,
} as const;

export const LOCALSTORAGE_KEYS = {
  isUserRegistered: "isUserRegistered",
  getAllTweetsQueryKey: "getAllTweetsQueryKey",
} as const;

export const ETH_CHAINS = {
  sepolia,
  mainnet,
} as const;
