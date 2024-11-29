import { formatDateAndTime } from "@/lib/date";
import { useConversationStore } from "@/stores/conversation.store";

import { useBotpressClientStore } from "@/stores";
import toast from "react-hot-toast";
import UserItem from "./UserItem";

interface IConversationInfoProps {
  botpressBotIdAsAUser?: string;
  className?: string;
}

const ConversationInfo: React.FC<IConversationInfoProps> = ({
  botpressBotIdAsAUser,
}) => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  const conversationList = useConversationStore(
    (state) => state.conversationList
  );
  const setConversationList = useConversationStore(
    (state) => state.setConversationList
  );
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );
  const setSelectedConversation = useConversationStore(
    (state) => state.setSelectedConversation
  );

  if (!selectedConversation) return null;

  const { users } = selectedConversation ?? {};

  const handleDeleteConversation = async (conversationId: string) => {
    if (!botpressClient) {
      return toast.error("client is not initialized");
    }

    await botpressClient?.deleteConversation({
      id: conversationId,
    });

    toast.success("Conversation deleted successfully");

    const newConversationList = conversationList.filter(
      (conversation) => conversation.id !== conversationId
    );

    setConversationList(newConversationList);
    setSelectedConversation(null);
  };

  return (
    <div className="w-[20%] border-l flex-shrink-0 bg-white">
      <div className={`flex flex-col gap-8 p-4`}>
        <div>
          {users && users?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {users
                .sort((a) =>
                  // to have the bot at the bottom always
                  a.id === botpressBotIdAsAUser ? 1 : -1
                )
                .map((user, index) => {
                  return (
                    <UserItem
                      user={user}
                      botpressBotIdAsAUser={botpressBotIdAsAUser}
                      key={index}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col justify-between text-gray-400 gap-2 rounded-md p-4 w-full border-2">
              No users info
            </div>
          )}
        </div>

        <hr />
        <div className="flex flex-col items-center gap-2">
          {selectedConversation?.tags &&
            Object.keys(selectedConversation?.tags).map((tag) => {
              return (
                <span
                  className="bg-gray-200 w-full rounded-md px-2 py-1 text-xs"
                  key={tag}
                >
                  🏷️ <span className="font-medium">{tag}</span>{" "}
                  <span className="">{selectedConversation.tags[tag]}</span>
                </span>
              );
            })}
        </div>
        <hr />

        {/* Conversation creation date */}
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1">
            <span>📅</span>
            <span className="text-gray-400 text-sm">
              Started at {formatDateAndTime(selectedConversation?.createdAt)}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <span>📝</span>
            <span className="text-gray-400 text-sm">
              Updated at {formatDateAndTime(selectedConversation?.updatedAt)}
            </span>
          </p>
        </div>
        <hr />
        <button
          className="bg-red-500 text-white rounded-md p-2 hover:bg-red-400"
          type="button"
          onClick={() => handleDeleteConversation(selectedConversation?.id)}
        >
          Delete conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationInfo;
