"use client";
import { useGetTweets } from "@/hooks/useGetTweets";
import useLikeTweet from "@/hooks/useLikeTweet";
import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import React, { useCallback, useEffect } from "react";

type TweetLikeButtonProps = {
  author: `0x${string}`;
  id: string;
};
const TweetLikeButton = ({ author, id }: TweetLikeButtonProps) => {
  const { hash, data, isConfirming, isConfirmed, likeTweet } = useLikeTweet();

  console.log("from TweetLikeButton ::::::::::::::::::::::::");
  const onClick = useCallback(() => {
    likeTweet(author, id);
  }, [author, id, likeTweet]);
  return (
    <button
      onClick={onClick}
      // className="animate-pulse"
    >
      <Heart />
    </button>
  );
};

export default TweetLikeButton;
