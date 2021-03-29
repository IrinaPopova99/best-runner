import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: 'none',
        padding: '30px',
        outline: 'none',
    },
    title: {
        marginBottom: '15px',
    },
}));

function Comment({comment}) {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <h3 className={classes.title}>Комментарий</h3>
            <p >{comment}</p>
        </div>
    )
}

export default Comment;
