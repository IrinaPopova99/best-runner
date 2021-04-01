import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, Paper, Grid } from '@material-ui/core';
import { getWorkoutsAll, deleteWorkoutById } from '../../redux/workouts/actions';
import Actions from '../Actions/Actions';
import TableRows from './TableRows/TableRows';
import HeaderRow from './HeaderRow/HeaderRow';
import Comment from './Comment';
import ModalWindow from './ModalWindow/ModalWindow';
import CommonForm from '../WorkoutForms/CommonForm';
import Filter from '../Actions/Filter/Filter';
import { Chart } from '../Chart';

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

function descendingComparator(a, b, orderBy) {
    a[orderBy] = isNaN(a[orderBy]) ? a[orderBy] : +(a[orderBy]);
    b[orderBy] = isNaN(b[orderBy]) ? b[orderBy] : +(b[orderBy]);

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function filterData(array, filters) {
    if (filters.length !== 0) {
        let arrayFilter = [];
        arrayFilter = array.filter(item =>
            item.typeWorkout === filters.filter(filter => {
                return filter === item.typeWorkout
            })[0]
        )
        return arrayFilter;
    } else return array;
}

function getWeek(date) {
    let currentDate = new Date(date);
    let thisYear = currentDate.getFullYear();
    let onejan = new Date(thisYear, 0, 1);
    let firstWeek = onejan.getDay() > 4 ? -onejan.getDay() : onejan.getDay();
    return Math.ceil((((currentDate - onejan) / 86400000) + firstWeek) / 7);
}

function transformDate(date) {
    return date.split('.').reverse().join('-');
}

function dateToWeeks(data) {
    let weeksWithData = []
    data.map(item => {
        let newDate = transformDate(item.date);
        let numberWeek = getWeek(newDate);
        if (!weeksWithData[numberWeek]) {
            weeksWithData[numberWeek] = [
                {
                    name: 'ПН',
                    meters: 0
                },
                {
                    name: 'ВТ',
                    meters: 0
                },
                {
                    name: 'СР',
                    meters: 0
                },
                {
                    name: 'ЧТ',
                    meters: 0
                },
                {
                    name: 'ПТ',
                    meters: 0
                },
                {
                    name: 'СБ',
                    meters: 0
                },
                {
                    name: 'ВС',
                    meters: 0
                },

            ]
        }
        weeksWithData[numberWeek][(new Date(newDate)).getDay() - 1].meters += +item.kilometrage;
    })
    return weeksWithData;
}

function WorkoutsList() {
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

    const workouts = useSelector(state => state.workoutReducer.workouts);
    const error = useSelector(state => state.workoutReducer.error);

    if (error) alert(error);

    useEffect(() => {
        dispatch(getWorkoutsAll());
    }, [dispatch]);

    function createData(id, date, typeWorkout, kilometrage, comment) {
        return { id, date, typeWorkout, kilometrage, comment };
    }
    // const dates = workouts.map(workout => workout.date);

    const dataForChart = dateToWeeks(workouts);

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
    console.log(dataForChart)
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
            <Grid item xs={10} justify="center">
                <Chart data={dataForChart} />
            </Grid>
        </Grid>
    );
}

export default WorkoutsList;
