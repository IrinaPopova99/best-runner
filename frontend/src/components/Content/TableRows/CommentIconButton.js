import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { IconButton } from '@material-ui/core';

const CommentIconButton = ({ handleOpen, comment }) => (
    <>
        {comment !== ""
            ? <IconButton edge="end" aria-label="comments" onClick={(event) => handleOpen(event, comment)}>
                <CommentIcon />
            </IconButton>
            : <p>Нет</p>
        }
    </>
);

export default CommentIconButton;
