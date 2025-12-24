import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "../../components/home/FriendItem.jsx";
import { socket } from "../../scripts/socket.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/StateContext.jsx";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../../scripts/notificationScript.js";
import { toastMessage } from "../../scripts/toastScript.js";
import { fetchFriendsList } from "../../scripts/friendRequestScript.js";
import { fetchHistory } from "../../scripts/historyScript.js";

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
    setChatHistoryCache,
    currentChat,
    setCurrentChat,
    setChatIsLoaded,
    showNotifications,
    setShowNotifications,
  } = useGlobalState();
  const navigate = useNavigate();

  const handleNotificationScreen = () => {
    setShowNotifications(true);
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

  const loadChatHistory = async (friendId) => {
    const history = await fetchHistory(user.user_id, friendId, authToken);
    if (history?.error) {
      switch (history?.status) {
        case 500:
          toastMessage("Unexpected error, please try again");
          break;
      }
    }

    setChatHistoryCache((prev) => {
      const next = new Map(prev);
      next.set(friendId, history);
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    const loading = async () => {
      try {
        await loadNotifications();

        if (friendList.length > 0) {
          const initial = friendList[0];
          setCurrentChat(initial);
          await loadChatHistory(initial.friendId);
        }
      } catch (error) {
        console.log("loading error", error);
      } finally {
        if (!cancelled) {
          setChatIsLoaded(true);
        }
      }
    };

    loading();

    return () => {
      cancelled = true;
    };
  }, [friendList]);

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
          const { friendId } = friend;
          return (
            <FriendItem
              className="friend-panel-list-item"
              key={friendId}
              isSelected={currentChat === friend}
              onSelect={() => {
                setCurrentChat(friend);
                loadChatHistory(friendId);
              }}
              {...friend}
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
