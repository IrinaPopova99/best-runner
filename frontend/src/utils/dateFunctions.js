// date

export const isDate = (value) => {
    if (typeof value == "string") {
        let reg = /^[0-9]{2}[.]+[0-9]{2}[.]+[0-9]{4}$/gmi;
        if (value.search(reg) !== -1) {
            return true;
        } else return false;
    }
    else return false;
}

//return the week number
export const getWeek = (date) => {
    let currentDate = new Date(date);
    let thisYear = currentDate.getFullYear();
    let onejan = new Date(thisYear, 0, 1);
    let firstWeek = onejan.getDay() > 4 ? -onejan.getDay() : onejan.getDay();
    return Math.ceil((((currentDate - onejan) / 86400000) + firstWeek) / 7);
}

export function transformDateFromRussian (date) {
    return date.split('.').reverse().join('-');
}

export function transformDateToRussian (date) {
    return date.split('-').reverse().join('.');
}

export function weekDays() {
    return [
        {
            name: 'ПН',
            data: 0
        },
        {
            name: 'ВТ',
            data: 0
        },
        {
            name: 'СР',
            data: 0
        },
        {
            name: 'ЧТ',
            data: 0
        },
        {
            name: 'ПТ',
            data: 0
        },
        {
            name: 'СБ',
            data: 0
        },
        {
            name: 'ВС',
            data: 0
        },

    ];
}

function fixWeekdays(day) {
    if (day === 0) {
        return 6;
    } else return day - 1;

}

// Create an object and counting kilometers for each day of the week
export function dateToWeeks(data) {
    let weeksWithData = {};
    data.forEach(item => {
        let newDate = transformDateFromRussian(item.date);
        let numberWeek = getWeek(newDate);
        if (!weeksWithData[numberWeek]) {
            weeksWithData[numberWeek] = weekDays();
        }
        weeksWithData[numberWeek][fixWeekdays((new Date(newDate)).getDay())].data += +item.kilometrage;
    })
    return weeksWithData;
}

// add '0' to the month number if necessary
export function correctMonth(month) {
    if (String(month + 1).length < 2) {
        return `0${month + 1}`;
    } 
    if (String(month + 1).length === 2) {
        return `${month + 1}`;
    }
}

// add '0' to the day number if necessary
export function correctDay(day) {
    if (String(day).length < 2) {
        return `0${day}`;
    } 
    if (String(day).length >= 2) {
        return `${day}`;
    }
}

// transform date from this "Thu Jan 26 2017 11:00:00 GMT+1100" to this "26.01.2017"
export function transformDateFromDate (date) {
    return `${correctDay(date.getDate())}.${correctMonth(date.getMonth())}.${date.getFullYear()}`;
}

// Create an array with numbers of weeks and counting kilometers for each day of every week
export const createArrayOfWeeks = () => {
    let currentDate = new Date(),
        thisYear = currentDate.getFullYear(),
        dayStartOrEndWeek = new Date(thisYear, 0, 1),
        currentWeek = getWeek(currentDate),
        firstWeekStart = 8 - dayStartOrEndWeek.getDay(),
        arrayOfWeeks = [];

    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + firstWeekStart);

    while (currentWeek > 0) {
        arrayOfWeeks.push(transformDateFromDate(dayStartOrEndWeek))
        dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 6);
        arrayOfWeeks[arrayOfWeeks.length - 1] += ` - ${transformDateFromDate(dayStartOrEndWeek)}`;
        dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 1);
        currentWeek--;
    }
    
    return arrayOfWeeks;
}