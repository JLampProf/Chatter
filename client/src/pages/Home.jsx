/**
 * Home.jsx
 *
 * - Main application page after login
 * - Displays friend panel, chat, search, notifications, and cookie modal
 * - Handles socket connection and cookie modal logic
 */

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

/**
 * - Home()
 *
 * - Handles main layout and conditional rendering for the home page
 */
const Home = () => {
  const { isLoaded, isSearching, showNotifications } = useGlobalState();
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    // Listen for socket connection event (for debugging)
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    // Check if cookie modal has been shown before (persisted in localStorage)
    const cookieModalShown = localStorage.getItem("cookieModalShown");
    if (!cookieModalShown) {
      setShowCookieModal(true); // Show cookie notice if not previously shown
    }

    return () => {
      socket.off("connect"); // Clean up event listener on unmount
    };
  }, []);

  const handleCloseCookieModal = () => {
    setShowCookieModal(false); // Hide cookie modal
    localStorage.setItem("cookieModalShown", "true"); // Persist that modal was shown
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
