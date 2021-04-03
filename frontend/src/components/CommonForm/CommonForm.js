import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, InputAdornment, TextField, Button, MenuItem, Select } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { addNewWorkout, editOneWorkout } from '../../redux/workouts/actions';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
    },
    inputBlock: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
    }
}));

function CommonForm({ handleClose, selectedRow = {}, typeForm }) {
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
        if (typeForm === 'edit' && selectedRow.id) {
            const id = selectedRow.id;
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

    const dateFix = selectedRow.date ? selectedRow.date.split('.').reverse().join('-') : '2020-03-24';

    return (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.inputBlock}>
                <TextField
                    id="date"
                    error={errors.date}
                    label="Дата"
                    type="date"
                    defaultValue={dateFix}
                    helperText={<ErrorMessages errors={errors} name='date' />}
                    className={classes.textField}
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
                    defaultValue={typeWorkout || selectedRow.typeWorkout || 'Бег'}
                    control={control}
                    as={
                        <Select
                            value={typeWorkout || selectedRow.typeWorkout || ''}
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
                    defaultValue={selectedRow.kilometrage ? selectedRow.kilometrage : ""}
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
                    defaultValue={selectedRow.comment ? selectedRow.comment : ''}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Сохранить
            </Button>

        </form>
    )
}

export default CommonForm;
