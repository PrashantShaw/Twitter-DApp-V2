"use client";
import { useGetTweets } from "@/hooks/useGetTweets";
import useLikeTweet from "@/hooks/useLikeTweet";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
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
      className={clsx(
        "hover:text-red-600 transition-all",
        isConfirming ? "text-gray-400 animate-pulse pointer-events-none" : ""
      )}
      disabled={isConfirming}
    >
      <Heart className="w-5" />
    </button>
  );
};

export default TweetLikeButton;
