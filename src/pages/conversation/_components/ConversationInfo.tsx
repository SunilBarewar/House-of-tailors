import { formatDateAndTime } from "@/lib/date";
import { useConversationStore } from "@/stores/conversation.store";
import defaultAvatarImage from "@/assets/default-avatar.png";
import { User } from "@botpress/client";
import { useBotpressClientStore } from "@/stores";
import toast from "react-hot-toast";

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
          className="bg-red-500 font-medium text-white rounded-md p-2"
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

interface UserItemProps {
  user: User;
  botpressBotIdAsAUser?: string;
}

export function UserItem({ user, botpressBotIdAsAUser }: UserItemProps) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-md p-4 w-full border">
      <div className="flex gap-2 items-center">
        <img src={defaultAvatarImage} alt="Default avatar" className="h-10" />
        {user.id === botpressBotIdAsAUser ? (
          <p className="flex flex-col">
            <span className="font-medium text-blue-500">Bot</span>
          </p>
        ) : (
          <p className="flex flex-col leading-none">
            <span className="font-medium">
              {user.tags["whatsapp:name"] ||
                user.tags["name"] ||
                "Unnamed user"}
            </span>
            {user.tags["whatsapp:userId"] ? (
              <span className="text-sm text-gray-400">
                {user.tags["whatsapp:userId"]}
              </span>
            ) : (
              <></>
            )}
          </p>
        )}
      </div>
      <hr />
      {Object.keys(user.tags).length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            {Object.keys(user.tags)
              .filter(
                (tag) => tag !== "whatsapp:name" && tag !== "whatsapp:userId"
              )
              .map((tag) => {
                return (
                  <span
                    className="flex flex-col bg-gray-200 rounded-md px-2 py-1 text-xs"
                    key={tag}
                  >
                    <span className="font-medium">🏷️ {tag}</span>{" "}
                    <span className="">{user.tags[tag]}</span>
                  </span>
                );
              })}
          </div>
          <hr />
        </>
      )}
      <p className="flex items-center gap-1">
        <span className="text-sm text-gray-400">
          Created at {formatDateAndTime(user.createdAt)}
        </span>
      </p>
    </div>
  );
}
