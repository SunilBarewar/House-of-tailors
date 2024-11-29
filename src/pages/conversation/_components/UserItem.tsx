import { formatDateAndTime } from "@/lib/date";
import defaultAvatarImage from "@/assets/default-avatar.png";
import { User } from "@botpress/client";

interface UserItemProps {
  user: User;
  botpressBotIdAsAUser?: string;
}

const UserItem: React.FC<UserItemProps> = ({ user, botpressBotIdAsAUser }) => {
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
};

export default UserItem;
