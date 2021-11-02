import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { NameWeekDaysWithDistancePerDay, WeeksWithData } from "../../shared/types";
import "./Chart.scss";

type ChartProps = {
  data: WeeksWithData;
};

const Chart: React.FC<ChartProps> = ({ data }) => (
  <div className="chart">
    <LineChart
      width={600}
      height={300}
      data={data.distancesPerDay}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="data" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      {/* <Tooltip content={<CustomTooltip />} styleClass="chart__label" /> */}
    </LineChart>
  </div>
);

export default Chart;
