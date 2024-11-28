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
}

export const useConversationStore = create<IConversationStore>((set) => ({
  selectedConversation: null,
  nextMessagesToken: undefined,
  messages: [],
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  updateNextMessagesToken: (token: string | undefined) =>
    set({ nextMessagesToken: token }),

  setMessages: (messages: Message[]) => set({ messages }),
}));
