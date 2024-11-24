import { useConversationStore } from "@/stores/conversation.store";

const ConversationInfo = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  return (
    <div className="w-[20%] border-l flex-shrink-0 bg-white">
      Conversations Info
    </div>
  );
};

export default ConversationInfo;
