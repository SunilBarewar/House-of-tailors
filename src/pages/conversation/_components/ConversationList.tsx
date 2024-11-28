import Avatar from "@/assets/default-avatar.png";
import ChatIcon from "@/assets/icons/chat.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFetchData from "@/hooks/use-fetch-data";
import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { getFormattedConversationInfo } from "@/lib/botpress";
import { getConversationsWithMessages } from "@/services/botpress/converstion";
import { useConversationStore } from "@/stores/conversation.store";

const ConversationList = () => {
  const { loading, error, data } = useFetchData(
    getConversationsWithMessages,
    []
  );

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <h1>Failed to fetch conversations</h1>;
  }

  console.log("conversations", data);

  return (
    <ScrollArea className="w-[20%] flex-shrink-0 border h-conversation-container pb-5 bg-white">
      {data?.conversations
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .map((converstion) => (
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
  const setMessages = useConversationStore((state) => state.setMessages);
  const updateNextMessagesToken = useConversationStore(
    (state) => state.updateNextMessagesToken
  );

  const conversationInfo = getFormattedConversationInfo(conversation);
  return (
    <button
      className="py-2 px-2 border-b border-gray-200 w-full bg-muted"
      onClick={() => {
        setSelectedConversation(conversation);
        setMessages(conversation.messages ?? []);
        updateNextMessagesToken(conversation.nextMessagesToken);
      }}
    >
      <div className="flex gap-3 items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <img
            src={Avatar}
            alt="Avatar"
            className="rounded-full w-[40px] h-[40px]"
          />{" "}
          <div className="text-left">
            <p className=" text-gray-600 ">{conversationInfo.userName}</p>{" "}
            <p className="text-xs text-muted-foreground">
              {conversationInfo.lastUpdatedAt}
            </p>
          </div>
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
