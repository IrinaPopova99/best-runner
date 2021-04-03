import React from 'react';
import { useSelector } from 'react-redux';
import Buttons from './Buttons/Buttons';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

}));

function Actions({ selected, onDelete, onAdd, onEdit }) {
    const classes = useStyles();

    const isLoading = useSelector(state => state.workoutReducer.isLoading);
    return (
        <div className={classes.action}>
            <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
            <Loading isLoading={isLoading} />
        </div>
    )
}

export default Actions;
