import { useGlobalState } from "../../context/StateContext.jsx";
import { useGlobalAuth } from "../../context/AuthContext.jsx";
import FriendItem from "./FriendItem.jsx";
import { socket } from "../../scripts/socket.js";
import { fetchRoomId } from "../../scripts/friendScript.js";

const SearchWindow = () => {
  const { searchedUser, setIsSearching, setSearchedUser } = useGlobalState();
  const { authToken, user } = useGlobalAuth();

  const handleAdd = async () => {
    const userRoomId = await fetchRoomId(searchedUser.userID, authToken);
    socket.emit("sendFriendRequest", { roomId: userRoomId });
    setIsSearching(false);
    setSearchedUser({});
  };

  return (
    <>
      <div className="searched">
        <FriendItem key={searchedUser.userId} user={searchedUser.username} />
        <button onClick={handleAdd} type="button">
          Add Friend
        </button>
      </div>
    </>
  );
};

export default SearchWindow;
