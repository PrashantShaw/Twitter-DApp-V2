"use client";
import TweetLikeButton from "@/app/TweetLikeButton";
import { useGetTweets } from "@/hooks/useGetTweets";
import React from "react";

const Tweets = () => {
  const { tweets, isPending, error: fetchTweetsError } = useGetTweets();

  return (
    <div>
      {fetchTweetsError ? <div>Error: {fetchTweetsError.message}</div> : null}
      {isPending ? (
        <div>Loading...</div>
      ) : (
        tweets?.map((tweet) => (
          <div key={tweet.id} className="border">
            {tweet.content}
          </div>
        ))
      )}
      {tweets ? (
        <div className="">{JSON.stringify(tweets, null, 2)}</div>
      ) : null}
      <TweetLikeButton
        author="0x1142351A1e907D6eC81C46ecA8a159DdE64f4406"
        id="2"
      />
    </div>
  );
};

export default Tweets;
