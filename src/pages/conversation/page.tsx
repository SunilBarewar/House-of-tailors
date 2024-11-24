import { useBotpressClientStore } from "@/stores";
import ConversationInfo from "./_components/ConversationInfo";
import ConversationList from "./_components/ConversationList";
import MessageBox from "./_components/MessageBox";
import { useConversationStore } from "@/stores/conversation.store";

const ConversationPage = () => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );

  if (!botpressClient) return <h1>Loading...</h1>;

  return (
    <div className="flex bg-neutral-50 h-full max-h-full  justify-between">
      <ConversationList />
      {selectedConversation ? (
        <>
          <MessageBox />
          <ConversationInfo />
        </>
      ) : (
        <div>Select a conversation to start chat</div>
      )}
    </div>
  );
};

export default ConversationPage;
