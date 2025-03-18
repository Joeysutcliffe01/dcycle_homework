import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { ChartType, DataKeyProps } from "../../types/chart";
import { FormattedCovidData } from "../../types/covid";

// Props for the reusable CovidChart component
interface CovidChartProps {
  type: ChartType;
  data: FormattedCovidData[];
  dataKeys: DataKeyProps[];
  title: string;
}

const CovidChart: React.FC<CovidChartProps> = ({
  type,
  data,
  dataKeys,
  title,
}) => {
  const isTotalChart = title === "Total Metrics Over Time";

  // Adjusts left margin for total metrics chart to prevent Y-axis clipping.
  const chartProps = {
    data,
    margin: {
      top: 20,
      right: 30,
      left: isTotalChart ? 80 : 50,
      bottom: 5,
    },
  };

  // Dynamically selects the Recharts chart component based on chart type.
  const ChartComp =
    type === "line" ? LineChart : type === "bar" ? BarChart : AreaChart;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComp {...chartProps}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tickFormatter={(v) => v.toLocaleString()} />
          <Tooltip formatter={(v) => v.toLocaleString()} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          {/* Maps over provided data keys and renders each with the correct chart component and styling */}
          {dataKeys.map((dk) => {
            const Comp = type === "bar" ? Bar : type === "area" ? Area : Line;
            return (
              <Comp
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={dk.color}
                fill={dk.color}
                name={dk.label}
              />
            );
          })}
        </ChartComp>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidChart;
