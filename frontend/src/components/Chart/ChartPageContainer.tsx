import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getWorkoutsAll } from "../../redux/workouts/thunks";
import { RootState, Workout } from "../../shared/types";
import ChartPage from './ChartPage';
import { getWorkouts } from '../../utils/selectors/selectors';

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
    workouts: getWorkouts(state),
  };
};

export default connect(mapStateToProps, { getWorkoutsAll })(ChartPageContainer);