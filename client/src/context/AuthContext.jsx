import { useState, createContext, useContext, useEffect } from "react";
import { intercept } from "../scripts/axiosScript.js";
import { socket } from "../scripts/socket.js";

const GlobalAuthContext = createContext();

export const useGlobalAuth = () => useContext(GlobalAuthContext);

const AuthContext = ({ children }) => {
  //S - Set in. U - Used in
  const [user, setUser] = useState({ username: "", user_id: "" }); //S: Login.jsx, U:
  const [friendList, setFriendList] = useState([]); //S: Login.jsx U:
  const [authToken, setAuthToken] = useState(""); //S: Login.jsx, U:
  const [isLoggedIn, setIsLoggedIn] = useState(false); //S: Login.jsx, U: App.jsx
  const [isRestoring, setIsRestoring] = useState(true); // true while attempting session restore

  // Attempt to restore session on app load
  useEffect(() => {
    const bootstrapSession = async () => {
      setIsRestoring(true);
      try {
        const refreshResp = await intercept.post("api/refresh");
        const accessToken = refreshResp.data.accessToken;

        // fetch user data and friend list using the fresh access token
        const sessionResp = await intercept.get("api/session", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { userData, friendList } = sessionResp.data;

        setUser({
          username: userData.username,
          user_id: userData.user_id,
          roomId: userData.room_id,
        });
        setFriendList(friendList || []);
        setAuthToken(accessToken);
        setIsLoggedIn(true);

        // connect socket and join user's room
        try {
          socket.connect();
          if (userData.room_id) socket.emit("joinRoom", userData.room_id);
        } catch (err) {
          console.log("Socket join error:", err);
        }
      } catch (error) {
        // No active session or refresh failed; remain logged out
        console.log("No active session restored");
      } finally {
        setIsRestoring(false);
      }
    };

    bootstrapSession();
  }, []);

  const values = {
    user,
    setUser,
    authToken,
    setAuthToken,
    isLoggedIn,
    setIsLoggedIn,
    isRestoring,
    setIsRestoring,
    friendList,
    setFriendList,
  };

  return <GlobalAuthContext value={values}>{children}</GlobalAuthContext>;
};

export default AuthContext;

//Total used
//user - WelcomeBar.jsx
//setUser - Login.jsx
