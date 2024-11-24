import { Conversation, Message } from "@botpress/client";

export interface IConversationWithOptionalMessages extends Conversation {
  messages?: Message[];
  nextMessagesToken?: string;
}
