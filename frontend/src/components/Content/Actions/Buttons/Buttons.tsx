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
        {t("buttons.add")}
      </MyButton>
      <MyButton action={onDelete} isDisabled={isDisabled} color="secondary">
        {t("buttons.delete")}
      </MyButton>
      <MyButton action={onEdit} isDisabled={isDisabled} color="primary">
        {t("buttons.change")}
      </MyButton>
    </div>
  );
};

export default Buttons;
