// TODO: create tweet card to show tweets and add an text area to create tweets
import Account from "@/components/Account";
import Tweets from "@/components/Tweets";

function App() {
  return (
    <div className="border max-w-4xl w-full mx-auto">
      <h1 className="font-bold text-3xl text-center py-7">
        Twitter Wagmi DApp
      </h1>
      <Account />
      <Tweets />
    </div>
  );
}

export default App;
