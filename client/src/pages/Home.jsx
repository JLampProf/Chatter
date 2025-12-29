import FriendPanel from "../components/home/FriendPanel.jsx";
import WelcomeBar from "../components/home/WelcomeBar.jsx";
import SearchWindow from "../components/home/SearchWindow.jsx";
import ChatWindow from "../components/home/ChatWindow.jsx";
import ChatBar from "../components/home/ChatBar.jsx";
import LoadingBar from "../components/home/LoadingBar.jsx";
import Notifications from "./Notifications.jsx";
import CookieModal from "../components/CookieNoticeModal.jsx";
import { useGlobalState } from "../context/StateContext.jsx";
import { socket } from "../scripts/socket.js";
import { useEffect, useState } from "react";

const Home = () => {
  const { isLoaded, isSearching, showNotifications } = useGlobalState();
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    // Check if cookie modal has been shown before
    const cookieModalShown = localStorage.getItem("cookieModalShown");
    if (!cookieModalShown) {
      setShowCookieModal(true);
    }

    return () => {
      socket.off("connect");
    };
  }, []);

  const handleCloseCookieModal = () => {
    setShowCookieModal(false);
    localStorage.setItem("cookieModalShown", "true");
  };

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
      {showCookieModal && <CookieModal onClose={handleCloseCookieModal} />}
    </>
  );
};

export default Home;
