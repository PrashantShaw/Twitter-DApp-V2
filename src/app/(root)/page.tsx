/**
 TODO: 
 create tweetcard skeletons, 
 add an text area to create tweets, 
 add disline button, 
 make chain selection based on environment variables
*/
import Tweets from "@/app/(root)/_components/Tweets";
import { Toaster } from "react-hot-toast";
import Account from "./_components/Account";

function App() {
  return (
    <div className=" max-w-3xl w-full mx-auto">
      <h1 className="font-bold text-3xl text-center py-7">
        Twitter Wagmi DApp
      </h1>
      <Account />
      <Tweets />
      <Toaster />
    </div>
  );
}

export default App;
