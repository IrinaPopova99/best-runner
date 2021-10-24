import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Table from "./Table";
import {
  deleteWorkoutById,
  getWorkoutsAll,
} from "../../redux/workouts/thunks";
import { toggleFilters } from "../../redux/filter/actions";
import Filters from "../../shared/components/Filter/Filters";
import { getVisibleWorkouts, getTypesWorkouts } from "../../utils/selectors/selectors";
import { ErrorRequest, Filter, RootState, Workout } from "../../shared/types";

type ContentContainerType = {
  getWorkoutsAll: () => void;
  deleteWorkoutById: (ids: string[]) => void;
  toggleFilters: (filters: Filter[]) => void;
  workouts: Workout[];
  error: ErrorRequest;
  isLoading: boolean;
  typesWorkout: string[];
  selectedFilters: string[];
};

const ContentContainer: React.FC<ContentContainerType> = (props) => {
  useEffect(() => {
    props.getWorkoutsAll();
  }, []);

  const onDelete = (selected: string[]) => {
    props.deleteWorkoutById(selected);
  };
  const onToggleFilters = (selected: Filter[]) => {
    props.toggleFilters(selected);
  };

  return (
    <Grid container spacing={3} justify="space-between" alignItems="flex-start">
      <Grid item md={2} xs={3}>
        <Filters
          onToggleFilters={onToggleFilters}
          labels={props.typesWorkout}
          selectedFilters={props.selectedFilters}
        />
      </Grid>
      <Table
        deleteWorkoutById={onDelete}
        workouts={props.workouts}
        error={props.error}
        isLoading={props.isLoading}
      />
    </Grid>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    workouts: getVisibleWorkouts(state),
    error: state.workoutSlice.error,
    isLoading: state.workoutSlice.isLoading,
    typesWorkout: getTypesWorkouts(state),
    selectedFilters: state.filtersReducer.filters,
  };
};

export default connect(mapStateToProps, {
  getWorkoutsAll,
  deleteWorkoutById,
  toggleFilters,
})(ContentContainer);
