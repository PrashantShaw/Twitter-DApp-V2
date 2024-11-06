import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || "";
const SEPOLIA_INFURA_RPC_ENDPOINT = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;

export function getConfig() {
  return createConfig({
    chains: [sepolia, mainnet],
    connectors: [injected()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(SEPOLIA_INFURA_RPC_ENDPOINT),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
