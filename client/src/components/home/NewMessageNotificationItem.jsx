/**
 * NewMessageNotificationItem.jsx
 *
 * - Renders a notification for a new message
 */

const NewMessageNotificationItem = ({ content, username }) => {
  return (
    <li className="notification-item">{`${username} Said: ${content}`}</li>
  );
};

export default NewMessageNotificationItem;
