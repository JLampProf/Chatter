import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "../../components/home/FriendItem.jsx";
import { socket } from "../../scripts/socket.js";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../context/StateContext.jsx";

const FriendPanel = () => {
  const { friendList } = useGlobalAuth();
  const [notifAmount, setNotifAmount] = useState(0);
  const { notifStatus } = useGlobalState();

  useEffect(() => {
    const friendRequestReceived = (data) => {
      alert(data);
    };

    socket.on("receiveFriendRequest", friendRequestReceived);

    return () => {
      socket.off("receiveFriendRequest", friendRequestReceived);
    };
  });

  return (
    <section className="friend-panel">
      <div className="friend-panel-header">
        <h1>Chats</h1>
        <div className="friend-panel-header-notifications">
          <div
            className="friend-panel-header-notifications-status"
            style={{ display: `${notifStatus ? "inline" : "none"}` }}
          ></div>
          <h1>{notifAmount}</h1>
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
