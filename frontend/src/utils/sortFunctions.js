import { transformDateFromDate, transformDateFromRussian, isDate } from "./dateFunctions";

//sort

function descendingComparator(a, b, orderBy) {
    let isDateValue = isDate(a[orderBy]);

    if (isDateValue) {
        a[orderBy] = new Date(transformDateFromRussian(a[orderBy]));
        b[orderBy] = new Date(transformDateFromRussian(b[orderBy]));
    } else {
        a[orderBy] = isNaN(a[orderBy]) ? a[orderBy] : +(a[orderBy]);
        b[orderBy] = isNaN(b[orderBy]) ? b[orderBy] : +(b[orderBy]);
    }
    
    if (b[orderBy] < a[orderBy]) {
        if (isDateValue) {
            a[orderBy] = transformDateFromDate(a[orderBy]);
            b[orderBy] = transformDateFromDate(b[orderBy]);
        }
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        if (isDateValue) {
            a[orderBy] = transformDateFromDate(a[orderBy]);
            b[orderBy] = transformDateFromDate(b[orderBy]);
        }
        return 1;
    }
    if (isDateValue) {
        a[orderBy] = transformDateFromDate(a[orderBy]);
        b[orderBy] = transformDateFromDate(b[orderBy]);
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}