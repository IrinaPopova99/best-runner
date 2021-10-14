import React from 'react';
import { TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import './HeaderRow.scss';
import { OrderType } from '../Content';
import { Workout } from '../../../shared/types';

export type HeaderCellsType = {id: string; label: string}

const headCells: HeaderCellsType[] = [
    { id: 'date', label: 'Дата' },
    { id: 'kilometrage', label: 'Дистанция' },
];

type HeaderRowType = {
    order: OrderType;
    orderBy: keyof Workout;
    onRequestSort(property: string): void;
}

const HeaderRow: React.FC<HeaderRowType> = ({
    order,
    orderBy,
    onRequestSort
}) => {
    const createSortHandler = (property: string) => {
        onRequestSort(property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center">Выбрать</TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                        align="center"
                        className="sort-cell"
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => createSortHandler(headCell.id)}
                            className="sort-cell__arrow"
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className="visually-hidden">
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
