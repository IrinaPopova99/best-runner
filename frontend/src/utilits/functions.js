export const descendingComparator = (a, b, orderBy) => {
    a[orderBy] = isNaN(a[orderBy]) ? a[orderBy] : +(a[orderBy]);
    b[orderBy] = isNaN(b[orderBy]) ? b[orderBy] : +(b[orderBy]);

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const filterData = (array, filters) => {
    if (filters.length !== 0) {
        let arrayFilter = [];
        arrayFilter = array.filter(item =>
            item.typeWorkout === filters.filter(filter => {
                return filter === item.typeWorkout
            })[0]
        )
        return arrayFilter;
    } else return array;
}

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

    // arrayOfWeeks.push(`01.01.${thisYear} - 0${firstWeekStart}.01.${thisYear}`);
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