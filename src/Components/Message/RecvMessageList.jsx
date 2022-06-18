import { useEffect, useState } from "react";
import { getRecvMessage } from "../../api/Message";
import MessageList from "./MessageList";

export default function RecvMessageList({ isLoggedIn, user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getRecvMessage().then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <>
      <MessageList
        messages={messages}
        getMessages={getRecvMessage}
        setMessages={setMessages}
      />
    </>
  );
}
