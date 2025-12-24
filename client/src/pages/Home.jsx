import FriendPanel from "../components/home/FriendPanel.jsx";
import WelcomeBar from "../components/home/WelcomeBar.jsx";
import SearchWindow from "../components/home/SearchWindow.jsx";
import ChatWindow from "../components/home/ChatWindow.jsx";
import ChatBar from "../components/home/ChatBar.jsx";
import LoadingBar from "../components/home/LoadingBar.jsx";
import Notifications from "./Notifications.jsx";
import { useGlobalState } from "../context/StateContext.jsx";
import { socket } from "../scripts/socket.js";
import { useEffect } from "react";

const Home = () => {
  const { isLoaded, isSearching, showNotifications } = useGlobalState();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

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
          {showNotifications && <Notifications />}
        </section>
      )}
    </>
  );
};

export default Home;
