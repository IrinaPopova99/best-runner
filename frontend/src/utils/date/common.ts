import { daysInWeek, msInDay } from "../../constants";

export const getWeekNumber = (currentDate: Date) => {
  const firstDayOfCurrentYear = new Date(currentDate.getFullYear(), 0, 1);
  const passedDaysInCurrentYear =
    (currentDate.getTime() - firstDayOfCurrentYear.getTime()) / msInDay;

  return Math.ceil(
    (passedDaysInCurrentYear + firstDayOfCurrentYear.getDay()) / daysInWeek
  );
};

// transform date from this "Thu Jan 26 2017 11:00:00 GMT+1100" to this "26.01.2017"
export const transformDateFormatToRussianFormat = (date: Date) => {
  return `${addZeroToCorrectDay(date.getDate())}.${addZeroToCorrectMonth(
    date.getMonth()
  )}.${date.getFullYear()}`;
};

export function addZeroToCorrectMonth(month: number) {
  if (String(month + 1).length < 2) {
    return `0${month + 1}`;
  }
  return `${month + 1}`;
};

export function addZeroToCorrectDay(day: number) {
  if (String(day).length < 2) {
    return `0${day}`;
  }
  return `${day}`;
};
