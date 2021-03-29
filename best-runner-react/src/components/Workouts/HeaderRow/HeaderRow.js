import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function HeaderRow() {
    return (
        <TableRow>
            <TableCell align="center">Выбрать</TableCell>
            <TableCell align="center">Дата</TableCell>
            <TableCell align="center">Тип тренировки</TableCell>
            <TableCell align="center">Дистанция&nbsp;(м)</TableCell>
            <TableCell align="center">Комментарий</TableCell>
        </TableRow>
    )
}

export default HeaderRow;
