import { ToastContainer } from "react-toastify";
import { useGlobalAuth } from "../../context/AuthContext.jsx";
import { useGlobalState } from "../../context/StateContext.jsx";
import { searchFriend } from "../../scripts/friendScript.js";
import { toastMessage } from "../../scripts/toastScript.js";
import { socket } from "../../scripts/socket.js";
import { useEffect } from "react";

const WelcomeBar = () => {
  const { user, setUser, authToken, setAuthToken, setIsLoggedIn } =
    useGlobalAuth();
  const { searchValue, setSearchValue, setSearchedUser, setIsSearching } =
    useGlobalState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue === "") {
      toastMessage("Field cannot be empty.");
      return;
    }
    const friend = await searchFriend(searchValue, authToken);
    if (friend?.error) {
      switch (friend.status) {
        case 404:
          toastMessage("User not Found, did you type it correctly?");
      }
      return;
    }
    setSearchedUser(friend);
    setIsSearching(true);
    setSearchValue("");
  };

  const logout = () => {
    setUser({});
    setAuthToken("");
    setIsLoggedIn(false);
    socket.disconnect();
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
      <ToastContainer className="toaster" autoClose={2000} />
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
