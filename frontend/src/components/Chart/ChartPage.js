import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import SelectInput from '../Select/SelectInput';
import Chart from './Chart';
import { dateToWeeks, getWeek, createArrayOfWeeks, weekDays } from '../../utilits/functions';

function ChartPage({ workouts }) {
    const [selectedWeek, setSelectedWeek] = useState(getWeek(Date()));
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
            <Grid container item xs={8} justify="flex-start">
                <Chart
                    data={dataForChart[selectedWeek] ? dataForChart[selectedWeek] : arrayOfWeekDays}
                    numberWeek={selectedWeek}
                />
            </Grid>
        </Grid>
    )
}

export default ChartPage;
