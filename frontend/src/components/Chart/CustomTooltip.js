import React from 'react';

export const CustomTooltip = ({ payload, label, active, styleClass }) => {
    if (active) {
        return (
            <div className={`custom-tooltip ${styleClass}`}>
                <p className="label">{`${payload[0].payload.name}`}</p>
                <p className="label">{`${payload[0].value} км`}</p>
            </div>
        );
    }

    return null;
};