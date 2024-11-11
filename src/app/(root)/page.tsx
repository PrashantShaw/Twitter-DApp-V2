/**
 TODO: 
 2. add switch account btn beside disconnect button (when connected)
*/
import Tweets from "@/app/(root)/_components/Tweets";
import { Toaster } from "react-hot-toast";
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
        <CreateTweet />
        <Tweets />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
