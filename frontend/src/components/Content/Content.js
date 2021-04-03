import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, Paper, Grid } from '@material-ui/core';
import { deleteWorkoutById } from '../../redux/workouts/actions';
import Actions from '../Actions/Actions';
import TableRows from './TableRows/TableRows';
import HeaderRow from './HeaderRow/HeaderRow';
import Comment from './Comment';
import ModalWindow from './ModalWindow/ModalWindow';
import CommonForm from '../CommonForm/CommonForm';
import Filter from '../Filter/Filter';
import { filterData, stableSort, getComparator } from '../../utilits/functions';

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

function WorkoutsList({ workouts }) {
    const [selected, setSelected] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [openComment, setOpenComment] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [comment, setComment] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');

    const selectedRow = useRef({});

    const classes = useStyles();

    const dispatch = useDispatch();

    function createData(id, date, typeWorkout, kilometrage, comment) {
        return { id, date, typeWorkout, kilometrage, comment };
    }

    const rows = filterData(workouts, selectedFilters).map(workout => (createData(workout.id, workout.date, workout.typeWorkout, workout.kilometrage, workout.comment)));

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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const typeWorkouts = workouts.map(workout => workout.typeWorkout)

    return (
        <Grid container spacing={3} justify="space-between" alignItems="flex-start">
            <Grid item md={2} xs={3}>
                <Filter
                    labels={typeWorkouts}
                    selected={selectedFilters}
                    setSelected={setSelectedFilters}
                />
            </Grid>
            <Grid item md={10} xs={12}>
                <Actions selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <HeaderRow
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableRows
                            rows={stableSort(rows, getComparator(order, orderBy))}
                            isSelected={isSelected}
                            handleClick={handleClick}
                            handleOpen={handleOpenComment}
                        />
                    </Table>
                </TableContainer>
                <ModalWindow
                    content={<Comment comment={comment} />}
                    open={openComment}
                    handleClose={handleClose}
                />
                <ModalWindow
                    content={<CommonForm handleClose={handleClose}
                        selectedRow={selectedRow.current.value}
                        typeForm="edit" />}
                    open={openEditForm}
                    handleClose={handleClose}
                />
                <ModalWindow
                    content={<CommonForm handleClose={handleClose} typeForm="add" />}
                    open={openAddForm}
                    handleClose={handleClose}
                />
            </Grid>
        </Grid>
    );
}

export default WorkoutsList;
