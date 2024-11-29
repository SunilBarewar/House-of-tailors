import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logError, sortMessages } from "@/lib/utils";
import { useBotpressClientStore } from "@/stores";
import { useConversationStore } from "@/stores/conversation.store";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type IMessageInputProps = {
  botpressBotIdAsAUser: string | undefined;
  conversationId: string | undefined;
};
const MessageInput: React.FC<IMessageInputProps> = ({
  botpressBotIdAsAUser,
  conversationId,
}) => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const setMessages = useConversationStore((state) => state.setMessages);
  const messages = useConversationStore((state) => state.messages);

  const [messageInput, setMessageInput] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendMessage = async () => {
    if (isSendingMessage) return;
    if (!conversationId) {
      return toast.error("No conversation selected");
    }
    if (!botpressBotIdAsAUser) {
      return toast.error("No botpress bot id as a user present");
    }
    setIsSendingMessage(true);
    try {
      const response = await botpressClient?.createMessage({
        conversationId,
        userId: botpressBotIdAsAUser!,
        payload: { text: messageInput },
        type: "text",
        tags: {},
      });
      if (response?.message) {
        console.log("response", response);
        setMessages(sortMessages([...messages, response.message]));
        setMessageInput("");
      }
    } catch (error) {
      logError(error);
    } finally {
      setIsSendingMessage(false);
    }
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSendMessage();
        }}
        className="flex w-full items-center space-x-2"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 h-[var(--message-input-height)]"
          autoComplete="off"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={!messageInput}>
          {isSendingMessage ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Send />
              <span className="sr-only animate-spin">Send</span>
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default MessageInput;
