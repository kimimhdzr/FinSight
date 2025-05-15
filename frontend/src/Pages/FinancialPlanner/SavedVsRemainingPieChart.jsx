// SavedVsRemainingPieChart.jsx
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#0C75D6", "#E0E0E0"];

const SavedVsRemainingPieChart = ({ progress, goalAmount }) => {
  const saved = progress.reduce((acc, cur) => acc + cur.amount, 0);
  const remaining = Math.max(goalAmount - saved, 0);

  const data = [
    { name: "Saved", value: saved },
    { name: "Remaining", value: remaining },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SavedVsRemainingPieChart;
