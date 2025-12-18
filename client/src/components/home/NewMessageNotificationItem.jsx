const NewMessageNotificationItem = ({ content, username }) => {
  return (
    <li className="notification-item">{`${username} Said: ${content}`}</li>
  );
};

export default NewMessageNotificationItem;
