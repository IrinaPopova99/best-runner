import React from "react";
import Comment from "../Comment/Comment";
import CommonForm from "../../../shared/components/CommonForm/CommonForm";
import Modal from "react-modal";
import { IconButton } from "@material-ui/core";
import "./ModalWindow.scss";
import CloseIcon from "@material-ui/icons/Close";
import { Workout } from "../../../shared/types";
import { useTranslation } from 'react-i18next';

type ModalWindowsProps = {
  handleClose(): void;
  selected: Workout;
  text: string;
  open: boolean;
  type: string;
};

const ModalWindows: React.FC<ModalWindowsProps> = ({
  handleClose,
  selected,
  text,
  open,
  type,
}) => {
  const { t } = useTranslation('workout');
  Modal.setAppElement("#root");
  let content = null;

  switch (type) {
    case "comment":
      content = <Comment comment={text} />;
      break;
    case "add":
      content = (
        <CommonForm handleClose={handleClose} typeForm="add" />
      );
      break;
    case "edit":
      content = (
        <CommonForm
          handleClose={handleClose}
          selected={selected}
          typeForm="edit"
        />
      );
      break;
    default:
      break;
  }
  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel={t('comment')}
      portalClassName={"modal-window"}
      style={{ content: { background: "none", border: "none" } }}
    >
      <div className="fade-content">
        <div>
          <IconButton
            className="fade-content__close"
            edge="end"
            aria-label="comments"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          {content}
        </div>
      </div>
    </Modal>
  );
};

export default ModalWindows;
