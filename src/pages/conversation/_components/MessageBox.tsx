import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/stores/conversation.store";
import { Message } from "@botpress/client";
import { CircleUser, Send } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageBox = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  return (
    <Card className="messages-box flex-grow w-[60%] max-w-[60%] bg-white px-2 h-conversation-container py-2 border-none shadow-none">
      <MessageHeader />
      <Messages messages={selectedConversation?.messages} />
      <MessageInput />
    </Card>
  );
};

export interface IMessagesProps {
  messages: Message[] | undefined;
}

const Messages: React.FC<IMessagesProps> = ({ messages }) => {
  return (
    <>
      <ScrollArea className="messages px-3 h-[var(--message-box-height)] py-1 flex flex-col ">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mt-2 text-sm",
              message.direction === "outgoing"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.payload?.text}
          </div>
        ))}
        {messages?.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mt-2 text-sm",
              message.direction === "outgoing"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.payload?.text}
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

const MessageHeader = () => {
  return (
    <CardHeader className="flex flex-row items-center h-[var(--message-box-header)] border-b ">
      {/* {selectedConversation?.channel} */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <CircleUser size={40} color="#8c8c8b" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
      </div>
    </CardHeader>
  );
};

const MessageInput = () => {
  const [input, setInput] = useState("");
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!input?.length) return;

          setInput("");
        }}
        className="flex w-full items-center space-x-2"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 h-[var(--message-input-height)]"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={!input}>
          <Send />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </>
  );
};

export default MessageBox;
