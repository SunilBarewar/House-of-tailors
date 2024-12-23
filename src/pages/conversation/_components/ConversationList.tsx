import { logError } from "@/lib/utils";
import { getConversationsWithMessages } from "@/services/botpress/converstion";
import { useBotpressClientStore } from "@/stores";
import { useConversationStore } from "@/stores/conversation.store";
import { Client } from "@botpress/client";
import { useEffect, useLayoutEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ConversationItem from "./ConversationItem";
import ConversationListLoader from "./loaders/ConversationListLoader";

const ConversationList = () => {
  const setConversationList = useConversationStore(
    (state) => state.setConversationList
  );
  const setNextConversationsToken = useConversationStore(
    (state) => state.setNextConversationsToken
  );

  const conversationList = useConversationStore(
    (state) => state.conversationList
  );
  const nextConversationsToken = useConversationStore(
    (state) => state.nextConversationsToken
  );
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const [loadingNextConversations, setLoadingNextConversations] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchConversationsWithMessages = async (
    client: Client,
    nextConversationsToken?: string,
    fromInfiniteScroll: boolean = true
  ) => {
    try {
      const conversations = await getConversationsWithMessages(
        client,
        nextConversationsToken
      );
      if (fromInfiniteScroll) {
        setConversationList(
          [...conversations.conversations, ...conversationList].sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        );
      } else {
        setConversationList(conversations.conversations);
      }

      setNextConversationsToken(conversations.nextConversationsToken);
    } catch (error: unknown) {
      setError(true);
      logError(error);
    } finally {
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    setConversationList([]);
    setNextConversationsToken(undefined);
  }, []);

  useEffect(() => {
    if (botpressClient) {
      fetchConversationsWithMessages(botpressClient, undefined, false);
    }
  }, []);

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: loadingNextConversations,
    hasNextPage: Boolean(nextConversationsToken),
    onLoadMore: async () => {
      if (!botpressClient || loading || !nextConversationsToken) return;
      setLoadingNextConversations(true);
      await fetchConversationsWithMessages(
        botpressClient,
        nextConversationsToken
      );
      setLoadingNextConversations(false);
    },
    disabled: Boolean(error),
    rootMargin: "0px 0px 300px 0px",
  });

  if (loading) return <ConversationListLoader />;

  if (error) {
    return (
      <h1 className="w-[20%] flex-shrink-0">Failed to fetch conversations</h1>
    );
  }

  return (
    <div
      ref={rootRef}
      className="w-[20%] flex-shrink-0 border h-conversation-container overflow-auto pb-5 bg-white"
    >
      <ul>
        {conversationList.map((converstion) => (
          <ConversationItem key={converstion.id} conversation={converstion} />
        ))}

        {nextConversationsToken && loadingNextConversations && (
          <div
            ref={infiniteRef}
            className="text-center px-2 py-3 mt-4 border rounded"
          >
            Loading Convsersations...
          </div>
        )}

        {!nextConversationsToken && (
          <p className="text-center px-2 py-3 mt-4 border rounded">
            No more conversations
          </p>
        )}
      </ul>
    </div>
  );
};

export default ConversationList;
