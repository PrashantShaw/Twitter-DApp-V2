import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

type SkeletonProps = {
  children: React.ReactNode;
};

const Skeleton = ({ children }: SkeletonProps) => {
  return <div>{children}</div>;
};

Skeleton.TweetCard = () => {
  return (
    <div className="border rounded-md p-4 animate-pulse">
      <div className="flex gap-4">
        <div className="">
          <Avatar className="w-16 h-16">
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className=" w-full">
          <div className="h-3 w-[8rem] rounded bg-gray-100" />
          <div className="h-3 w-[14rem] rounded bg-gray-100 mt-3" />
          <div className="flex justify-between mt-5 items-center ">
            <div className="flex items-center gap-2 ">
              <div className="h-5 w-5 rounded bg-gray-100" />
              <div className="h-5 w-5 rounded bg-gray-100" />
            </div>
            <div className="h-2 rounded w-[5rem] bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
