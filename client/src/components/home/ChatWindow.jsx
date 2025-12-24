import { useEffect, useRef } from "react";
import { socket } from "../../scripts/socket.js";
import { useGlobalState } from "../../context/StateContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import LoadingBar from "./LoadingBar.jsx";

const ChatWindow = () => {
  const { chatHistoryCache, currentChat, chatIsLoaded, setChatHistoryCache } =
    useGlobalState();
  const endRef = useRef(null);

  const messages = chatHistoryCache.get(currentChat?.friendId ?? []);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const receiveMessage = ({ messageObject }) => {
      console.log("msg:", messageObject);
      // Only add message to cache if it belongs to the current chat
      if (messageObject.roomId === currentChat?.room_id) {
        setChatHistoryCache((prev) => {
          const next = new Map(prev);
          const prevMessages = next.get(currentChat?.friendId) ?? [];
          next.set(currentChat?.friendId, [...prevMessages, messageObject]);
          return next;
        });
      }
    };

    socket.on("receiveMessage", receiveMessage);

    return () => {
      socket.off("receiveMessage", receiveMessage);
    };
  }, [currentChat]);

  return (
    <section className="chat-window">
      {chatIsLoaded ? (
        <ul>
          {messages?.map((message) => {
            return (
              <MessageBubble
                key={message?.chat_id}
                name={currentChat.username}
                {...message}
              />
            );
          })}
          <div ref={endRef}></div>
        </ul>
      ) : (
        <LoadingBar />
      )}
    </section>
  );
};

export default ChatWindow;
