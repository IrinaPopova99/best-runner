import {
  NameWeekDaysWithDistancePerDay,
  WeeksWithData,
  Workout,
} from "../../shared/types";
import { getWeekNumber } from "./common";

// Create an object and counting kilometers for each day of the week
export const createObjectOfWeekdaysWithDistancePerDay = (
  data: Workout[]
): WeeksWithData[] => {
  const weeksWithData: WeeksWithData[] = [];
  data.forEach((item) => {
    const numberWeek = getWeekNumber(new Date(item.date));

    if (
      !weeksWithData.some((item) => Object.values(item).includes(numberWeek))
    ) {
      weeksWithData.push({
        weekNumber: numberWeek,
        distancesPerDay: getNameWeekDaysWithDistancePerDay(),
      });
    }

    weeksWithData.forEach((week) => {
      if (week.weekNumber === numberWeek) {
        week.distancesPerDay[
          fixWeekdays(new Date(item.date).getDay())
        ].data += +item.distance;
      }
    });
  });

  return weeksWithData;
};

// Distance must be written in the "data" field for use in Chart (from the library).
// Otherwise, Chart doesn't show data
export function getNameWeekDaysWithDistancePerDay(): NameWeekDaysWithDistancePerDay[] {
  return [
    {
      name: "ПН",
      data: 0,
    },
    {
      name: "ВТ",
      data: 0,
    },
    {
      name: "СР",
      data: 0,
    },
    {
      name: "ЧТ",
      data: 0,
    },
    {
      name: "ПТ",
      data: 0,
    },
    {
      name: "СБ",
      data: 0,
    },
    {
      name: "ВС",
      data: 0,
    },
  ];
}

function fixWeekdays(day: number) {
  if (day === 0) {
    return 6;
  }
  return day - 1;
}
