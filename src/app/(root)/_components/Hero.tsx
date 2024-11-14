"use client";
import React from "react";
import CreateTweet from "./CreateTweet";
import { useAccount } from "wagmi";
import RegisterButton from "./RegisterButton";
import { useProfile } from "@/hooks/useProfile";

const Hero = () => {
  const { isConnected } = useAccount();
  const { userProfile, isRegistered } = useProfile(isConnected);

  return (
    <div className="flex flex-col items-center justify-center">
      {isConnected && !isRegistered ? <RegisterButton /> : null}
      {isConnected && isRegistered ? (
        <>
          <p>
            Welcome{" "}
            <span className="font-semibold">{userProfile?.displayName}</span> 🎉
          </p>
          <CreateTweet />
        </>
      ) : null}
    </div>
  );
};

export default Hero;
