import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { create } from "zustand";

interface IConversationStore {
  selectedConversation: IConversationWithOptionalMessages | null;
  setSelectedConversation: (
    conversation: IConversationWithOptionalMessages | null
  ) => void;
}

export const useConversationStore = create<IConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
}));
