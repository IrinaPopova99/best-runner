import React from 'react';
import './Comment.scss';

type CommentType = {
    comment: string;
}

const Comment: React.FC<CommentType> = ({ comment }) => (
    <div className="comment">
        <h3 className="comment__title">Комментарий</h3>
        <p className="comment__text">{comment}</p>
    </div>
)


export default Comment;
