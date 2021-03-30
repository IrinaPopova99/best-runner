import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function WorkoutRow({ rows, isSelected, handleClick, handleOpen }) {
    return (
        <>
            {rows.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                    <>
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
                            <TableCell align="center">{row.typeWorkout}</TableCell>
                            <TableCell align="center">{row.kilometrage}</TableCell>
                            <TableCell align="center">
                                {row.comment !== ""
                                    ? <IconButton edge="end" aria-label="comments" onClick={() => handleOpen(row.comment)}>
                                        <CommentIcon />
                                    </IconButton>
                                    : <p>Нет</p>
                                }
                            </TableCell>
                        </TableRow>
                    </>
                );
            })}
        </>
    )
}

export default WorkoutRow;
