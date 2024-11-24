import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { Client } from "@botpress/client";

export const getConversations = async (
  client: Client,
  nextConversationsToken?: string
) => {
  const response = await client.listConversations({
    nextToken: nextConversationsToken,
  });

  return {
    conversations: response.conversations,
    nextConversationsToken: response.meta.nextToken,
  };
};

export async function getConversationsWithMessages(
  client: Client,
  nextConversationsToken: string = "",
  hideEmptyConversations: boolean = true
): Promise<{
  conversations: IConversationWithOptionalMessages[];
  nextConversationsToken?: string;
}> {
  // should use the listConversationsWithMessages function

  const listRequest = await client.listConversations({
    nextToken: nextConversationsToken,
  });

  const conversations: IConversationWithOptionalMessages[] =
    listRequest.conversations;

  if (hideEmptyConversations) {
    const conversationsWithMessages = await filterOutEmptyConversations(
      client,
      conversations
    );

    return {
      conversations: conversationsWithMessages,
      nextConversationsToken: listRequest.meta.nextToken,
    };
  }

  return {
    conversations,
    nextConversationsToken: listRequest.meta.nextToken,
  };
}

export async function listMessagesByConversationId(
  client: Client,
  conversationId: string,
  nextMessagesToken?: string
) {
  const listRequest = await client.listMessages({
    conversationId,
    nextToken: nextMessagesToken,
  });

  return {
    messages: listRequest.messages,
    nextMessagesToken: listRequest.meta.nextToken,
  };
}

export async function getBotInfo(client: Client, botId: string) {
  const botInfo = await client.getBot({
    id: botId,
  });

  return {
    name: botInfo.bot.name,
  };
}

export async function filterOutEmptyConversations(
  client: Client,
  conversations: IConversationWithOptionalMessages[]
) {
  const messages = await Promise.all(
    conversations.map((conversation) => {
      return listMessagesByConversationId(client, conversation.id);
    })
  );

  const conversationsWithMessages = conversations.map((conversation, index) => {
    conversation.messages = messages[index].messages;
    conversation.nextMessagesToken = messages[index].nextMessagesToken;
    return conversation;
  });

  return conversationsWithMessages.filter(
    (conversation) => conversation.messages!.length > 0
  );
}
