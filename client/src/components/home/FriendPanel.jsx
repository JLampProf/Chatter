/**
 * FriendPanel.jsx
 *
 * - Displays the user's friend list and notifications
 * - Handles friend removal and notification logic
 */

import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "../../components/home/FriendItem.jsx";
import RemoveFriendModal from "./RemoveFriendModal.jsx";
import "../../../public/css/RemoveFriendModal.css";
import { removeFriend as removeFriendAPI } from "../../scripts/friendScript.js";
import { socket } from "../../scripts/socket.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/StateContext.jsx";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../../scripts/notificationScript.js";
import { toastMessage } from "../../scripts/toastScript.js";
import { fetchFriendsList } from "../../scripts/friendRequestScript.js";
import { fetchHistory } from "../../scripts/historyScript.js";

/**
 * - FriendPanel()
 *
 * - Renders the friend panel and manages friend/notification state
 */
const FriendPanel = () => {
  const { friendList, authToken, user, setFriendList } = useGlobalAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(null);
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
    setShowNotifications((prev) => !prev);
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
        notifications.friendRequests.length + notifications.newMessages.length,
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

  // Remove friend handler
  const handleRemoveFriend = async (friend) => {
    setPendingRemove(friend);
    setModalOpen(true);
  };

  const confirmRemoveFriend = async () => {
    if (!pendingRemove) return;
    const { friendId } = pendingRemove;
    setModalOpen(false);
    setPendingRemove(null);
    // API call
    const res = await removeFriendAPI(user.user_id, friendId, authToken);
    if (res.success) {
      // Real-time update via socket
      socket.emit("removeFriend", { userId: user.user_id, friendId });
      // Remove from UI
      const updatedList = friendList.filter((f) => f.friendId !== friendId);
      setFriendList(updatedList);
      // If current chat is deleted, select top chat
      if (currentChat && currentChat.friendId === friendId) {
        setCurrentChat(updatedList[0] || null);
      }
      // Reset alreadyFriends so Add Friend button is enabled
      if (typeof window !== "undefined" && window.dispatchEvent) {
        // Custom event to trigger state update in SearchWindow if needed
        window.dispatchEvent(new Event("friendRemoved"));
      }
      if (typeof setAlreadyFriends === "function") {
        setAlreadyFriends(false);
      }
      toastMessage("Friend removed successfully.");
    } else {
      toastMessage("Failed to remove friend.");
    }
  };

  // Listen for real-time removal
  useEffect(() => {
    const onFriendRemoved = ({ userId, friendId }) => {
      if (user.user_id === userId || user.user_id === friendId) {
        const updatedList = friendList.filter(
          (f) => f.friendId !== (user.user_id === userId ? friendId : userId),
        );
        setFriendList(updatedList);
        if (
          currentChat &&
          (currentChat.friendId === friendId || currentChat.friendId === userId)
        ) {
          setCurrentChat(updatedList[0] || null);
        }
      }
    };
    socket.on("friendRemoved", onFriendRemoved);
    return () => socket.off("friendRemoved", onFriendRemoved);
  }, [friendList, currentChat, user.user_id]);

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
              onDelete={() => handleRemoveFriend(friend)}
              showDelete={true}
              {...friend}
            />
          );
        })}
      </ul>
      <RemoveFriendModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmRemoveFriend}
        friendName={pendingRemove?.username || "this user"}
      />
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
