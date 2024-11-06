"use client";
import useUnlikeTweet from "@/hooks/useUnlikeTweet";
import clsx from "clsx";
import { Heart, ThumbsDown } from "lucide-react";
import React, { useCallback } from "react";

type TweetUnlikeButtonProps = {
  author: `0x${string}`;
  id: string;
};
const TweetUnlikeButton = ({ author, id }: TweetUnlikeButtonProps) => {
  const { isTriggeringWrite, isConfirming, unlikeTweet } = useUnlikeTweet();

  const onClick = useCallback(() => {
    unlikeTweet(author, id);
  }, [author, id, unlikeTweet]);
  const isDisabled = isTriggeringWrite || isConfirming;
  return (
    <button
      onClick={onClick}
      className={clsx(
        "hover:text-violet-600 transition-all",
        isDisabled ? "text-gray-400 animate-pulse pointer-events-none" : ""
      )}
      disabled={isDisabled}
    >
      <ThumbsDown className="w-5" />
    </button>
  );
};

export default TweetUnlikeButton;
