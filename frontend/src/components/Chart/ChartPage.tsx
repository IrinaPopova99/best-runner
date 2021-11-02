import React, { useState, useMemo } from "react";
import { Grid } from "@material-ui/core";
import {
  createObjectOfWeekdaysWithDistancePerDay,
  createArrayOfWeeks,
  getNameWeekDaysWithDistancePerDay,
} from "../../utils/date/dateFunctions";
import Chart from "./Chart";
import Select from "react-select";
import { Workout } from "../../shared/types";
import { useTranslation } from 'react-i18next';
import { useGetAllWorkoutsQuery } from "../../redux/workouts/workoutApi";

const arrayOfWeeks = createArrayOfWeeks();
const arrayOfWeekDays = getNameWeekDaysWithDistancePerDay();
const valuesAndLabels = arrayOfWeeks.map((item, index) => ({
  value: index + 1,
  label: item,
}));

const ChartPage: React.FC = () => {
  const { t } = useTranslation('chart');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const { isFetching, data, isLoading, error = {} } = useGetAllWorkoutsQuery({});
  const workouts = useMemo(() => (data?.workouts || ([] as Workout[])), [data?.workouts]);


  const dataForChart = useMemo(() => createObjectOfWeekdaysWithDistancePerDay(workouts), [workouts]);

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid container item md={3} xs={8} justifyContent="flex-start">
        <Select
          options={valuesAndLabels}
          onChange={(event) => setSelectedWeek(event!.value)}
          placeholder={t('chooseWeek')}
        />
      </Grid>
      <Grid container item md={8} xs={12} justifyContent="flex-start">
        <Chart
          data={dataForChart[selectedWeek] || []}
          // data={
          //   dataForChart[selectedWeek]
          //     ? dataForChart[selectedWeek]
          //     : arrayOfWeekDays
          // }
        />
      </Grid>
    </Grid>
  );
};

export default ChartPage;
