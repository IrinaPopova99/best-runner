import React from 'react';

export const CustomTooltip = ({ payload, label, active, styleClass }) => {
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
