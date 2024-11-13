/**
 TODO: 
 1. complete solidity video and add some more features ✅
 2. register user when user tries to interact
 3. redeploy contracts to sepolia and add the abis ✅
*/
import Tweets from "@/app/(root)/_components/Tweets";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import Hero from "./_components/Hero";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className=" max-w-3xl w-full mx-auto p-4">
        <h1 className="font-bold text-3xl text-center py-7">
          Twitter Wagmi DApp
        </h1>
        <Hero />
        <Tweets />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
