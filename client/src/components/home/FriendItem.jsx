import { useGlobalAuth } from "../../context/AuthContext.jsx";

const FriendItem = ({ username, friendId, room_id, isSelected, onSelect }) => {
  const { user } = useGlobalAuth();

  return (
    <li
      className={`friend-item ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="friend-item-image">
        <h1>{username?.slice(0, 1)}</h1>
      </div>
      <h3>{username}</h3>
    </li>
  );
};

export default FriendItem;
