import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useStyles } from './ChartStyles';
import { CustomTooltip } from './CustomTooltip';

const Chart = ({ data }) => {
    const classes = useStyles();

    return <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="meters" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Tooltip content={<CustomTooltip />} styleClass={classes.label} />
    </LineChart>
};

export default Chart;