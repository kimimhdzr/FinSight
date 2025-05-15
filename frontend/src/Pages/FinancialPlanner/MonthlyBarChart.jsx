// MonthlyBarChart.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const MonthlyBarChart = ({ progress }) => {
  const data = progress.map(entry => ({
    month: new Date(entry.date).toLocaleString("default", { month: "short", year: "2-digit" }),
    amount: entry.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#0C75D6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
