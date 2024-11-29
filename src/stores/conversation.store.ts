import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { Message } from "@botpress/client";
import { create } from "zustand";

interface IConversationStore {
  selectedConversation: IConversationWithOptionalMessages | null;
  setSelectedConversation: (
    conversation: IConversationWithOptionalMessages | null
  ) => void;
  messages: Message[];
  nextMessagesToken: string | undefined;
  updateNextMessagesToken: (token: string | undefined) => void;
  setMessages: (messages: Message[]) => void;
  conversationList: IConversationWithOptionalMessages[];
  nextConversationsToken: string | undefined;
  setNextConversationsToken: (token: string | undefined) => void;
  setConversationList: (
    conversations: IConversationWithOptionalMessages[]
  ) => void;
}

export const useConversationStore = create<IConversationStore>((set) => ({
  selectedConversation: null,
  nextMessagesToken: undefined,
  messages: [],
  conversationList: [],
  nextConversationsToken: undefined,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  updateNextMessagesToken: (token: string | undefined) =>
    set({ nextMessagesToken: token }),

  setMessages: (messages: Message[]) => set({ messages }),

  setNextConversationsToken: (token: string | undefined) =>
    set({ nextConversationsToken: token }),

  setConversationList: (conversations: IConversationWithOptionalMessages[]) =>
    set({ conversationList: conversations }),
}));
