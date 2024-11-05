// TODO: add an text area to create tweets, add disline button
import Account from "@/components/Account";
import Tweets from "@/components/Tweets";
import { Toaster } from "react-hot-toast";

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
