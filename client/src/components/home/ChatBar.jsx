import { useGlobalState } from "../../context/StateContext.jsx";
import { useGlobalAuth } from "../../context/AuthContext.jsx";
import { socket } from "../../scripts/socket.js";
import { saveMessage } from "../../scripts/chatScript.js";
import { toastMessage } from "../../scripts/toastScript.js";

const ChatBar = () => {
  const {
    chatValue,
    setChatValue,
    currentChat,
    chatHistoryCache,
    setChatHistoryCache,
  } = useGlobalState();
  const { user, authToken } = useGlobalAuth();

  let messageObject = {
    message: "",
    receiverId: 0,
    sender_id: 0,
    roomId: null,
    fromUser: "",
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (chatValue === "") {
      return;
    }

    messageObject = {
      message: chatValue,
      receiverId: currentChat.friendId,
      sender_id: user.user_id,
      roomId: currentChat.room_id,
      fromUser: user.username,
    };

    const saved = await saveMessage(messageObject, authToken);
    if (saved?.error) {
      switch (saved?.response) {
        case 500:
          toastMessage("Unexpected Server Error, Please try again");
          break;
      }
    }

    setChatHistoryCache((prev) => {
      const next = new Map(prev);
      const prevMessages = next.get(currentChat.friendId) ?? [];
      next.set(currentChat.friendId, [...prevMessages, messageObject]);
      return next;
    });

    socket.emit("sendMessage", { messageObject });

    setChatValue("");
  };

  return (
    <section className="chat-bar">
      <form className="chat-bar-form" onSubmit={handleChat}>
        <input
          onChange={(e) => setChatValue(e.target.value)}
          id="chatInput"
          value={chatValue}
          type="text"
          placeholder="message"
        />
        <button>Send</button>
      </form>
    </section>
  );
};

export default ChatBar;
