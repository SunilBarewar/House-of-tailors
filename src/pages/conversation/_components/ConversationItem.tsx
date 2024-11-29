import Avatar from "@/assets/default-avatar.png";
import ChatIcon from "@/assets/icons/chat.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { getFormattedConversationInfo } from "@/lib/botpress";
import { useConversationStore } from "@/stores/conversation.store";

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

export default ConversationItem;
