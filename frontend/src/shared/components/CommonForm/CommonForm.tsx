import React from "react";
import { TextField, MenuItem, Select } from "@material-ui/core";
import "../ErrorMessages/ErrorMessages.scss";
import MyButton from "../MyButton/MyButton";
import "./CommonForm.scss";
import { useFormik } from "formik";
import { validateSchema } from "./validateSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Workout } from "../../types";
import { today } from '../../../constants/date';
import { typesWorkout } from "../../../constants";
import { useTranslation } from "react-i18next";
import { useCreateWorkoutMutation, useUpdateWorkoutMutation } from "../../../api/workoutApi";

type CommonFormType = {
  handleClose(): void;
  selected?: Workout;
  typeForm: string;
}

const CommonForm: React.FC<CommonFormType> = ({
  handleClose,
  selected = {},
  typeForm,
}) => {
  const { t } = useTranslation(['common', 'workout']);
  const [createWorkout] = useCreateWorkoutMutation();
  const [updateWorkouts] = useUpdateWorkoutMutation();

  const handleSubmit = (values: Workout) => {
    handleClose();
    if (typeForm === "edit" && selected.id) {
      return updateWorkouts({ id: selected.id, workout: values });
    }
    return createWorkout(values);
  };

  const formik = useFormik<Workout>({
    initialValues: {
      date: selected.date || today,
      typeWorkout: !selected.typeWorkout ? "" : selected.typeWorkout,
      distance: !selected.distance ? 0 : selected.distance,
      comment: !selected.comment ? "" : selected.comment,
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DatePicker
        name="date"
        dateFormat="dd.MM.yyyy"
        selected={new Date(formik.values.date)}
        onChange={val => {
          formik.setFieldValue("date", `${val}`);
        }}
      />
      <Select
        labelId="demo-simple-select-label"
        className="form-container__input"
        id="typeWorkout"
        name="typeWorkout"
        defaultValue={formik.values.typeWorkout}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.typeWorkout}
        error={formik.touched.typeWorkout && !!formik.errors.typeWorkout}
      >
        {typesWorkout.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
      <TextField
        error={formik.touched.distance && !!formik.errors.distance}
        helperText={
          formik.touched.distance ? formik.errors.distance : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.distance}
        className="form-container__input"
        id="distance-input"
        label={t('workout:distance')}
        name="distance"
      />
      <TextField
        error={formik.touched.comment && !!formik.errors.comment}
        id="outlined-multiline-static"
        multiline
        variant="outlined"
        rows={4}
        helperText={formik.touched.comment ? formik.errors.comment : null}
        className="form-container__input"
        label={t('workout:comment')}
        name="comment"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.comment}
      />

      <MyButton color="primary" type="submit">
        {t('buttons.save')}
      </MyButton>
    </form>
  );
};

export default CommonForm;
