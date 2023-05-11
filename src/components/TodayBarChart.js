import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const TodayBarChart = ({ data }) => {
  return (
    <>
      <section>
        <div className="mb-3 text-center fs-5">
          <h5>Sales Amount</h5>
          <BarChart width={1000} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item_name" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales_amount" stackId="amount" fill="#84ca9d" />
          </BarChart>
        </div>
        <div className="mb-3 text-center fs-5">
          <h5>Total Order & Total Quantity</h5>
          <LineChart width={1000} height={300} data={data}>
            <XAxis dataKey="item_name" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="order_count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="total_qty"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </section>
    </>
  );
};

export default TodayBarChart;
