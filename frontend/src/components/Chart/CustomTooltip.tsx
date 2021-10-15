import React from "react";

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
  if (active) {
    return (
      <div className={`custom-tooltip ${styleClass}`}>
        <p>{label}</p>
        <p>{`${payload[0].value} км`}</p>
      </div>
    );
  }

  return null;
};
