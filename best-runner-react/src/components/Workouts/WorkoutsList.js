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
import AddForm from '../WorkoutForms/AddForm';
import EditForm from '../WorkoutForms/EditForm';
import { useRef } from 'react';

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
    // const [selectedRow, setSelectedRow] = useState(null);
    const selectedRow = useRef({});
    const [openComment, setOpenComment] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

    const [comment, setComment] = useState('');

    const classes = useStyles();

    const dispatch = useDispatch();

    const workouts = useSelector(state => state.workoutReducer.workouts);
    const error = useSelector(state => state.workoutReducer.error);

    if (error) alert(error);

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

    const handleClick = (event, id, row = null) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (row) selectedRow.current.value = row;
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
        setOpenComment(true);
    };

    const handleClose = () => {
        setOpenComment(false);
        setOpenAddForm(false);
        setOpenEditForm(false);
        selectedRow.current.value = {};
    };

    const onDelete = () => {
        dispatch(deleteWorkoutById(selected));
        setSelected([]);
        selectedRow.current.value = {};
    };

    const onAdd = () => {
        setOpenAddForm(true)
    };

    const onEdit = () => {
        if (selected.length > 1) {
            alert('Можно выбрать только 1 элемент')
        } else {
            setOpenEditForm(true);
            setSelected([]);
        }
    };
    console.log(selectedRow.current.value)
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
            <ModalWindow content={<AddForm handleClose={handleClose} />} open={openAddForm} handleClose={handleClose} />

            <ModalWindow
                content={<EditForm
                    handleClose={handleClose}
                    selectedRow={selectedRow.current.value}
                />}
                open={openEditForm}
                handleClose={handleClose}
            />

        </>
    );
}

export default WorkoutsList;
