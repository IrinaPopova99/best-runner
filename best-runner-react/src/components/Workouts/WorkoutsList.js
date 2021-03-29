import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutsAll, deleteWorkoutById } from '../../redux/workouts/actions';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Actions from '../Actions/Actions';
import WorkoutRow from './WorkoutRow/WorkoutRow';
import HeaderRow from './HeaderRow/HeaderRow';
import Comment from './Comment';
import ModalWindow from './ModalWindow/ModalWindow';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function WorkoutsList() {
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [comment, setComment] = useState('');

    const classes = useStyles();
    
    const dispatch = useDispatch();

    const workouts = useSelector(state => state.workoutReducer.workouts);

    useEffect(() => {
        dispatch(getWorkoutsAll());
    }, [dispatch]);

    function createData(id, date, typeWorkout, kilometrage, comment) {
        return { id, date, typeWorkout, kilometrage, comment };
    }

    const rows = workouts.map(workout => (createData(workout.id, workout.date, workout.typeWorkout, workout.kilometrage, workout.comment)));

    // const onSelected = (id) => {
    //     setSelected(id)
    //     console.log(id)
    // }
    const isSelected = (id) => {
        return selected.indexOf(id) !== -1;
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleOpenComment = (comment) => {
        setComment(comment);
        setOpen(true);
        setOpenComment(true);
    };

    const handleClose = () => {
        setOpenComment(false);
        setOpen(false);    
    };

    const onDelete = () => {
        dispatch(deleteWorkoutById(selected));
        setSelected([]);
    };

    const onAdd = () => {
        setOpen(true);
    };

    const onEdit = () => {
        if (selected.length > 1) {
            alert('Можно выбрать только 1 элемент')
        } else {
            setSelected([]);
        }
    };

    return (
        <>
            <Actions selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <HeaderRow />
                    </TableHead>
                    <TableBody>
                        <WorkoutRow rows={rows} isSelected={isSelected} handleClick={handleClick} handleOpen={handleOpenComment} />
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalWindow content={<Comment comment={comment} />} open={openComment} handleClose={handleClose} />
        </>
    );
}

export default WorkoutsList;
