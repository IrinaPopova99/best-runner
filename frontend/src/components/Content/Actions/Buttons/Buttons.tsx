import React from "react";
import MyButton from "../../../../shared/components/MyButton/MyButton";
import { ActionsType } from "../Actions";
import { useTranslation } from "react-i18next";

const Buttons: React.FC<ActionsType> = ({
  selected,
  onDelete,
  onAdd,
  onEdit,
}) => {
  const { t } = useTranslation("common");
  const isDisabled = selected.length === 0 ? true : false;

  return (
    <div>
      <MyButton action={onAdd} isDisabled={false}>
        {t("add")}
      </MyButton>
      <MyButton action={onDelete} isDisabled={isDisabled} color="secondary">
        {t("delete")}
      </MyButton>
      <MyButton action={onEdit} isDisabled={isDisabled} color="primary">
        {t("change")}
      </MyButton>
    </div>
  );
};

export default Buttons;
