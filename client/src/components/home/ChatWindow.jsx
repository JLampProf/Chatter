/**
 * ChatWindow.jsx
 *
 * - Displays the chat messages for the current conversation
 * - Handles real-time message updates
 */

import { useEffect, useRef } from "react";
import { socket } from "../../scripts/socket.js";
import { useGlobalState } from "../../context/StateContext.jsx";
import MessageBubble from "./MessageBubble.jsx";
import LoadingBar from "./LoadingBar.jsx";
import { toastMessage } from "../../scripts/toastScript.js";

/**
 * - ChatWindow()
 *
 * - Renders the chat window and manages message updates
 */
const ChatWindow = () => {
  const { chatHistoryCache, currentChat, chatIsLoaded, setChatHistoryCache } =
    useGlobalState();
  const endRef = useRef(null);

  const messages = chatHistoryCache.get(currentChat?.friendId ?? []);

  useEffect(() => {
    endRef.current?.scrollIntoView(); // Scroll to bottom when messages update
  }, [messages]);

  useEffect(() => {
    // Handler for receiving a new message via socket
    const receiveMessage = ({ messageObject }) => {
      // Only add message to cache if it belongs to the current chat
      if (
        messageObject.sender_id === currentChat?.friendId ||
        messageObject.receiverId === currentChat?.friendId
      ) {
        setChatHistoryCache((prev) => {
          const next = new Map(prev);
          const prevMessages = next.get(currentChat?.friendId) ?? [];
          next.set(currentChat?.friendId, [...prevMessages, messageObject]);
          return next;
        });
        toastMessage(
          `${messageObject.fromUser} said: ${messageObject.message.slice(
            0,
            30,
          )}...`,
        );
      }
    };

    socket.on("receiveMessage", receiveMessage); // Listen for incoming messages

    return () => {
      socket.off("receiveMessage", receiveMessage); // Clean up listener
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
