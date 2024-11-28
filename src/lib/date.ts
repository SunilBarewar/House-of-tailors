import { dateTimeFormats } from "@/constants/date";
import moment from "moment-timezone";

/**
 * Converts a given date to the specified format using moment.js.
 * Defaults to the current date and the format 'DD MMM YYYY, hh:mm A' if not provided.
 * @param date - The date to be formatted. Can be a Date object, string, or moment-compatible input.
 * @param format - The desired date format. Defaults to 'DD MMM YYYY, hh:mm A'.
 * @returns The formatted date string or an empty string if the date is invalid.
 */

type DateType = Date | string | undefined | null;
export const formatDateAndTime = (
  date: DateType = new Date(),
  format: string = dateTimeFormats.MESSAGE_DATE_TIME_FORMAT
): string => {
  const momentDate = moment(date);

  return momentDate.isValid() ? momentDate.format(format) : "";
};
