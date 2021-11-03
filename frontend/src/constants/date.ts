import { addZeroToCorrectDay, addZeroToCorrectMonth } from "../utils/date/common";

export const today = new Date();
export const maxDate = `${today.getFullYear()}-${addZeroToCorrectMonth(
  today.getMonth()
)}-${addZeroToCorrectDay(today.getDate())}`;

export const daysInWeek = 7;
export const msInDay = 86400000;