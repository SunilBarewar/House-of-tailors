import { messageDirections } from "@/constants/botpress";
import { formatDateAndTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Message } from "@botpress/client";
import { forwardRef } from "react";

interface MessageItemProps {
  children?: React.ReactNode;
  message: Message;
  index: number;
}

export const MessageItem = forwardRef<
  React.ComponentRef<"li">,
  MessageItemProps
>(function MessageItem({ message }, ref) {
  return (
    <li
      ref={ref}
      className={cn(
        "flex w-max max-w-[60%] flex-col gap-1 rounded-lg px-3 py-2 mt-2 text-sm",
        message.direction === "outgoing"
          ? "ml-auto bg-primary text-primary-foreground"
          : "bg-muted"
      )}
    >
      <p> {message.payload?.text}</p>
      <p
        className={cn(
          "text-[0.6rem] text-right italic",
          message.direction === messageDirections.outgoing
            ? "text-gray-50"
            : "text-muted-foreground"
        )}
      >
        {formatDateAndTime(message.createdAt)}
      </p>
    </li>
  );
});

export default MessageItem;
