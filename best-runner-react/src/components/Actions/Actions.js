import React from 'react';
import Buttons from './Buttons/Buttons';
import Sort from './Sort/Sort';
import Filter from './Filter/Filter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
}));

function Actions({selected, onDelete, onAdd, onEdit}) {
    const classes = useStyles();

    return (
        <div className={classes.actions}>
                <div>
                    <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
                </div>
                <div>
                    <Sort />
                    <Filter />
                </div>
            </div>
    )
}

export default Actions;
