import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { dateToWeeks, getWeek, createArrayOfWeeks, weekDays, transformDateFromDate, transformDateFromRussian } from '../../utils/dateFunctions';
import SelectInput from '../Common/Select/SelectInput';
import Chart from './Chart';

const ChartPage = ({ workouts }) => {
    const currentDate = transformDateFromRussian( transformDateFromDate(new Date()));
    const [selectedWeek, setSelectedWeek] = useState(getWeek(currentDate));
    const dataForChart = dateToWeeks(workouts);

    const arrayOfWeeks = createArrayOfWeeks();
    const arrayOfWeekDays = weekDays();

    return (
        <Grid container spacing={3} justify="center" alignItems="center">
            <Grid container item md={3} xs={8} justify="flex-end">
                <SelectInput
                    selected={selectedWeek}
                    setSelected={setSelectedWeek}
                    labelText='Выберите неделю:'
                    data={arrayOfWeeks}
                />
            </Grid>
            <Grid container item md={8} xs={12} justify="flex-start">
                <Chart
                    data={dataForChart[selectedWeek] ? dataForChart[selectedWeek] : arrayOfWeekDays}
                    numberWeek={selectedWeek}
                />
            </Grid>
        </Grid>
    )
}

export default ChartPage;
