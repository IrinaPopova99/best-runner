import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useStyles } from './HeaderRowStyles';

function HeaderRow({
    numSelected,
    order,
    orderBy,
    onRequestSort,
    rowCount,
}) {
    const classes = useStyles();

    const headCells = [
        { id: 'date', label: 'Дата' },
        { id: 'kilometrage', label: 'Дистанция' },
    ];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">Выбрать</TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        align="center"
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className={classes.arrow}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))
                }
                <TableCell align="center">Тип тренировки</TableCell>
                <TableCell align="center">Комментарий</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default HeaderRow;
