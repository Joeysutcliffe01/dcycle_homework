import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { CovidEntry } from "../../types/covid"; // Ensure the path is correct

interface CovidLineChartProps {
  data?: CovidEntry[];
}

const CovidLineChart: React.FC<CovidLineChartProps> = ({ data = [] }) => {
  const formattedData = data.map((entry) => ({
    date: entry.date,
    cases: entry.cases?.total?.value ?? 0,
  }));

  console.log("Formatted Data:", formattedData); // Debug log

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-bold mb-4">
        COVID-19 Cases Over Time (Line Chart)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            padding={{ top: 20, bottom: 20 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidLineChart;
