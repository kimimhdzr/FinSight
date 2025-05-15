// SavingsLineChart.jsx
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const SavingsLineChart = ({ progress }) => {
  const data = progress.map(entry => ({
    month: new Date(entry.date).toLocaleString("default", { month: "short", year: "2-digit" }),
    amount: entry.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#0C75D6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SavingsLineChart;
