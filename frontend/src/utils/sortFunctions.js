import { transformDateFormatToRussianDate, transformDateFromRussian, isDate } from "./dateFunctions";

//sort

const descendingComparator = (a, b, orderBy) => {
    let isDateValue = isDate(a[orderBy]);
    let firstValue = a[orderBy],
        secondValue = b[orderBy];
    if (isDateValue) {
        firstValue = new Date(transformDateFromRussian(firstValue));
        secondValue = new Date(transformDateFromRussian(secondValue));
    } else {
        firstValue = isNaN(firstValue) ? firstValue : +(firstValue);
        secondValue = isNaN(secondValue) ? secondValue : +(secondValue);
    }
    
    if (secondValue < firstValue) {
        if (isDateValue) {
            firstValue = transformDateFormatToRussianDate(firstValue);
            secondValue = transformDateFormatToRussianDate(secondValue);
        }
        return -1;
    }
    if (secondValue > firstValue) {
        if (isDateValue) {
            firstValue = transformDateFormatToRussianDate(firstValue);
            secondValue = transformDateFormatToRussianDate(secondValue);
        }
        return 1;
    }
    if (isDateValue) {
        firstValue = transformDateFormatToRussianDate(firstValue);
        secondValue = transformDateFormatToRussianDate(secondValue);
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