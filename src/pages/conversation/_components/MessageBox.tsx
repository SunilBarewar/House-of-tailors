import { Card } from "@/components/ui/card";
import { useConversationStore } from "@/stores/conversation.store";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessagesContainer from "./MessagesContainer";

interface IMessageBoxProps {
  botpressBotIdAsAUser: string | undefined;
}

const MessageBox: React.FC<IMessageBoxProps> = ({ botpressBotIdAsAUser }) => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );

  return (
    <Card className="messages-box flex-grow w-[60%] max-w-[60%] bg-white px-2 h-conversation-container py-2 border-none shadow-none">
      <MessageHeader />
      <MessagesContainer botpressBotIdAsAUser={botpressBotIdAsAUser} />
      <MessageInput
        botpressBotIdAsAUser={botpressBotIdAsAUser}
        conversationId={selectedConversation?.id}
      />
    </Card>
  );
};

export default MessageBox;
