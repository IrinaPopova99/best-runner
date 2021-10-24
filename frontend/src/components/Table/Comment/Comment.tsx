import React from "react";
import "./Comment.scss";
import { useTranslation } from "react-i18next";

type CommentType = {
  comment: string;
};

const Comment: React.FC<CommentType> = ({ comment }) => {
  const { t } = useTranslation("workout");
  return (
    <div className="comment">
      <h3 className="comment__title">{t("comment")}</h3>
      <p className="comment__text">{comment}</p>
    </div>
  );
};

export default Comment;
