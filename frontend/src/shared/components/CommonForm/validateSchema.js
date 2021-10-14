import * as Yup from "yup";


export const validateSchema = Yup.object().shape({
  date: Yup.date().required("Дата обязательна"),
  typeWorkout: Yup.string().required("Тип обязателен"),
  kilometrage: Yup.string()
    .required("Дистанция обязательна")
    .max(100000, "Максимум 100000")
    .matches(/\d+/gi, "Это не число"),

  comment: Yup.string().max(10, "Максимум 10  символов"),
});
