import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { IconButton } from '@material-ui/core';

type CommentIconButtonType = {
    handleOpen(comment: string): void ;
    comment: string;
}

const CommentIconButton: React.FC<CommentIconButtonType> = ({ handleOpen, comment }) => (
    <>
        {comment !== ""
            ? <IconButton edge="end" aria-label="comments" onClick={() => handleOpen(comment)}>
                <CommentIcon />
            </IconButton>
            : <p>Нет</p>
        }
    </>
);

export default CommentIconButton;
