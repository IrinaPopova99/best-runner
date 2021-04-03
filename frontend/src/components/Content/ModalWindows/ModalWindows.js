import React from 'react';
import Comment from './../Comment/Comment';
import ModalWindow from './ModalWindow/ModalWindow';
import CommonForm from './../../CommonForm/CommonForm';

function ModalWindows({ handleClose, selected, text, openComment, openEditForm, openAddForm }) {
    return (
        <div>
            <ModalWindow
                content={<Comment comment={text} />}
                open={openComment}
                handleClose={handleClose}
            />
            <ModalWindow
                content={<CommonForm handleClose={handleClose}
                    selected={selected}
                    typeForm="edit" />}
                open={openEditForm}
                handleClose={handleClose}
            />
            <ModalWindow
                content={<CommonForm handleClose={handleClose} typeForm="add" />}
                open={openAddForm}
                handleClose={handleClose}
            />

        </div>
    )
}

export default ModalWindows;
