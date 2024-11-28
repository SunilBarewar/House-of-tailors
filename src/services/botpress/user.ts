import { Client } from "@botpress/client";

export const getAUser = async (
  client: Client,
  condition: { id: string; conversationId?: string }
) => {
  const userData = await client.getUser(condition);
  return userData.user;
};

export const getUsers = async (client: Client, conversationId: string) => {
  const users = await client.listUsers({
    conversationId: conversationId,
  });
  return users;
};
