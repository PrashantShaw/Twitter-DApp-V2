import { ETH_CHAINS } from "./constants";

export type RawTweet = {
  id: bigint;
  author: `0x${string}`;
  content: string;
  timestamp: bigint;
  likes: bigint;
};

export type Tweet = {
  id: string;
  author: `0x${string}`;
  content: string;
  timestamp: Date;
  likes: string;
};

export type ETH_NETWORKS = keyof typeof ETH_CHAINS;
