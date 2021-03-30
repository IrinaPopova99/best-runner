import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { editOneWorkout } from '../../redux/workouts/actions';
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

function EditForm({ handleClose, selectedRow }) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        // handleClose()
        if (selectedRow.id) {
            const id = selectedRow.id;
            handleClose();
            return dispatch(editOneWorkout(id, data));
        }
    }

    const dateFix = selectedRow.date ? selectedRow.date.split('.').reverse().join('-') : '2020-03-24';

    return (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                id="date"
                label="Дата"
                type="date"
                defaultValue={dateFix}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                name="date"
                inputRef={register}
            />
            <TextField
                className={classes.textField}
                id="typeWorkout-input"
                label="Тип тренировки"
                name="typeWorkout"
                defaultValue={selectedRow.typeWorkout ? selectedRow.typeWorkout : "dd"}
                inputRef={register(validations(true, 10, true))}
            />
            <TextField
                className={classes.textField}
                id="kilometrage-input"
                label="Дистанция (в метрах)"
                name="kilometrage"
                defaultValue={selectedRow.kilometrage ? selectedRow.kilometrage : "11"}
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
                defaultValue={selectedRow.comment ? selectedRow.comment : ''}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Изменить
            </Button>
            <div>
                <ErrorMessages errors={errors} name='kilometrage' />
            </div>
        </form>
    )

}

export default EditForm;