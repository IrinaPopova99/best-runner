import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableContainer, Paper, Grid } from '@material-ui/core';
import { deleteWorkoutById } from '../../redux/workouts/actions';
import { createData } from '../../utils/createData';
import { filterData } from '../../utils/filterFunctions';
import { stableSort, getComparator } from '../../utils/sortFunctions';
import Actions from './Actions/Actions';
import TableRows from './TableRows/TableRows';
import HeaderRow from './HeaderRow/HeaderRow';
import Filter from '../Common/Filter/Filter';
import Loading from '../Common/Loading/Loading';
import ModalWindows from './ModalWindows/ModalWindows';
import AlertCustom from '../Common/AlertError/AlertError';
import './Content.scss';

const Content = ({ workouts }) => {
    const [selected, setSelected] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [openComment, setOpenComment] = useState(false);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [comment, setComment] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [errorState, setErrorState] = useState(null);

    const selectedRow = useRef({});

    const dispatch = useDispatch();

    const rows = filterData(workouts, selectedFilters).map(workout => (createData(workout.id, workout.date, workout.typeWorkout, workout.kilometrage, workout.comment)));

    const isLoading = useSelector(state => state.workoutReducer.isLoading);
    let error = useSelector(state => state.workoutReducer.error);

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

    const handleOpenComment = (event, comment) => {
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
             setErrorState('Можно выбрать только 1 элемент');
        } else {
            setErrorState(null);
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
                <Grid item md={12} xs={12}>
                    <AlertCustom error={error || errorState} />
                    <Loading isLoading={isLoading} />
                </Grid>
                <TableContainer component={Paper}>
                    <Table className="table" aria-label="simple table">
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
                <ModalWindows
                    handleClose={handleClose}
                    selected={selectedRow.current.value}
                    text={comment}
                    open={openComment}
                    openAddForm={openAddForm}
                    openEditForm={openEditForm}
                    openComment={openComment}
                />
            </Grid>
        </Grid>
    );
}

export default Content;
