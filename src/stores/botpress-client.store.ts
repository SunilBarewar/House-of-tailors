import { create } from "zustand";
import { Client } from "@botpress/client";
import toast from "react-hot-toast";

interface BotpressClientStore {
  botpressClient: Client | undefined;
  createClient: (
    token: string,
    workspaceId: string,
    botId: string
  ) => Client | null;
  deleteClient: () => void;
}

export const useBotpressClientStore = create<BotpressClientStore>((set) => ({
  botpressClient: undefined,

  createClient: (token, workspaceId, botId) => {
    try {
      const client = new Client({ token, workspaceId, botId });
      set({ botpressClient: client });
      return client;
    } catch (e) {
      toast.error("Couldn't create client");
      return null;
    }
  },

  deleteClient: () => {
    set({ botpressClient: undefined });
  },
}));
