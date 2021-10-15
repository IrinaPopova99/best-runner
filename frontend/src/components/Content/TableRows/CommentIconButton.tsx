import React from "react";
import CommentIcon from "@material-ui/icons/Comment";
import { IconButton } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

type CommentIconButtonType = {
  handleOpen(comment: string): void;
  comment: string;
};

const CommentIconButton: React.FC<CommentIconButtonType> = ({
  handleOpen,
  comment,
}) => {
  const { t } = useTranslation('common');
return (
  <>
    {comment !== "" ? (
      <IconButton
        edge="end"
        aria-label="comments"
        onClick={() => handleOpen(comment)}
      >
        <CommentIcon />
      </IconButton>
    ) : (
      <p>{t('noComments')}</p>
    )}
  </>
);
    }
export default CommentIconButton;
