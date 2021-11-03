import { today } from "../../constants";
import { getWeekNumber, transformDateFormatToRussianFormat } from "./common";

export const createArrayOfWeeks = () => {
  let currentWeek = getWeekNumber(today);
  const firstDayOfCurrentYear = new Date(today.getFullYear(), 0, 1),
    firstWeekStart = 1 + (8 - firstDayOfCurrentYear.getDay()),
    firstDayOfWeek = new Date(today.getFullYear(), 0, firstWeekStart),
    arrayOfWeeks = [];

  arrayOfWeeks.push(
    `${transformDateFormatToRussianFormat(
      firstDayOfCurrentYear
    )} - ${transformDateFormatToRussianFormat(
      new Date((firstDayOfWeek as any) - 1)
    )}`
  );

  while (currentWeek >= 0) {
    arrayOfWeeks.push(transformDateFormatToRussianFormat(firstDayOfWeek));

    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    arrayOfWeeks[
      arrayOfWeeks.length - 1
    ] += ` - ${transformDateFormatToRussianFormat(firstDayOfWeek)}`;

    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
    currentWeek--;
  }

  return arrayOfWeeks;
};
