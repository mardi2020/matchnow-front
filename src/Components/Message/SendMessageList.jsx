import { useEffect, useState } from "react";
import { getSendMessage } from "../../api/Message";
import MessageList from "./MessageList";

export default function SendMessageList({ isLoggedIn, user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getSendMessage().then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <>
      <MessageList
        messages={messages}
        getMessages={getSendMessage}
        setMessages={setMessages}
      />
    </>
  );
}
