import { Button } from "@mui/material";
import { deleteMessage } from "../../api/Message";

export default function MessageList({ messages, getMessages, setMessages }) {
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
                  getMessages()
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
            <div>------------------------</div>
          </>
        );
      })}
    </>
  );
}
