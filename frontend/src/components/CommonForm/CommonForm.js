import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputAdornment, TextField, MenuItem, Select } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { addNewWorkout, editOneWorkout } from '../../redux/workouts/actions';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { useStyles } from './CommonFormStyles';
import MyButton from '../MyButton/MyButton';
import { correctMonth, correctDay } from './../../utilits/functions';

function CommonForm({ handleClose, selected = {}, typeForm }) {
    const classes = useStyles();
    const [typeWorkout, setTypeWorkout] = useState('');
    const [emptyInput, setEmptyInput] = useState(false);

    const handleChange = (event) => {
        setTypeWorkout(event.target.value);
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control, getValues, setError, clearErrors } = useForm();

    const onEmptyInput = (value, nameInput) => {
        if (typeof value === 'number' && value < 1000000) {
            clearErrors(nameInput);
            setEmptyInput(false);
        } else {
            setError(nameInput, {
                type: "empty",
                message: 'Здесь должно быть число (не более 6 знаков)'
            });
            setEmptyInput(true);
        }
    }

    const onSubmit = data => {
        if (typeForm === 'edit' && selected.id) {
            const id = selected.id;
            console.log(id)
            console.log(data)
            handleClose();
            return dispatch(editOneWorkout(id, data));
        }
        if (typeForm === 'add') {
            console.log(data)

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
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.inputBlock}>
                <TextField
                    id="date"
                    error={errors.date}
                    label="Дата"
                    type="date"
                    min={`${today.getFullYear}-01-01`}
                    max={maxDate}
                    defaultValue={dateFix}
                    helperText={<ErrorMessages errors={errors} name='date' />}
                    className={classes.textField}
                    InputProps={{ inputProps: { min: `${today.getFullYear()}-01-01`, max: maxDate } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="date"
                    inputRef={register({
                        required: "Это обязательное поле",
                    })}
                />

            </div>
            <div className={classes.inputBlock}>
                <Controller
                    name="typeWorkout"
                    defaultValue={typeWorkout || selected.typeWorkout || 'Бег'}
                    control={control}
                    as={
                        <Select
                            value={typeWorkout || selected.typeWorkout || ''}
                            labelId="demo-simple-select-label"
                            className={classes.textField}
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
            </div>
            <div className={classes.inputBlock}>
                <TextField
                    error={!emptyInput ? false : true}
                    helperText={<ErrorMessages errors={errors} name='kilometrage' />}
                    onChange={() => onEmptyInput(getValues().kilometrage, 'kilometrage')}
                    onBlur={() => onEmptyInput(getValues().kilometrage, 'kilometrage')}
                    className={classes.textField}
                    id="kilometrage-input"
                    label="Дистанция"
                    InputProps={{
                        endAdornment: <InputAdornment position="start">КМ</InputAdornment>,
                    }}
                    name="kilometrage"
                    defaultValue={selected.kilometrage ? selected.kilometrage : ""}
                    inputRef={register({
                        required: true,
                        valueAsNumber: true,
                        maxLength: { value: 6, message: "Слишком длинная строка" }
                    })}
                />
            </div>
            <div className={classes.inputBlock}>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    rows={4}
                    helperText={<ErrorMessages errors={errors} name='comment' />}
                    className={classes.textField}
                    label="Комментарий"
                    name="comment"
                    inputRef={register({
                        maxLength: { value: 50, message: "Слишком длинная строка" }
                    })}
                    defaultValue={selected.comment ? selected.comment : ''}
                />
            </div>
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
