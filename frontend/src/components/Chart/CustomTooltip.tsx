import React from "react";
import { Trans, useTranslation } from "react-i18next";

// type CustomTooltipProps = {
//   payload: any;
//   label: string;
//   active: boolean;
//   styleClass: string;
// };

export const CustomTooltip: React.FC = ({
  payload,
  label,
  active,
}: any) => {
  const { t } = useTranslation("chart");
  const distance = payload[0]?.value || 0;

  if (active) {
    return (
      <div className={`custom-tooltip chart__label`}>
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
