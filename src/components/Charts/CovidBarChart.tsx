import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { CovidEntry } from "../../types/covid"; // Updated import

interface CovidBarChartProps {
  data?: CovidEntry[]; // Make it optional for safety
}

const CovidBarChart: React.FC<CovidBarChartProps> = ({ data = [] }) => {
  const formattedData = data.map((entry) => ({
    date: entry.date,
    cases: entry.cases?.total?.value ?? 0,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-bold mb-4">COVID-19 Cases (Bar Chart)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
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
          <Bar dataKey="cases" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidBarChart;
