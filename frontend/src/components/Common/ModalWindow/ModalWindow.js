import React from 'react';
import { Modal, Backdrop, Fade, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './ModalWindow.scss';

const ModalWindow = ({ content, open, handleClose }) => (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={open}>
            <div className="fade-content">
                <IconButton className="fade-content__close" edge="end" aria-label="comments" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                {content}
            </div>
        </Fade>
    </Modal>
);


export default ModalWindow;
