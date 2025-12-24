import { FaAngleDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import FriendRequestNotificationItem from "../components/home/FriendRequestNotificationItem.jsx";
import NewMessageNotificationItem from "../components/home/NewMessageNotificationItem.jsx";
import { useGlobalState } from "../context/StateContext.jsx";
// import { ToastContainer } from "react-toastify";

const Notifications = () => {
  const [isFriendOpen, setIsFriendOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const {
    friendRequestList,
    newMessageList,
    hasFriendRequests,
    hasNewMessages,
    setNotificationStatus,
    setShowNotifications,
  } = useGlobalState();

  useEffect(() => {
    if (hasFriendRequests) setIsFriendOpen(true);
    if (hasNewMessages) setIsFriendOpen(true);
    setNotificationStatus(false);
  }, []);

  return (
    <section className="notifications-main">
      <div className="notifications-bar">
        <h1>Notifications</h1>
        {/* <ToastContainer /> */}
        <FaXmark
          onClick={() => {
            setShowNotifications(false);
          }}
          className="notifications-bar-close"
        />
      </div>

      <div className="notifications-main-headings">
        <h2 className="notifications-main-headings-heading">Friend Requests</h2>
        <button
          onClick={() => setIsFriendOpen((prev) => !prev)}
          className="notifications-dropdown-button"
        >
          <FaAngleDown />
        </button>
      </div>
      <div
        className={`dropdown ${isFriendOpen ? "open" : ""}`}
        id="dropdown-friend-requests"
      >
        <ul className="dropdown-list">
          {friendRequestList.map((item) => {
            const { notification_id } = item;
            return (
              <FriendRequestNotificationItem key={notification_id} {...item} />
            );
          })}
        </ul>
      </div>
      <hr />

      <div className="notifications-main-headings">
        <h2 className="notifications-main-headings-heading">New Messages</h2>
        <button
          onClick={() => setIsMessageOpen((prev) => !prev)}
          className="notifications-dropdown-button"
        >
          <FaAngleDown />
        </button>
      </div>
      <div
        className={`dropdown ${isMessageOpen ? "open" : ""}`}
        id="dropdown-friend-requests"
      >
        <ul className="dropdown-list">
          {newMessageList.map((item) => {
            const { notification_id } = item;
            return (
              <NewMessageNotificationItem key={notification_id} {...item} />
            );
          })}
        </ul>
      </div>
      {/* <hr /> */}
    </section>
  );
};

export default Notifications;
