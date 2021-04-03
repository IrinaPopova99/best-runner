import React from 'react';
import Buttons from './Buttons/Buttons';
import { useStyles } from './ActionsStyles';

function Actions({ selected, onDelete, onAdd, onEdit }) {
    const classes = useStyles();

    return (
        <div className={classes.action}>
            <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
        </div>
    )
}

export default Actions;
