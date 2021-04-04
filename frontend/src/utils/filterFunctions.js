//filter
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