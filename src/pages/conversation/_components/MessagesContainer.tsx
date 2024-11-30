import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MessageItem from "./MessageItem";
import { useConversationStore } from "@/stores/conversation.store";
import { useBotpressClientStore } from "@/stores";
import toast from "react-hot-toast";
import { listMessages } from "@/services/botpress/converstion";
import { logError, sortMessages } from "@/lib/utils";
import useInfiniteScroll from "react-infinite-scroll-hook";

export interface IMessagesProps {
  botpressBotIdAsAUser?: string;
}

const MessagesContainer: React.FC<IMessagesProps> = () => {
  const conversationStore = useConversationStore((state) => state);
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  // const [messageList, setMessageList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(
    Boolean(conversationStore?.nextMessagesToken)
  );

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
      conversationStore.setMessages(
        sortMessages([...messagesData.messages, ...conversationStore.messages])
      );
      conversationStore.updateNextMessagesToken(messagesData.nextMessagesToken);
    } catch (error) {
      toast.error("Failed to fetch messages");
      logError(error);
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

  useEffect(() => {
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
          {hasNextPage && (
            <div
              ref={infiniteRef}
              className="text-center px-2 py-2 mt-4 border rounded"
            >
              Loading messages...
            </div>
          )}
          {conversationStore.messages?.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MessagesContainer;
