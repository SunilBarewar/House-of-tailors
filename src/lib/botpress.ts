import { IConversationWithOptionalMessages } from "@/interface/botpress.interface";
import { IAppointment } from "@/pages/appointment/_components/AppointmentTable";
import { Row } from "@botpress/client";
import { formatDateAndTime } from "./date";
import { integrationTypes, messageDirections } from "@/constants/botpress";

export const getBotpressCredentials = () => {
  const creds = {
    token: import.meta.env.VITE_BOTPRESS_TOKEN,
    botId: import.meta.env.VITE_BOTPRESS_BOT_ID,
    workspaceId: import.meta.env.VITE_BOTPRESS_WORKSPACE_ID,
  };

  Object.values(creds).forEach((value) => {
    if (!value) {
      throw new Error("Missing botpress credentials");
    }
  });

  return creds;
};

export const cleanAppointmentData = (data: Row[]): IAppointment[] => {
  return data?.map?.((entry) => ({
    // Retain essential fields and map keys to camelCase
    id: entry.id,
    createdAt: entry.createdAt ?? "",
    updatedAt: entry.updatedAt ?? "",
    name: entry.Name || "Unknown", // Fallback to "Unknown" if the name is missing
    location:
      entry["Location "] === "undefined" ? null : entry["Location "].trim(), // Replace "undefined" with null and trim whitespace
    phoneNumber: entry["Phone Number"] ?? "",
    appointmentDate: entry["Appoinment Date"] ?? "",
  }));
};

export const getFormattedConversationInfo = (
  conversation: IConversationWithOptionalMessages
) => {
  const lastUpdatedAt = formatDateAndTime(conversation.updatedAt);

  const lastMessage = conversation.messages?.[conversation.messages.length - 1];
  const botUserId = conversation.messages?.find(
    (message) => message.direction === messageDirections.outgoing
  )?.userId;

  const user = conversation.users?.find((user) => user.id !== botUserId);
  let userName = "";

  if (conversation.integration === integrationTypes.whatsapp) {
    userName = user?.name ?? "Unknown";
  } else {
    userName = "Webchat User";
  }
  // const userName =

  return {
    lastUpdatedAt,
    lastMessage,
    userName,
  };
};
