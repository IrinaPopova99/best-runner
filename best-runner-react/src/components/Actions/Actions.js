import React from 'react';
import Buttons from './Buttons/Buttons';
import Sort from './Sort/Sort';
import Filter from './Filter/Filter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
}));

function Actions({selected, onDelete, onAdd, onEdit}) {
    const classes = useStyles();

    return (
        <div className={classes.action}>
                <div>
                    <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
                </div>
                <div className={classes.action}>
                    <Sort styleClass={classes.action} />
                    <Filter styleClass={classes.action} />
                </div>
            </div>
    )
}

export default Actions;
