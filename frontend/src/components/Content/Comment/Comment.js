import React from 'react';
import './Comment.scss';

const Comment = ({ comment }) => (
    <div className="comment">
        <h3 className="comment__title">Комментарий</h3>
        <p className="comment__text">{comment}</p>
    </div>
)


export default Comment;
