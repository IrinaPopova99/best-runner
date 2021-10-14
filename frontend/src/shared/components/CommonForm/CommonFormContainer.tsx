import React from "react";
import { connect } from "react-redux";
import { addNewWorkout, editOneWorkout } from "../../../redux/workouts/thunks";
import { RootState, Workout } from "../../types";
import CommonForm from "./CommonForm";

type CommonFormContainerType = {
  editOneWorkout: (data: { id: string; workout: Workout }) => void;
  addNewWorkout: (data: Workout) => void;
  handleClose(): void;
  selected?: Workout;
  typeForm: string;
};

const CommonFormContainer: React.FC<CommonFormContainerType> = (props) => {
  const onEdit = (id: string, workout: Workout) => {
    props.editOneWorkout({ id, workout });
  };

  const onAdd = (data: Workout) => {
    props.addNewWorkout(data);
  };

  return (
    <CommonForm
      editOneWorkout={onEdit}
      addNewWorkout={onAdd}
      handleClose={props.handleClose}
      typeForm={props.typeForm}
      selected={props.selected}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, { editOneWorkout, addNewWorkout })(
  CommonFormContainer
);
