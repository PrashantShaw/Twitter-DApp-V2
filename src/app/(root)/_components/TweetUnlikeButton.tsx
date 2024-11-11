"use client";
import useUnlikeTweet from "@/hooks/useUnlikeTweet";
import clsx from "clsx";
import { ThumbsDown } from "lucide-react";
import React, { useCallback } from "react";

type TweetUnlikeButtonProps = {
  author: `0x${string}`;
  id: string;
};
const TweetUnlikeButton = ({ author, id }: TweetUnlikeButtonProps) => {
  const { isPending, unlikeTweet } = useUnlikeTweet();

  const onClick = useCallback(() => {
    unlikeTweet(author, id);
  }, [author, id, unlikeTweet]);
  return (
    <button
      onClick={onClick}
      className={clsx(
        "hover:text-violet-600 transition-all",
        isPending ? "text-gray-400 animate-pulse pointer-events-none" : ""
      )}
      disabled={isPending}
    >
      <ThumbsDown className="w-5" />
    </button>
  );
};

export default TweetUnlikeButton;
