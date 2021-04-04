import React from 'react';
import { Checkbox, TableCell, TableRow, TableBody } from '@material-ui/core';
import CommentIconButton from './CommentIconButton';

const TableRows = ({ rows, isSelected, handleClick, handleOpen }) => (
    <>
        {rows.map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
                <TableBody key={row.id}>
                    <TableRow >
                        <TableCell padding="checkbox" align="center">
                            <Checkbox
                                onClick={(event) => handleClick(event, row.id, row)}
                                selected={isItemSelected}
                                checked={isItemSelected}
                            />
                        </TableCell>
                        <TableCell align="center">
                            {row.date}
                        </TableCell>
                        <TableCell align="center">{row.kilometrage}</TableCell>
                        <TableCell align="center">{row.typeWorkout}</TableCell>
                        <TableCell align="center">
                            <CommentIconButton handleOpen={handleOpen} comment={row.comment} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        })}
    </>
);

export default TableRows;
