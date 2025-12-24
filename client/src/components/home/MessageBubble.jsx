import { format } from "date-fns";
import { useGlobalAuth } from "../../context/AuthContext.jsx";

const MessageBubble = ({ chat_id, message, message_time, name, sender_id }) => {
  const { user } = useGlobalAuth();

  const timeFormat = `${format(
    message_time ?? new Date(),
    "dd/MM/yyyy\tHH:mm"
  )}`;

  return (
    <li className="message-bubble">
      <div className="message-bubble-header">
        <h2>{sender_id === user.user_id ? user.username : name}</h2>
        <h5>{timeFormat}</h5>
      </div>
      <p>{message}</p>
    </li>
  );
};

export default MessageBubble;
