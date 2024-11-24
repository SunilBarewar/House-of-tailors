import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useConversationStore } from "@/stores/conversation.store";
import { Message } from "@botpress/client";
import { CircleUser, Send } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { set } from "zod";

const MessageBox = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  return (
    <Card className="messages-box flex-grow w-[60%] max-w-[60%] bg-white px-2 h-conversation-container py-2 border-none shadow-none">
      <MessageHeader />
      <Messages messages={selectedConversation?.messages} />
      <MessageInput />
    </Card>
  );
};

export interface IMessagesProps {
  messages: Message[] | undefined;
}

const Messages: React.FC<IMessagesProps> = ({ messages }) => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  const [messageList, setMessageList] = useState<Message[]>(messages ?? []);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: async () => {
      console.log("load more");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },

    rootMargin: "400px 0px 0px 0px",
  });
  const scrollableRootRef = useRef<React.ComponentRef<"div"> | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

  const reversedItems = useMemo(
    () => [...messageList].reverse(),
    [messageList]
  );
  useEffect(() => {
    setMessageList(selectedConversation?.messages ?? []);
    setHasNextPage(Boolean(selectedConversation?.nextMessagesToken));
  }, [selectedConversation]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [reversedItems, rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef]
  );

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);
  return (
    <>
      <div
        ref={rootRefSetter}
        onScroll={handleRootScroll}
        className="messages px-3 h-[var(--message-box-height)] max-h-[var(--message-box-height)] overflow-auto py-3 flex flex-col p"
      >
        <ul>
          {hasNextPage && <div ref={infiniteRef}>Loading...</div>}
          {reversedItems?.map((message, index) => (
            <ListItem
              key={message.id + Math.random()}
              message={message}
              index={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

interface ListItemProps {
  children?: React.ReactNode;
  message: Message;
  index: number;
}
export const ListItem = forwardRef<React.ComponentRef<"li">, ListItemProps>(
  function ListItem({ message, index }, ref) {
    return (
      <li
        ref={ref}
        className={cn(
          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 mt-2 text-sm",
          message.direction === "outgoing"
            ? "ml-auto bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        Message {index} {message.payload?.text}
      </li>
    );
  }
);

const MessageHeader = () => {
  return (
    <CardHeader className="flex flex-row items-center h-[var(--message-box-header)] border-b ">
      {/* {selectedConversation?.channel} */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <CircleUser size={40} color="#8c8c8b" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
      </div>
    </CardHeader>
  );
};

const MessageInput = () => {
  const [input, setInput] = useState("");
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!input?.length) return;

          setInput("");
        }}
        className="flex w-full items-center space-x-2"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 h-[var(--message-input-height)]"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={!input}>
          <Send />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </>
  );
};

export default MessageBox;
