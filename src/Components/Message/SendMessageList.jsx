import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMessage, getSendMessage } from "../../api/Message";

export default function SendMessageList({ isLoggedIn, user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getSendMessage().then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <>
      {messages.map((message) => {
        return (
          <>
            <div>------------------------</div>
            <div>보낸사람: {message.sender}</div>
            <div>받는사람: {message.receiver}</div>
            <div>제목: {message.title}</div>
            <div>내용: {message.mainText}</div>
            <div>날짜: {message.date}</div>
            <Button
              size="small"
              onClick={() => {
                deleteMessage(message.messageId).then((res) => {
                  alert(res.data);
                  getSendMessage()
                    .then((res) => {
                      setMessages(res.data);
                    })
                    .catch((e) => {
                      setMessages(true);
                    });
                });
              }}
            >
              삭제
            </Button>
            {isLoggedIn && (
              <Link
                to={`/messages/send/${message.receiver}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small">또보내기</Button>
              </Link>
            )}
            <div>------------------------</div>
          </>
        );
      })}
    </>
  );
}
