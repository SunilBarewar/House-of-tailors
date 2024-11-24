import ChatIcon from "@/assets/icons/chat.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import useFetchData from "@/hooks/use-fetch-data";
import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { getConversationsWithMessages } from "@/services/botpress/converstion";
import { useConversationStore } from "@/stores/conversation.store";
import { CircleUser } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ConversationList = () => {
  const { loading, error, data } = useFetchData(
    getConversationsWithMessages,
    []
  );

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <h1>Failed to fetch conversations</h1>;
  }

  // console.log("conversations", data);

  return (
    <ScrollArea className="w-[20%] flex-shrink-0 border h-conversation-container pb-5 bg-white">
      {data?.conversations.map((converstion) => (
        <ConversationItem key={converstion.id} conversation={converstion} />
      ))}
    </ScrollArea>
  );
};

const ConversationItem = ({
  conversation,
}: {
  conversation: IConversationWithOptionalMessages;
}) => {
  const setSelectedConversation = useConversationStore(
    (state) => state.setSelectedConversation
  );

  return (
    <button
      className="py-2 px-2 border-b border-gray-200 w-full"
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="flex gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleUser size={40} /> <p>Chatbot User</p>{" "}
        </div>
        <p>
          {conversation.integration === "whatsapp" ? (
            <img src={WhatsAppIcon} alt="" width={30} />
          ) : (
            <img src={ChatIcon} alt="" width={30} />
          )}
        </p>
      </div>
    </button>
  );
};
export default ConversationList;
