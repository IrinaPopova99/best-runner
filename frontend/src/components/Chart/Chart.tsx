import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { NameWeekDaysWithDistancePerDay, WeeksWithData } from "../../shared/types";
import "./Chart.scss";
import { CustomTooltip } from "./CustomTooltip";

type ChartProps = {
  data: NameWeekDaysWithDistancePerDay[];
};

const Chart: React.FC<ChartProps> = ({ data }) => (
  <div className="chart">
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="data" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  </div>
);

export default Chart;
