import { useGlobalState } from "../../context/StateContext.jsx";

const ChatBar = () => {
  const { chatValue, setChatValue } = useGlobalState();

  const handleChat = (e) => {
    e.preventDefault();
    if (chatValue === "") {
      return;
    }
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
