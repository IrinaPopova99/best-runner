import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getWorkoutsAll } from "../../redux/workouts/thunks";
import { RootState, Workout } from "../../shared/types";
import ChartPage from './ChartPage';

type ChartPageContainerType = {
  getWorkoutsAll: () => void;
  workouts: Workout[];
}

const ChartPageContainer: React.FC<ChartPageContainerType> = (props) => {
  useEffect(() => {
    props.getWorkoutsAll();
  }, []);
  return <ChartPage {...props} />;
}
const mapStateToProps = (state: RootState) => {
  return {
    workouts: state.workoutSlice.workouts,
  };
};

export default connect(mapStateToProps, { getWorkoutsAll })(ChartPageContainer);