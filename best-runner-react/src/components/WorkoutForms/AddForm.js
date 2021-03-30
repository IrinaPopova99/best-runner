import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useForm } from "react-hook-form";
import { addNewWorkout } from '../../redux/workouts/actions';
import { validations } from '../../utilities/validations/validations';
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
        marginBottom: theme.spacing(3),
    },
}));

function AddForm({ handleClose }) {
    const classes = useStyles();
    const [typeWorkout, setYypeWorkout] = useState('');

    const handleChange = (event) => {
        setYypeWorkout(event.target.value);
    };

    const dispatch = useDispatch();
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
        // return dispatch(addNewWorkout(data));
    }

    return (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                id="date"
                label="Дата"
                type="date"
                defaultValue="2021-03-24"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                name="date"
                inputRef={register}
            />
            <InputLabel id="demo-simple-select-label">Тип тренировки</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={typeWorkout}
                className={classes.textField}
                id="typeWorkout-input"
                name="typeWorkout"
                onChange={handleChange}
                inputRef={register(validations(true, 10, true))}
            >
                <MenuItem name="typeWorkout" value={'Бег'}>Бег</MenuItem>
                <MenuItem name="typeWorkout" value={'Ходьба'}>Ходьба</MenuItem>
                <MenuItem name="typeWorkout" value={'Велосипед'}>Велосипед</MenuItem>
                <MenuItem name="typeWorkout" value={'Лыжи'}>Лыжи</MenuItem>
            </Select>
            {/* <TextField
                className={classes.textField}
                id="typeWorkout-input"
                label="Тип тренировки"
                name="typeWorkout"
                inputRef={register(validations(true, 10, true))}
            /> */}
            <TextField
                className={classes.textField}
                id="kilometrage-input"
                label="Дистанция (в метрах)"
                name="kilometrage"
                inputRef={register({
                    required: "This is required.",
                    valueAsNumber: true,
                })}
            />
            <TextField
                id="outlined-multiline-static"
                multiline
                variant="outlined"
                rows={4}
                className={classes.textField}
                label="Комментарий"
                name="comment"
                inputRef={register}
                defaultValue=""
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClose}
            >
                Добавить
            </Button>
            <div>
                <ErrorMessages errors={errors} name='kilometrage' />
            </div>
        </form>
    )
}

export default AddForm;
