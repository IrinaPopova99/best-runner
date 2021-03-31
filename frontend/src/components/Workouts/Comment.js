import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '15px',
    },
    text: {
        maxWidth: 400,
    }
}));

function Comment({ comment }) {
    const classes = useStyles();

    return (
        <>
            <h3 className={classes.title}>Комментарий</h3>
            <p className={classes.text}>{comment}</p>
        </>
    )
}

export default Comment;
