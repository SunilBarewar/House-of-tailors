import { create } from "zustand";
import { Client } from "@botpress/client";
import toast from "react-hot-toast";
import { logError } from "@/lib/utils";

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
    } catch (e: unknown) {
      toast.error("Couldn't create client");
      logError(e);
      return null;
    }
  },

  deleteClient: () => {
    set({ botpressClient: undefined });
  },
}));
