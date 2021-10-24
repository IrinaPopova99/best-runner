import { SortOrder, Workout } from "../../shared/types";

const descendingComparator = (
  a: Workout,
  b: Workout,
  orderBy: keyof Workout
) => {
  let firstValue = a[orderBy] as string | number | Date,
    secondValue = b[orderBy] as string | number | Date;

  firstValue = isNaN(+firstValue) ? firstValue : +firstValue;
  secondValue = isNaN(+secondValue) ? secondValue : +secondValue;

  if (secondValue < firstValue) {
    return -1;
  }
  if (secondValue > firstValue) {
    return 1;
  }
  return 0;
};

const getComparator = (order: SortOrder, orderBy: keyof Workout) => {
  return order === "desc"
    ? (a: Workout, b: Workout) => descendingComparator(a, b, orderBy)
    : (a: Workout, b: Workout) => -descendingComparator(a, b, orderBy);
};

const isValuesEqual = (order: number) => order !== 0;

const sortWorkouts = (
  a: (Workout | number)[],
  b: (Workout | number)[],
  comparator: (a: Workout, b: Workout) => number
) => {
  const resultOfComparing = comparator(a[0] as Workout, b[0] as Workout);

  if (isValuesEqual(resultOfComparing)) return resultOfComparing;

  return (a[1] as number) - (b[1] as number);
};

export const getSortedWorkouts = (
  array: Workout[],
  order: SortOrder,
  orderBy: keyof Workout
): Workout[] => {
  const arrWorkoutAndIndex = array.map((el, index) => [el, index]);

  const comparator = getComparator(order, orderBy);

  arrWorkoutAndIndex.sort((a: (Workout | number)[], b: (Workout | number)[]) =>
    sortWorkouts(a, b, comparator)
  );
  const sortedWorkouts = arrWorkoutAndIndex.map((el) => el[0]) as Workout[];
  return sortedWorkouts;
};
