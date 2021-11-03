import React, { useState, useMemo } from "react";
import { Grid } from "@material-ui/core";
import {
  createObjectOfWeekdaysWithDistancePerDay,
  getNameWeekDaysWithDistancePerDay,
} from "../../utils/date/dateFunctions";
import Chart from "./Chart";
import Select from "react-select";
import { Workout } from "../../shared/types";
import { useTranslation } from "react-i18next";
import { useGetAllWorkoutsQuery } from "../../api/workoutApi";
import { createArrayOfWeeks } from "../../utils/date/createArrayOfWeeks";
import { today } from '../../constants/date';
import { getWeekNumber } from '../../utils/date/common';

const arrayOfWeeks = createArrayOfWeeks();
const arrayOfWeekDays = getNameWeekDaysWithDistancePerDay();
const valuesAndLabels = arrayOfWeeks.map((item, index) => ({
  value: index + 1,
  label: item,
}));
const currentWeek = getWeekNumber(today);

const ChartPage: React.FC = () => {
  const { t } = useTranslation("chart");
  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);

  const {
    isFetching,
    data,
    isLoading,
    error = {},
  } = useGetAllWorkoutsQuery({});
  const workouts = useMemo(
    () => data?.workouts || ([] as Workout[]),
    [data?.workouts]
  );

  const dataForChart = useMemo(
    () => createObjectOfWeekdaysWithDistancePerDay(workouts),
    [workouts]
  );
  const dataInSelectedWeek = useMemo(
    () => dataForChart.find((item) => item.weekNumber === selectedWeek),
    [selectedWeek, dataForChart]
  );

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid container item md={3} xs={8} justifyContent="flex-start">
        <Select
          defaultValue={valuesAndLabels[selectedWeek - 1]}
          options={valuesAndLabels}
          onChange={(event) => setSelectedWeek(event!.value)}
          placeholder={t("chooseWeek")}
        />
      </Grid>
      <Grid container item md={8} xs={12} justifyContent="flex-start">
        <Chart
          data={
            dataInSelectedWeek?.distancesPerDay
              ? dataInSelectedWeek?.distancesPerDay
              : arrayOfWeekDays
          }
        />
      </Grid>
    </Grid>
  );
};

export default ChartPage;
