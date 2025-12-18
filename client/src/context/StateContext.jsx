import { useState, createContext, useContext } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const StateContext = ({ children }) => {
  //S - Set In, U - used In
  const [isLoaded, setIsLoaded] = useState(false); //S:LoadingBar.jsx U:Home.jsx
  const [chatValue, setChatValue] = useState(""); //S:ChatBar.jsx U:ChatBar.jsx
  const [searchValue, setSearchValue] = useState(""); //S:WelcomeBar.jsx U:WelcomeBar.jsx
  const [searchedUser, setSearchedUser] = useState({}); //S:WelcomeBar.jsx U:SearcHWindow.jsx
  const [isSearching, setIsSearching] = useState(false); //S:WelcomeBar.jsx U:Home.jsx
  const [notificationStatus, setNotificationStatus] = useState(false); //S:Login.jsx U: FriendPanel.jsx
  const [alreadyFriends, setAlreadyFriends] = useState(false); //S:WelcomeBar.jsx U:SearchWindow.jsx
  const [friendRequestList, setFriendRequestList] = useState([]); //S:FriendPanel.jsx U:Notifications.jsx
  const [newMessageList, setNewMessageList] = useState([]); //S:FriendPanel.jsx U:Notifications.jsx
  const [hasFriendRequests, setHasFriendRequests] = useState(false); //S:FriendPanel.jsx U:Notifications.jsx
  const [hasNewMessages, setHasNewMessages] = useState(false); //S:FriendPanel.jsx U: Notifications.jsx
  const [isFriendOpen, setIsFriendOpen] = useState(false); //S:Notifications.jsx U:Notifications.jsx
  const [isMessageOpen, setIsMessageOpen] = useState(false); //S:Notifications.jsx U:Notifications.jsx

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
    notificationStatus,
    setNotificationStatus,
    alreadyFriends,
    setAlreadyFriends,
    friendRequestList,
    setFriendRequestList,
    newMessageList,
    setNewMessageList,
    hasFriendRequests,
    setHasFriendRequests,
    hasNewMessages,
    setHasNewMessages,
    isFriendOpen,
    setIsFriendOpen,
    isMessageOpen,
    setIsMessageOpen,
  };

  return <GlobalStateContext value={values}>{children}</GlobalStateContext>;
};

export default StateContext;
