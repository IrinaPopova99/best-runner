import React from 'react';
import { Checkbox, IconButton, TableCell, TableRow, TableBody } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

const TableRows = ({ rows, isSelected, handleClick, handleOpen }) => (
    <>
        {rows.map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
                <TableBody>
                    <TableRow key={row.id}>
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
                            {row.comment !== ""
                                ? <IconButton edge="end" aria-label="comments" onClick={(event) => handleOpen(event, row.comment)}>
                                    <CommentIcon />
                                </IconButton>
                                : <p>Нет</p>
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        })}
    </>
);

export default TableRows;
