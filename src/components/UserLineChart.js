import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const UserLineChart = ({ data, active, setChartActive }) => {
  if (active === "User Activity") {
    setChartActive("");
  }

  return (
    <>
      <section>
        <LineChart width={1000} height={300} data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="userCount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="productSoldCount"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </section>
    </>
  );
};

export default UserLineChart;
