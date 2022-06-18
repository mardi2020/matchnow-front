import { Button } from "@mui/material";
import { deleteMessage } from "../../api/Message";

export default function MessageList({ messages, getMessages, setMessages }) {
  return (
    <>
      {messages.map((message) => {
        return (
          <>
            <div>------------------------</div>
            <div>{message.sender}</div>
            <div>{message.receiver}</div>
            <div>{message.title}</div>
            <div>{message.mainText}</div>
            <div>{message.date}</div>
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
