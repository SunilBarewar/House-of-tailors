import { CardHeader } from "@/components/ui/card";
import { getFormattedConversationInfo } from "@/lib/botpress";
import { useConversationStore } from "@/stores/conversation.store";
import { CircleUser } from "lucide-react";

const MessageHeader = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );

  if (!selectedConversation) return null;

  const conversationInfo = getFormattedConversationInfo(selectedConversation);
  return (
    <CardHeader className="flex flex-row items-center h-[var(--message-box-header)] border-b ">
      {/* {selectedConversation?.channel} */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <CircleUser size={40} color="#8c8c8b" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">
            {conversationInfo.userName}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedConversation?.id}
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

export default MessageHeader;
