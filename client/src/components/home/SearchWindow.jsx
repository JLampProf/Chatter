import { useGlobalState } from "../../context/StateContext.jsx";
import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "./FriendItem.jsx";
import { socket } from "../../scripts/socket.js";
import { fetchRoomId } from "../../scripts/searchScript.js";
import { sendFriendRequest } from "../../scripts/friendScript.js";
import { toastMessage } from "../../scripts/toastScript.js";

const SearchWindow = () => {
  const { searchedUser, setIsSearching, setSearchedUser, alreadyFriends } =
    useGlobalState();
  const { authToken, user } = useGlobalAuth();

  const handleAdd = async () => {
    try {
      const userRoomId = await fetchRoomId(searchedUser.userID, authToken);
      if (userRoomId?.error) {
        if (userRoomId?.status === 400) {
          toastMessage(
            "Could not complete request, please wait and try again."
          );
        }
      }

      const sendRequest = await sendFriendRequest(
        user.user_id,
        searchedUser.userID,
        user.roomId,
        authToken
      );

      if (sendRequest?.error) {
        switch (sendRequest?.status) {
          case 500:
            toastMessage(
              "Could not send friend request, please wait and try again."
            );
            break;
          case 400:
            toastMessage(
              "Could not complete request, please wait and try again."
            );
            break;
        }
      }
      socket.emit("sendFriendRequest", { roomId: userRoomId });
      setIsSearching(false);
      setSearchedUser({});
      toastMessage("Friend Request Sent");
    } catch (error) {
      throw new Error("Could not Add");
    }
  };

  return (
    <>
      <div className="searched">
        <FriendItem
          key={searchedUser.userID}
          username={searchedUser.username}
        />
        <button onClick={handleAdd} type="button" disabled={alreadyFriends}>
          Add Friend
        </button>
      </div>
    </>
  );
};

export default SearchWindow;
