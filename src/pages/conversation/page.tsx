import { useBotpressClientStore } from "@/stores";
import ConversationInfo from "./_components/ConversationInfo";
import ConversationList from "./_components/ConversationList";
import MessageBox from "./_components/MessageBox";
import { useConversationStore } from "@/stores/conversation.store";
import { useEffect, useState } from "react";
import { messageDirections } from "@/constants/botpress";

const ConversationPage = () => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  const messages = useConversationStore((state) => state.messages ?? []);

  const [botpressBotIdAsAUser, setBotpressBotIdAsAUser] = useState<
    string | undefined
  >("");

  useEffect(() => {
    // sets the botpress bot id as a user by searching all messages
    const botpressBotIdAsAUser = messages.find(
      (message) => message.direction === messageDirections.outgoing
    )?.userId;

    setBotpressBotIdAsAUser(botpressBotIdAsAUser);
  }, [messages]);

  if (!botpressClient) return <h1>Loading...</h1>;

  return (
    <div className="flex bg-neutral-50 h-full max-h-full  justify-between">
      <ConversationList />
      {selectedConversation ? (
        <>
          <MessageBox botpressBotIdAsAUser={botpressBotIdAsAUser} />
          <ConversationInfo botpressBotIdAsAUser={botpressBotIdAsAUser} />
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <span className="text-2xl bg-gray-100 text-slate-700 px-5 py-3 rounded">
            Select a conversation to start chat
          </span>
        </div>
      )}
    </div>
  );
};

export default ConversationPage;
