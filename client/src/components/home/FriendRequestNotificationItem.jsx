import {
  sendAcceptFriend,
  sendRejectFriend,
  fetchFriendsList,
} from "../../scripts/friendRequestScript";
import { useGlobalAuth } from "../../context/AuthContext.jsx";
import { useGlobalState } from "../../context/StateContext.jsx";
import { toastMessage } from "../../scripts/toastScript.js";
import { socket } from "../../scripts/socket.js";

const FriendRequestNotificationItem = ({
  username,
  to_user_id,
  from_user_id,
  notification_id,
  content,
}) => {
  const { authToken, setFriendList } = useGlobalAuth();
  const { setFriendRequestList } = useGlobalState();

  const handleAccept = async () => {
    try {
      const accepted = await sendAcceptFriend(
        to_user_id,
        from_user_id,
        authToken
      );

      if (accepted?.error) {
        switch (accepted?.status) {
          case 500:
            toastMessage(
              "A server error occurred, please refresh and try again"
            );
        }
      }

      toastMessage("Friend Request accepted");

      const newList = await fetchFriendsList(to_user_id, authToken);
      setFriendList(newList);

      socket.emit("acceptFriendRequest", { content });

      handleDecline(false);
    } catch (error) {
      console.log(error);
      toastMessage("An error occurred, please refresh and try again.");
    }
  };

  const handleDecline = async (shout) => {
    try {
      const rejected = await sendRejectFriend(notification_id, authToken);

      if (rejected?.error) {
        switch (rejected?.status) {
          case 500:
            toastMessage(
              "Could not remove friend request, please try again later."
            );
        }
      }

      if (shout === true) toastMessage("Friend Request Removed");

      setFriendRequestList((prev) => {
        return prev.filter((item) => item.notification_id !== notification_id);
      });
    } catch (error) {
      console.log("RejectedErr:", error);
      toastMessage("Something went wrong, please sign out and back in.");
    }
  };

  return (
    <li className="notification-item">
      {`${username} has sent you an invite`}{" "}
      <div>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={() => handleDecline(true)}>Decline</button>
      </div>
    </li>
  );
};

export default FriendRequestNotificationItem;
