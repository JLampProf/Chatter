/**
 * FriendItem.jsx
 *
 * - Renders a single friend in the friend list
 * - Handles selection and delete button
 */

import { useGlobalAuth } from "../../context/AuthContext.jsx";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";

/**
 * - FriendItem({ username, friendId, room_id, isSelected, onSelect, onDelete, showDelete })
 *
 * - Renders a friend item with optional delete button
 */
const FriendItem = ({
  username,
  friendId,
  room_id,
  isSelected,
  onSelect,
  onDelete,
  showDelete = false,
}) => {
  const { user } = useGlobalAuth();
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className={`friend-item ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <div className="friend-item-image">
        <h1>{username?.slice(0, 1)}</h1>
      </div>
      <h3>{username}</h3>
      {showDelete && hovered && (
        <button
          className="friend-item-delete-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click event
            onDelete && onDelete(); // Call delete handler
          }}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--primary)",
            fontSize: 20,
            zIndex: 2,
          }}
          aria-label="Remove friend"
        >
          <FaTrashCan />
        </button>
      )}
    </li>
  );
};

export default FriendItem;
