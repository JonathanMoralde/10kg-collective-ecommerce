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

const YearBarChart = ({ data }) => {
  return (
    <>
      <section className="d-flex mt-3">
        <div className="mb-3 text-center fs-5">
          <h5>Total Sales this Year</h5>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip />
            <Bar
              dataKey="total_sales"
              stackId="amount"
              fill="#84ca9d"
              barSize={50}
            />
          </BarChart>
        </div>
        <div className="mb-3 text-center fs-5">
          <h5>Total Orders this Year</h5>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip />
            <Bar
              dataKey="total_order_count"
              stackId="amount"
              fill="#ffca9d"
              barSize={50}
            />
          </BarChart>
        </div>
      </section>
    </>
  );
};

export default YearBarChart;
