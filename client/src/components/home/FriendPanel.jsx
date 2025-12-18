import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "../../components/home/FriendItem.jsx";
import { socket } from "../../scripts/socket.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/StateContext.jsx";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../../scripts/notificationScript.js";
import { toastMessage } from "../../scripts/toastScript.js";
import { fetchFriendsList } from "../../scripts/friendRequestScript.js";

const FriendPanel = () => {
  const { friendList, authToken, user, setFriendList } = useGlobalAuth();
  const [notificationAmount, setNotificationAmount] = useState(0);
  const {
    notificationStatus,
    setFriendRequestList,
    setNewMessageList,
    setNotificationStatus,
    setHasFriendRequests,
    setHasNewMessages,
  } = useGlobalState();
  const navigate = useNavigate();

  const handleNotificationScreen = () => {
    navigate("/notifications");
  };

  const loadNotifications = async () => {
    try {
      const notifications = await fetchNotifications(user.user_id, authToken);

      setFriendRequestList(notifications.friendRequests);
      setNewMessageList(notifications.newMessages);

      if (notifications.friendRequests.length > 0) {
        setHasFriendRequests(true);
        setNotificationStatus(true);
      }
      if (notifications.newMessages.length > 0) {
        setHasNewMessages(true);
        setNotificationStatus(true);
      }

      setNotificationAmount(
        notifications.friendRequests.length + notifications.newMessages.length
      );
    } catch (error) {
      console.log("loadNotifications:", error);
    }
  };

  const loadFriendList = async () => {
    const newList = await fetchFriendsList(user.user_id, authToken);
    setFriendList(newList);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const acceptedFriendRequest = (data) => {
      toastMessage(data);
      loadFriendList();
    };

    socket.on("acceptedFriendRequest", acceptedFriendRequest);

    return () => {
      socket.off("acceptedFriendRequest", acceptedFriendRequest);
    };
  }, []);

  useEffect(() => {
    const friendRequestReceived = (data) => {
      toastMessage(data);
      loadNotifications();
    };

    socket.on("receiveFriendRequest", friendRequestReceived);

    return () => {
      socket.off("receiveFriendRequest", friendRequestReceived);
    };
  }, []);

  return (
    <section onLoad={loadNotifications} className="friend-panel">
      <div className="friend-panel-header">
        <h1>Chats</h1>
        <div
          onClick={handleNotificationScreen}
          className="friend-panel-header-notifications"
        >
          <div
            className="friend-panel-header-notifications-status"
            style={{ display: `${notificationStatus ? "inline" : "none"}` }}
          ></div>
          <h1>{notificationAmount || 0}</h1>
        </div>
      </div>
      <ul className="friend-panel-list">
        {friendList.map((friend) => {
          const { username, friendId } = friend;
          return (
            <FriendItem
              className="friend-panel-list-item"
              key={friendId}
              user={username}
            />
          );
        })}
      </ul>
      <div className="settings-bar">
        <h2>Settings</h2>
        <div className="settings-bar-icon">
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default FriendPanel;
