import React from "react";
import { Trans, useTranslation } from "react-i18next";

type CustomTooltipProps = {
  payload: any;
  label: string;
  active: boolean;
  styleClass: string;
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  payload,
  label,
  active,
  styleClass,
}) => {
  const { t } = useTranslation("chart");
  const distance = payload[0].value;

  if (active) {
    return (
      <div className={`custom-tooltip ${styleClass}`}>
        <p>{label}</p>
        <p>
          <Trans t={t} i18nKey="distance">
            {{ distance }} км
          </Trans>
        </p>
      </div>
    );
  }

  return null;
};
