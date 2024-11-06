/**
 TODO: 
 prompt user to switch to correct chain before interacting
*/
import Tweets from "@/app/(root)/_components/Tweets";
import { Toaster } from "react-hot-toast";
import Account from "./_components/Account";
import CreateTweet from "./_components/CreateTweet";

function App() {
  return (
    <div className=" max-w-3xl w-full mx-auto p-4">
      <h1 className="font-bold text-3xl text-center py-7">
        Twitter Wagmi DApp
      </h1>
      <Account />
      <CreateTweet />
      <Tweets />
      <Toaster />
    </div>
  );
}

export default App;
