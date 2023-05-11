import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MonthLineChart = ({ data }) => {
  return (
    <>
      <section className="mt-3 text-center">
        <div className="mb-5">
          <h5 className="mb-3">Monthly Sales</h5>
          <LineChart width={1000} height={300} data={data} className="fs-5">
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_sales"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <h5 className="mb-3">Monthly Total Order</h5>
        <LineChart width={1000} height={300} data={data} className="fs-5">
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total_order_count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <div></div>
      </section>
    </>
  );
};

export default MonthLineChart;
