import { NameWeekDaysWithDistancePerDay, Workout } from "../../shared/types";

const daysInWeek = 7;
const firstMonth = 0;
const firstDay = 1;
const msInDay = 86400000;

export const getWeekNumber = (currentDate: Date) => {
  const firstDayOfCurrentYear = new Date(
    currentDate.getFullYear(),
    firstMonth,
    firstDay
  );
  const passedDaysInCurrentYear =
    (currentDate.getTime() - firstDayOfCurrentYear.getTime()) / msInDay;

  return Math.ceil(
    (passedDaysInCurrentYear + firstDayOfCurrentYear.getDay()) / daysInWeek
  );
};

export const getNameWeekDaysWithDistancePerDay =
  (): NameWeekDaysWithDistancePerDay[] => {
    return [
      {
        name: "ПН",
        distance: 0,
      },
      {
        name: "ВТ",
        distance: 0,
      },
      {
        name: "СР",
        distance: 0,
      },
      {
        name: "ЧТ",
        distance: 0,
      },
      {
        name: "ПТ",
        distance: 0,
      },
      {
        name: "СБ",
        distance: 0,
      },
      {
        name: "ВС",
        distance: 0,
      },
    ];
  };

const fixWeekdays = (day: number) => {
  if (day === 0) {
    return 6;
  }
  return day - 1;
};

// Create an object and counting kilometers for each day of the week
export const createObjectOfWeekdaysWithDistancePerDay = (
  data: Workout[]
): { weekNumber: number; distance: NameWeekDaysWithDistancePerDay[] }[] => {
  const weeksWithData: {
    weekNumber: number;
    distance: NameWeekDaysWithDistancePerDay[];
  }[] = [];
  data.forEach((item) => {
    const numberWeek = getWeekNumber(new Date(item.date));

    if (
      !weeksWithData.some((item) => Object.values(item).includes(numberWeek))
    ) {
      weeksWithData.push({
        weekNumber: numberWeek,
        distance: getNameWeekDaysWithDistancePerDay(),
      });
    }

    weeksWithData.forEach((week) => {
      if (week.weekNumber === numberWeek) {
        week.distance[fixWeekdays(item.date.getDay())].distance +=
          +item.kilometrage;
      }
    });
  });
  return weeksWithData;
};

export const addZeroToCorrectMonth = (month: number) => {
  if (String(month + 1).length < 2) {
    return `0${month + 1}`;
  }
  return `${month + 1}`;
};

export const addZeroToCorrectDay = (day: number) => {
  if (String(day).length < 2) {
    return `0${day}`;
  }
  return `${day}`;
};

// transform date from this "Thu Jan 26 2017 11:00:00 GMT+1100" to this "26.01.2017"
export const transformDateFormatToRussianFormat = (date: Date) => {
  return `${addZeroToCorrectDay(date.getDate())}.${addZeroToCorrectMonth(
    date.getMonth()
  )}.${date.getFullYear()}`;
};

// Create an array with numbers of weeks and counting kilometers for each day of every week
export const createArrayOfWeeks = () => {
  let currentDate = new Date(),
    thisYear = currentDate.getFullYear(),
    dayStartOrEndWeek = new Date(thisYear, 0, 1),
    currentWeek = getWeekNumber(currentDate),
    firstWeekStart = 8 - dayStartOrEndWeek.getDay(),
    arrayOfWeeks = [];

  dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + firstWeekStart);

  while (currentWeek > 0) {
    arrayOfWeeks.push(transformDateFormatToRussianFormat(dayStartOrEndWeek));
    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 6);
    arrayOfWeeks[
      arrayOfWeeks.length - 1
    ] += ` - ${transformDateFormatToRussianFormat(dayStartOrEndWeek)}`;
    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 1);
    currentWeek--;
  }
  return arrayOfWeeks;
};
