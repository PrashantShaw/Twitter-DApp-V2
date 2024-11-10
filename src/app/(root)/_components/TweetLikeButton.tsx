"use client";
import useLikeTweet from "@/hooks/useLikeTweet";
import clsx from "clsx";
import { Heart } from "lucide-react";
import React, { useCallback } from "react";

type TweetLikeButtonProps = {
  author: `0x${string}`;
  id: string;
};
const TweetLikeButton = ({ author, id }: TweetLikeButtonProps) => {
  const { isTriggeringWrite, isConfirming, likeTweet } = useLikeTweet();

  const onClick = useCallback(() => {
    likeTweet(author, id);
  }, [author, id, likeTweet]);
  const isDisabled = isTriggeringWrite || isConfirming;
  return (
    <button
      onClick={onClick}
      className={clsx(
        "hover:text-red-600 transition-all",
        isDisabled ? "text-gray-400 animate-pulse pointer-events-none" : ""
      )}
      disabled={isDisabled}
    >
      <Heart className="w-5" />
    </button>
  );
};

export default TweetLikeButton;
