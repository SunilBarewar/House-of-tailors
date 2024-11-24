import { getBotpressCredentials } from "@/lib/botpress";
import { useBotpressClientStore } from "@/stores";
import { useEffect } from "react";

const useInitializeBotpressClient = () => {
  //   const createClient = useBotpressClientStore((state) => state.createClient);
  const { createClient, botpressClient } = useBotpressClientStore(
    (state) => state
  );

  useEffect(() => {
    if (botpressClient) return;

    const creds = getBotpressCredentials();
    createClient(creds.token, creds.workspaceId, creds.botId);
  }, [createClient, botpressClient]);
};

export default useInitializeBotpressClient;
