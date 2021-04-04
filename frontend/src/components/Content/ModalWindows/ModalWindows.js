import React from 'react';
import Comment from './../Comment/Comment';
import ModalWindow from './../../Common/ModalWindow/ModalWindow';
import CommonForm from './../../Common/CommonForm/CommonForm';

const ModalWindows = ({ handleClose, selected, text, openComment, openEditForm, openAddForm }) => (
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
);


export default ModalWindows;
