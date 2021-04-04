import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
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
                {content}
            </div>
        </Fade>
    </Modal>
);


export default ModalWindow;
