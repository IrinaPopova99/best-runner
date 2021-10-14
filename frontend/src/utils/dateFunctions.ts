const isValueMatchWithRegExp = (value: string, regExp: RegExp): boolean => {
  if (value.search(regExp) !== -1) {
    return true;
  }
  return false
}

export const isDate = (value: string) => {
  if (typeof value == "string") {
    let dateRussianFormat = /^[0-9]{2}[.]+[0-9]{2}[.]+[0-9]{4}$/gim;
    isValueMatchWithRegExp(value, dateRussianFormat);
  }
  return false;
};

export const getWeekNumber = (date: string) => {
  let currentDate = new Date(date);
  let currentWeekDayNumber = currentDate.getUTCDay() || 7;

  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - currentWeekDayNumber);

  let yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));

  return Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
};

export const transformDateFromRussian = (date: string) => {
  return date.split(".").reverse().join("-");
};

export const transformDateToRussian = (date: string) => {
  return date.split("-").reverse().join(".");
};

export const getNameWeekDaysWithData = () => {
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
};

const fixWeekdays = (day) => {
  if (day === 0) {
    return 6;
  } 
  return day - 1;
};

// Create an object and counting kilometers for each day of the week
export const dateToWeeks = (data) => {
  let weeksWithData = {};
  data.forEach((item) => {
    let newDate = transformDateFromRussian(item.date);
    let numberWeek = getWeekNumber(newDate);
    if (!weeksWithData[numberWeek]) {
      weeksWithData[numberWeek] = getNameWeekDaysWithData();
    }
    weeksWithData[numberWeek][fixWeekdays(new Date(newDate).getDay())].data +=
      +item.kilometrage;
  });
  return weeksWithData;
};

// add '0' to the month number if necessary
export const addZeroToCorrectMonth = (month: number) => {
  if (String(month + 1).length < 2) {
    return `0${month + 1}`;
  }
  return `${month + 1}`;
};

// add '0' to the day number if necessary
export const addZeroToCorrectDay = (day: number) => {
  if (String(day).length < 2) {
    return `0${day}`;
  }
  return `${day}`;
};

// transform date from this "Thu Jan 26 2017 11:00:00 GMT+1100" to this "26.01.2017"
export const transformDateFormatToRussianDate = (date: Date) => {
  return `${addZeroToCorrectDay(date.getDate())}.${addZeroToCorrectMonth(
    date.getMonth()
  )}.${date.getFullYear()}`;
};

// Create an array with numbers of weeks and counting kilometers for each day of every week
export const createArrayOfWeeks = () => {
  let currentDate = new Date(),
    thisYear = currentDate.getFullYear(),
    dayStartOrEndWeek = new Date(thisYear, 0, 1),
    currentWeek = getWeekNumber(
      transformDateFromRussian(transformDateFormatToRussianDate(currentDate))
    ),
    firstWeekStart = 8 - dayStartOrEndWeek.getDay(),
    arrayOfWeeks = [];

  dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + firstWeekStart);

  while (currentWeek > 0) {
    arrayOfWeeks.push(transformDateFormatToRussianDate(dayStartOrEndWeek));
    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 6);
    arrayOfWeeks[
      arrayOfWeeks.length - 1
    ] += ` - ${transformDateFormatToRussianDate(dayStartOrEndWeek)}`;
    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 1);
    currentWeek--;
  }
  return arrayOfWeeks;
};
