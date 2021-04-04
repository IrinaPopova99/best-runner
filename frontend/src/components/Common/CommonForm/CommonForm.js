import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { InputAdornment, TextField, MenuItem, Select } from '@material-ui/core';
import { addNewWorkout, editOneWorkout } from '../../../redux/workouts/actions';
import { correctMonth, correctDay } from '../../../utils/dateFunctions';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import MyButton from '../MyButton/MyButton';
import './CommonForm.scss';

const CommonForm = ({ handleClose, selected = {}, typeForm }) => {
    const [typeWorkout, setTypeWorkout] = useState('');

    const handleChange = (event) => {
        setTypeWorkout(event.target.value);
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control, setError, clearErrors } = useForm();

    const onEmptyInput = (e) => {
        if (isFinite(e.target.value) === true && e.target.value < 1000000 && e.target.value !== '') {
            clearErrors(e.target.name);
        } else {
            setError(e.target.name, {
                type: "empty",
                message: 'Здесь должно быть число (не более 6 знаков)'
            });
        }
    }

    const onSubmit = data => {
        if (typeForm === 'edit' && selected.id) {
            const id = selected.id;
            handleClose();
            return dispatch(editOneWorkout(id, data));
        }
        if (typeForm === 'add') {
            handleClose();
            return dispatch(addNewWorkout(data));
        }
    }
    
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${correctMonth(today.getMonth())}-${correctDay(today.getDate())}`;
    const dateFix = selected.date
        ? selected.date.split('.').reverse().join('-')
        : maxDate;

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                id="date"
                error={Boolean(errors.date)}
                label="Дата"
                type="date"
                min={`${today.getFullYear}-01-01`}
                max={maxDate}
                defaultValue={dateFix}
                helperText={<ErrorMessages errors={errors} name='date' />}
                className="form-container__input"
                InputProps={{ inputProps: { min: `${today.getFullYear()}-01-01`, max: maxDate } }}
                InputLabelProps={{
                    shrink: true,
                }}
                name="date"
                inputRef={register({
                    required: "Это обязательное поле",
                })}
            />
            <Controller
                name="typeWorkout"
                defaultValue={typeWorkout || selected.typeWorkout || 'Бег'}
                control={control}
                as={
                    <Select
                        value={typeWorkout || selected.typeWorkout || ''}
                        labelId="demo-simple-select-label"
                        className="form-container__input"
                        onChange={handleChange}
                        inputProps={{
                            inputRef: (ref) => {
                                if (!ref) return;
                                register({
                                    name: "typeWorkout",
                                    value: ref.value,
                                });
                            },
                        }}

                    >
                        <MenuItem value={'Бег'}>Бег</MenuItem>
                        <MenuItem value={'Ходьба'}>Ходьба</MenuItem>
                        <MenuItem value={'Велосипед'}>Велосипед</MenuItem>
                        <MenuItem value={'Лыжи'}>Лыжи</MenuItem>
                    </Select>
                }
            />
            <Controller
                defaultValue={selected.kilometrage ? selected.kilometrage : ""}
                control={control}
                name="kilometrage"
                rules={{
                    required: { value: true, message: "Это обязательное поле" },
                    valueAsNumber: { value: true, message: "Здесь должно быть число" },
                    maxLength: { value: 6, message: "Слишком длинная строка" }
                }}
                onChange={(e) => onEmptyInput(e)}
                onBlur={(e) => onEmptyInput(e)}
                render={() => (
                    <TextField
                        error={Boolean(errors.kilometrage)}
                        helperText={<ErrorMessages errors={errors} name='kilometrage' />}
                        onChange={(e) => onEmptyInput(e)}
                        onBlur={(e) => onEmptyInput(e)}
                        className="form-container__input"
                        id="kilometrage-input"
                        label="Дистанция"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">КМ</InputAdornment>,
                        }}
                        inputRef={register}
                        name="kilometrage"
                        defaultValue={selected.kilometrage ? selected.kilometrage : ""}
                    />
                )}
            />

            <TextField
                id="outlined-multiline-static"
                multiline
                variant="outlined"
                rows={4}
                helperText={<ErrorMessages errors={errors} name='comment' />}
                className="form-container__input"
                label="Комментарий"
                name="comment"
                inputRef={register({
                    maxLength: { value: 50, message: "Слишком длинная строка" }
                })}
                defaultValue={selected.comment ? selected.comment : ''}
            />
            <MyButton
                color="primary"
                type="submit"
            >
                Сохранить
            </MyButton>

        </form>
    )
}

export default CommonForm;
