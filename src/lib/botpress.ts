export const getBotpressCredentials = () => {
  const creds = {
    token: import.meta.env.VITE_BOTPRESS_TOKEN,
    botId: import.meta.env.BOTPRESS_BOT_URL,
    workspaceId: import.meta.env.BOTPRESS_WORKSPACE_ID,
  };

  Object.values(creds).forEach((value) => {
    if (!value) {
      throw new Error("Missing botpress credentials");
    }
  });

  return creds;
};
