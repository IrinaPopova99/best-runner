import { addZeroToCorrectDay, addZeroToCorrectMonth } from "../utils/date/dateFunctions";

export const today = new Date();
export const maxDate = `${today.getFullYear()}-${addZeroToCorrectMonth(
  today.getMonth()
)}-${addZeroToCorrectDay(today.getDate())}`;