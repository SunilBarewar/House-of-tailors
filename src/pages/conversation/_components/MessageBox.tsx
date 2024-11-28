import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { messageDirections } from "@/constants/botpress";
import { formatDateAndTime } from "@/lib/date";
import { cn, sortMessages } from "@/lib/utils";
import { listMessages } from "@/services/botpress/converstion";
import { useBotpressClientStore } from "@/stores";
import { useConversationStore } from "@/stores/conversation.store";
import { Message } from "@botpress/client";
import { CircleUser, Send } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import useInfiniteScroll from "react-infinite-scroll-hook";

const MessageBox = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  const messages = useConversationStore((state) => state.messages ?? []);

  const [botpressBotIdAsAUser, setBotpressBotIdAsAUser] = useState<string>("");

  useEffect(() => {
    // sets the botpress bot id as a user by searching all messages
    messages.forEach((message) => {
      if (message.direction === messageDirections.outgoing) {
        setBotpressBotIdAsAUser(message.userId);
      }
    });
  }, [messages]);
  return (
    <Card className="messages-box flex-grow w-[60%] max-w-[60%] bg-white px-2 h-conversation-container py-2 border-none shadow-none">
      <MessageHeader />
      <Messages botpressBotIdAsAUser={botpressBotIdAsAUser} />
      <MessageInput
        botpressBotIdAsAUser={botpressBotIdAsAUser}
        conversationId={selectedConversation?.id}
      />
    </Card>
  );
};

export interface IMessagesProps {
  botpressBotIdAsAUser: string;
}

const Messages: React.FC<IMessagesProps> = ({ botpressBotIdAsAUser }) => {
  const conversationStore = useConversationStore((state) => state);
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  // const [messageList, setMessageList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(
    Boolean(conversationStore?.nextMessagesToken)
  );
  console.log("hasNextPage", hasNextPage);
  console.log("messages", conversationStore?.messages);
  const fetchMessages = async () => {
    if (!botpressClient) {
      return toast.error("Botpress client not initialized");
    }
    if (!conversationStore.selectedConversation) {
      return toast.error("No conversation selected");
    }

    setLoading(true);
    try {
      const messagesData = await listMessages(
        botpressClient,
        conversationStore.selectedConversation?.id,
        conversationStore?.nextMessagesToken
      );

      // setMessageList([...messagesData.messages, ...messageList]);
      conversationStore.setMessages(sortMessages([...messagesData.messages]));
      conversationStore.updateNextMessagesToken(messagesData.nextMessagesToken);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: Boolean(conversationStore?.nextMessagesToken),
    onLoadMore: fetchMessages,

    rootMargin: "400px 0px 0px 0px",
  });
  const scrollableRootRef = useRef<React.ComponentRef<"div"> | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

  // const reversedItems = useMemo(
  //   () => [...messageList].reverse(),
  //   [messageList]
  // );

  useEffect(() => {
    // setMessageList(selectedConversation?.messages ?? []);
    // console.log(
    //   "selectedConversation",
    //   selectedConversation?.nextMessagesToken
    // );
    setHasNextPage(Boolean(conversationStore.nextMessagesToken));
  }, [conversationStore.nextMessagesToken]);

  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [conversationStore.messages, rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef]
  );

  // useLayoutEffect(() => {
  //   const scrollableRoot = scrollableRootRef.current;
  //   if (scrollableRoot) {
  //     scrollableRoot.scrollTop = 0;
  //   }
  // }, [conversationStore.selectedConversation]);

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
          {conversationStore.messages?.map((message, index) => (
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
  function ListItem({ message }, ref) {
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
  }
);

const MessageHeader = () => {
  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );
  return (
    <CardHeader className="flex flex-row items-center h-[var(--message-box-header)] border-b ">
      {/* {selectedConversation?.channel} */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <CircleUser size={40} color="#8c8c8b" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">
            {selectedConversation?.id}
          </p>
        </div>
      </div>
    </CardHeader>
  );
};

type IMessageInputProps = {
  botpressBotIdAsAUser: string;
  conversationId: string;
};
const MessageInput: React.FC<IMessageInputProps> = ({
  botpressBotIdAsAUser,
  conversationId,
}) => {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const setMessages = useConversationStore((state) => state.setMessages);
  const messages = useConversationStore((state) => state.messages);

  const [messageInput, setMessageInput] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendMessage = async () => {
    if (!conversationId) {
      return toast.error("No conversation selected");
    }
    if (!botpressBotIdAsAUser) {
      return toast.error("No botpress bot id as a user present");
    }
    try {
      const response = await botpressClient?.createMessage({
        conversationId,
        userId: botpressBotIdAsAUser!,
        payload: { text: messageInput },
        type: "text",
        tags: {},
      });
      if (response?.message) {
        console.log("response", response);
        setMessages(sortMessages([...messages, response.message]));
        setMessageInput("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSendMessage();
        }}
        className="flex w-full items-center space-x-2"
      >
        <Input
          id="message"
          placeholder="Type your message..."
          className="flex-1 h-[var(--message-input-height)]"
          autoComplete="off"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
        />
        <Button type="submit" size="icon" disabled={!messageInput}>
          <Send />
          <span className="sr-only animate-spin">Send</span>
        </Button>
      </form>
    </>
  );
};

export default MessageBox;
