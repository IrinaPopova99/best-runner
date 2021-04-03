import React from 'react';
import { useStyles } from './CommentStyles';

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
