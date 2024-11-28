import { Conversation, Message, User } from "@botpress/client";

export interface IConversationWithOptionalMessages extends Conversation {
  messages?: Message[];
  nextMessagesToken?: string | undefined;
  users?: User[];
}
