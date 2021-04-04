// date and chart
export const getWeek = (date) => {
    let currentDate = new Date(date);
    let thisYear = currentDate.getFullYear();
    let onejan = new Date(thisYear, 0, 1);
    let firstWeek = onejan.getDay() > 4 ? -onejan.getDay() : onejan.getDay();
    return Math.ceil((((currentDate - onejan) / 86400000) + firstWeek) / 7);
}

export const transformDate = (date) => {
    return date.split('.').reverse().join('-');
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

export function dateToWeeks(data) {
    let weeksWithData = {};
    data.forEach(item => {
        let newDate = transformDate(item.date);
        let numberWeek = getWeek(newDate);
        if (!weeksWithData[numberWeek]) {
            weeksWithData[numberWeek] = weekDays();
        }
        weeksWithData[numberWeek][(new Date(newDate)).getDay() - 1].data += +item.kilometrage;
    })
    return weeksWithData;
}

export function correctMonth(month) {
    if (String(month + 1).length < 2) {
        return `0${month + 1}`;
    } 
    if (String(month + 1).length === 2) {
        return `${month + 1}`;
    }
}

export function correctDay(day) {
    if (String(day).length < 10) {
        return `0${day}`;
    } 
    if (String(day).length >= 10) {
        return `${day}`;
    }
}

export const createArrayOfWeeks = () => {
    let currentDate = new Date(),
        thisYear = currentDate.getFullYear(),
        dayStartOrEndWeek = new Date(thisYear, 0, 1),
        currentWeek = getWeek(currentDate),
        firstWeekStart = 8 - dayStartOrEndWeek.getDay(),
        arrayOfWeeks = [];

    dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + firstWeekStart);

    while (currentWeek > 0) {
        arrayOfWeeks.push(`${dayStartOrEndWeek.getDate()}.${correctMonth(dayStartOrEndWeek.getMonth())}.${thisYear}`)
        dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 6);
        arrayOfWeeks[arrayOfWeeks.length - 1] += ` - ${dayStartOrEndWeek.getDate()}.${correctMonth(dayStartOrEndWeek.getMonth())}.${thisYear}`;
        dayStartOrEndWeek.setDate(dayStartOrEndWeek.getDate() + 1);
        currentWeek--;
    }
    
    return arrayOfWeeks;
}