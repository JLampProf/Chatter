import { useState, createContext, useContext } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const StateContext = ({ children }) => {
  //S - Set In, U - used In
  const [isLoaded, setIsLoaded] = useState(false); //S:LoadingBar.jsx U:Home.jsx
  const [chatValue, setChatValue] = useState(""); //S:ChatBar.jsx U:ChatBar.jsx
  const [searchValue, setSearchValue] = useState(""); //S:WelcomeBar.jsx U:WelcomeBar.jsx
  const [searchedUser, setSearchedUser] = useState({}); //S:WelcomeBar.jsx U:
  const [isSearching, setIsSearching] = useState(false); //S:WelcomeBar.jsx U:Home.jsx
  const [notifStatus, setNotifStatus] = useState(false); //S: U: FriendPanel.jsx

  const values = {
    isLoaded,
    setIsLoaded,
    chatValue,
    setChatValue,
    searchValue,
    setSearchValue,
    searchedUser,
    setSearchedUser,
    isSearching,
    setIsSearching,
    notifStatus,
    setNotifStatus,
  };

  return <GlobalStateContext value={values}>{children}</GlobalStateContext>;
};

export default StateContext;
