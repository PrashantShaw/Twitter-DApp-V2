/**
 TODO: 
 1. prompt user to switch to correct chain before interacting
 2. add switch account btn beside disconnect button (when connected)

 FIXME:
 1. when on differnent chain and then clicked to like a tweet and switched to correct chain, after succesful likeing the tweet, when again swithcing back to the prev chain, the tweet like btn goes back to the loading state
 possible workarounds - when interacting with the tweet, as user to first connect wallet and switch chain (provide these buttons)
*/
import Tweets from "@/app/(root)/_components/Tweets";
import { Toaster } from "react-hot-toast";
import Account from "./_components/Account";
import CreateTweet from "./_components/CreateTweet";
import Navbar from "@/components/common/Navbar";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className=" max-w-3xl w-full mx-auto p-4">
        <h1 className="font-bold text-3xl text-center py-7">
          Twitter Wagmi DApp
        </h1>
        {/* <Account /> */}
        <CreateTweet />
        <Tweets />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
