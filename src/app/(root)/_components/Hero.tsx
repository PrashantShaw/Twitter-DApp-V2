"use client";
import React from "react";
import CreateTweet from "./CreateTweet";
import { useAccount } from "wagmi";
import RegisterButton from "./RegisterButton";

const Hero = () => {
  const { isConnected } = useAccount();
  const isRegistered = false;
  const username = "shawPrash007";
  return (
    <div className="flex flex-col items-center justify-center">
      {isConnected && !isRegistered ? <RegisterButton /> : null}
      {isConnected && isRegistered ? (
        <>
          <p>
            Welcome <span className="font-semibold">{username}</span> 🎉
          </p>
          <CreateTweet />
        </>
      ) : null}
    </div>
  );
};

export default Hero;
