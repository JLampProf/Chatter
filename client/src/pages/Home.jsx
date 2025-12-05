import FriendPanel from "../components/home/FriendPanel.jsx";
import WelcomeBar from "../components/home/WelcomeBar.jsx";
import SearchWindow from "../components/home/SearchWindow.jsx";
import ChatWindow from "../components/home/ChatWindow.jsx";
import ChatBar from "../components/home/ChatBar.jsx";
import LoadingBar from "../components/home/LoadingBar.jsx";
import { useGlobalState } from "../context/StateContext.jsx";

const Home = () => {
  const { isLoaded, isSearching } = useGlobalState();

  return (
    <>
      {!isLoaded ? (
        <LoadingBar />
      ) : (
        <section className="home-page">
          <FriendPanel />
          <div className="main-sect">
            <WelcomeBar />
            {isSearching ? (
              <SearchWindow />
            ) : (
              <>
                <ChatWindow />
                <ChatBar />
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
