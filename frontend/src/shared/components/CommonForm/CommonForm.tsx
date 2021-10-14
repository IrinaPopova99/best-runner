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
import { transformDateFormatToRussianDate } from "../../../utils/dateFunctions";

type CommonFormType = {
  handleClose(): void;
  selected?: Workout;
  typeForm: string;
  editOneWorkout: (id: string, data: Workout) => void;
  addNewWorkout: (data: Workout) => void;
}

const CommonForm: React.FC<CommonFormType> = ({
  handleClose,
  selected = {},
  typeForm,
  editOneWorkout,
  addNewWorkout,
}) => {
  const handleSubmit = (values: Workout) => {
    handleClose();
    values.date = transformDateFormatToRussianDate(values.date);
    if (typeForm === "edit" && selected.id) {
      const id = selected.id;
      return editOneWorkout(id, values);
    }
    return addNewWorkout(values);
  };

  const formik = useFormik<Workout>({
    initialValues: {
      date: selected.date || today,
      typeWorkout: !selected.typeWorkout ? "" : selected.typeWorkout,
      kilometrage: !selected.kilometrage ? 0 : selected.kilometrage,
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
          formik.setFieldValue("date", val);
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
        error={formik.touched.typeWorkout && Boolean(formik.errors.typeWorkout)}
        // helperText={
        //   formik.touched.typeWorkout ? formik.errors.typeWorkout : null
        // }
      >
        <MenuItem value={"Бег"}>Бег</MenuItem>
        <MenuItem value={"Ходьба"}>Ходьба</MenuItem>
        <MenuItem value={"Велосипед"}>Велосипед</MenuItem>
        <MenuItem value={"Лыжи"}>Лыжи</MenuItem>
      </Select>
      <TextField
        error={formik.touched.kilometrage && Boolean(formik.errors.kilometrage)}
        helperText={
          formik.touched.kilometrage ? formik.errors.kilometrage : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.kilometrage}
        className="form-container__input"
        id="kilometrage-input"
        label="Дистанция"
        name="kilometrage"
      />
      <TextField
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        id="outlined-multiline-static"
        multiline
        variant="outlined"
        rows={4}
        helperText={formik.touched.comment ? formik.errors.comment : null}
        className="form-container__input"
        label="Комментарий"
        name="comment"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.comment}
      />

      <MyButton color="primary" type="submit">
        Сохранить
      </MyButton>
    </form>
  );
};

export default CommonForm;
