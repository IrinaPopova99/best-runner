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

const arrayOfWeeks = createArrayOfWeeks();
const arrayOfWeekDays = getNameWeekDaysWithDistancePerDay();
const data = arrayOfWeeks.map((item, index) => ({
  value: index + 1,
  label: item,
}));

const ChartPage: React.FC<{ workouts: Workout[] }> = ({ workouts }) => {
  const { t } = useTranslation('chart');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const dataForChart = useMemo(() => createObjectOfWeekdaysWithDistancePerDay(workouts), [workouts]);
  console.log(dataForChart);

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container item md={3} xs={8} justify="flex-start">
        <Select
          options={data}
          onChange={(event) => setSelectedWeek(event!.value)}
          placeholder={t('chooseWeek')}
        />
      </Grid>
      <Grid container item md={8} xs={12} justify="flex-start">
        {/* <Chart
          data={
            dataForChart[selectedWeek]
              ? dataForChart[selectedWeek]
              : arrayOfWeekDays
          }
        /> */}
      </Grid>
    </Grid>
  );
};

export default ChartPage;
