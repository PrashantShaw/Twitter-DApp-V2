"use client";
import { useGetTweets } from "@/hooks/useGetTweets";
import React from "react";
import TweetCard from "./TweetCard";
import { SkeletonTweetCard } from "./Skeleton";

const Tweets = () => {
  const { tweets, isPending, error: fetchTweetsError } = useGetTweets();

  return (
    <div className="flex flex-col gap-3 py-8">
      {fetchTweetsError ? (
        <p className="text-red-600 text-sm">
          Error: {fetchTweetsError.message}
        </p>
      ) : null}
      {isPending ? (
        <>
          <SkeletonTweetCard />
          <SkeletonTweetCard />
          <SkeletonTweetCard />
        </>
      ) : (
        tweets?.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Tweets;
