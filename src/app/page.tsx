"use client";

import { useGetTweets } from "@/hooks/useGetTweets";
import {
  BaseError,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useReadContract,
} from "wagmi";
import TweetLikeButton from "./TweetLikeButton";

function App() {
  const account = useAccount();
  const { data: ensName } = useEnsName({ address: account.address });
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { tweets, isPending, error: fetchTweetsError } = useGetTweets();

  console.log("page rendered!!!", tweets);
  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          ensName: {ensName}
          <br />
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      {fetchTweetsError ? <div>Error: {fetchTweetsError.message}</div> : null}
      {isPending ? <div>Loading...</div> : null}
      {tweets ? (
        <div className="">{JSON.stringify(tweets, null, 2)}</div>
      ) : null}
      <TweetLikeButton
        author="0x1142351A1e907D6eC81C46ecA8a159DdE64f4406"
        id="2"
      />
    </>
  );
}

export default App;
