import { useState, createContext, useContext } from "react";

const GlobalAuthContext = createContext();

export const useGlobalAuth = () => useContext(GlobalAuthContext);

const AuthContext = ({ children }) => {
  //S - Set in. U - Used in
  const [user, setUser] = useState({ username: "", user_id: "" }); //S: Login.jsx, U:
  const [friendList, setFriendList] = useState([]); //S: Login.jsx U:
  const [authToken, setAuthToken] = useState(""); //S: Login.jsx, U:
  const [isLoggedIn, setIsLoggedIn] = useState(false); //S: Login.jsx, U: App.jsx

  const values = {
    user,
    setUser,
    authToken,
    setAuthToken,
    isLoggedIn,
    setIsLoggedIn,
    friendList,
    setFriendList,
  };

  return <GlobalAuthContext value={values}>{children}</GlobalAuthContext>;
};

export default AuthContext;

//Total used
//user - WelcomeBar.jsx
//setUser - Login.jsx
