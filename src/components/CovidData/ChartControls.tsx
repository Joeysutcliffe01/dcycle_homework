import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ChartType } from "../../types/chart";

// Controls to manage chart settings (type, date range, moving average, download)
interface ChartControlsProps {
  chartTypes: {
    total: ChartType;
    daily: ChartType;
  };
  setChartTypes: React.Dispatch<
    React.SetStateAction<{
      total: ChartType;
      daily: ChartType;
    }>
  >;
  dateRange: number;
  setDateRange: React.Dispatch<React.SetStateAction<number>>;
  showMovingAvg: boolean;
  setShowMovingAvg: React.Dispatch<React.SetStateAction<boolean>>;
  downloadChart: () => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartTypes,
  setChartTypes,
  dateRange,
  setDateRange,
  showMovingAvg,
  setShowMovingAvg,
  downloadChart,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Dropdown: Select chart type for total metrics */}
      <div>
        <label className="mr-2 font-semibold">Total Chart Type:</label>
        <select
          value={chartTypes.total}
          onChange={(e) =>
            setChartTypes((prev) => ({
              ...prev,
              total: e.target.value as ChartType,
            }))
          }
          className="border p-1"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="area">Area</option>
        </select>
      </div>

      {/* Dropdown: Select chart type for daily metrics */}
      <div>
        <label className="mr-2 font-semibold">Daily Chart Type:</label>
        <select
          value={chartTypes.daily}
          onChange={(e) =>
            setChartTypes((prev) => ({
              ...prev,
              daily: e.target.value as ChartType,
            }))
          }
          className="border p-1"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="area">Area</option>
        </select>
      </div>

      {/* Dropdown: Select how many days of data to show */}
      <div>
        <label className="mr-2 font-semibold">Date Range:</label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(Number(e.target.value))}
          className="border p-1"
        >
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
          <option value={180}>Last 180 Days</option>
        </select>
      </div>

      {/* Toggle: Enable or disable 7-day moving average */}
      <label
        className="flex items-center cursor-pointer"
        data-tooltip-id="avgTip"
        data-tooltip-content="Smooths daily spikes by averaging the past 7 days. Helps reveal trends."
      >
        <input
          type="checkbox"
          checked={showMovingAvg}
          onChange={() => setShowMovingAvg(!showMovingAvg)}
          className="mr-1"
        />
        7-Day Avg
      </label>

      <ReactTooltip id="avgTip" place="top" />

      {/* Button: Trigger chart download as PNG */}
      <button
        onClick={downloadChart}
        className="p-1 w-40 rounded bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:from-blue-800 hover:to-cyan-600 cursor-pointer"
      >
        Download Chart
      </button>
    </div>
  );
};

export default ChartControls;
