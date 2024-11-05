import { Tweet } from "@/utils/definitions";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime, shortedAccountAddress } from "@/lib/utils";
import TweetLikeButton from "@/app/TweetLikeButton";

type TweetCardProps = {
  tweet: Tweet;
};
const TweetCard = ({ tweet }: TweetCardProps) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex gap-4">
        <div className="">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="font-bold">0x</AvatarFallback>
          </Avatar>
        </div>
        <div className=" w-full">
          <p className="font-semibold text-sm text-gray-400">
            {shortedAccountAddress(tweet.author)}
          </p>
          <p className="">{tweet.content}</p>
          <div className="flex justify-between pt-3 items-center ">
            <div className="flex items-center gap-2 ">
              <p className="text-xl">{tweet.likes}</p>
              <TweetLikeButton author={tweet.author} id={tweet.id} />
            </div>
            <p className="text-right text-gray-300 text-sm">
              {formatDateTime(tweet.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
