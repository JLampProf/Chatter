/**
 * RemoveFriendModal.jsx
 *
 * - Modal for confirming friend removal
 */

import React from "react";

/**
 * - RemoveFriendModal({ open, onClose, onConfirm, friendName })
 *
 * - Renders modal for removing a friend
 */
const RemoveFriendModal = ({ open, onClose, onConfirm, friendName }) => {
  if (!open) return null;
  return (
    <div className="remove-friend-modal-overlay">
      <div className="remove-friend-modal">
        <h2>Remove Friend</h2>
        <p>
          Are you sure you want to remove <strong>{friendName}</strong> from
          your friends?
        </p>
        <div className="remove-friend-modal-actions">
          <button
            className="remove-friend-modal-confirm"
            style={{ background: "#e74c3c", color: "#fff" }}
            onClick={onConfirm}
          >
            Yes
          </button>
          <button className="remove-friend-modal-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveFriendModal;
