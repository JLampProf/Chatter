/**
 * WelcomeBar.jsx
 *
 * - Displays user greeting and search bar
 * - Handles friend search and logout
 */

import { useGlobalAuth } from "../../context/AuthContext.jsx";
import { useGlobalState } from "../../context/StateContext.jsx";
import { searchFriend } from "../../scripts/searchScript.js";
import { toastMessage } from "../../scripts/toastScript.js";
import { socket } from "../../scripts/socket.js";
import { useEffect } from "react";
import { handleLogout } from "../../scripts/logoutScript.js";

/**
 * - WelcomeBar()
 *
 * - Renders the welcome bar and search logic
 */
const WelcomeBar = () => {
  const {
    user,
    setUser,
    authToken,
    setAuthToken,
    setIsLoggedIn,
    setFriendList,
  } = useGlobalAuth();
  const {
    searchValue,
    setSearchValue,
    setSearchedUser,
    setIsSearching,
    setIsLoaded,
    setAlreadyFriends,
    setIsFriendOpen,
    setIsMessageOpen,
    setNotificationStatus,
    setFriendRequestList,
    setNewMessageList,
    setHasFriendRequests,
    setHasNewMessages,
  } = useGlobalState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue === "") {
      toastMessage("Field cannot be empty.");
      return;
    }
    const friend = await searchFriend(user.user_id, searchValue, authToken);
    if (friend.alreadyFriends === true) {
      setAlreadyFriends(true);
    } else {
      setAlreadyFriends(false);
    }
    if (friend?.error) {
      switch (friend.status) {
        case 404:
          toastMessage("User not Found, did you type it correctly?");
          break;
        case 400:
          toastMessage("Could not complete request");
          logout();
          break;
      }
      return;
    }
    setSearchedUser(friend);
    setIsSearching(true);
    setSearchValue("");
  };

  const logout = async () => {
    setUser({});
    setIsLoggedIn(false);
    socket.disconnect();
    try {
      await handleLogout(authToken);
    } catch (error) {
      console.log(error);
    }
    setAuthToken("");
  };

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("disconnect");
    };
  }, []);

  return (
    <section className="welcome-nav">
      <h1>Welcome {user.username}</h1>
      <div className="welcome-nav-separation">
        <form
          onSubmit={handleSearch}
          className="welcome-nav-separation-search"
          role="search"
        >
          <input
            className="welcome-nav-separation-search-bar"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
          />
          <button
            className="welcome-nav-separation-search-button"
            type="submit"
          >
            Search
          </button>
        </form>
        <button onClick={logout}>Logout</button>
      </div>
    </section>
  );
};

export default WelcomeBar;
