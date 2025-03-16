import React, { useEffect, useState } from "react";
import axios from "axios";
import { CovidLineChart, CovidBarChart, CovidAreaChart } from "../Charts";
import { CovidEntry } from "../../types/covid";

interface ChartSelection {
  line: boolean;
  bar: boolean;
  area: boolean;
}

const CovidData: React.FC = () => {
  const [covidData, setCovidData] = useState<CovidEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartSelection, setChartSelection] = useState<ChartSelection>({
    line: true,
    bar: true,
    area: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3200/api/covid/historical"
        );
        setCovidData(response.data.data);
      } catch (error) {
        console.error("Error fetching COVID data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!covidData.length) return <div>No data available</div>;

  const toggleCheckbox = (chart: keyof ChartSelection) => {
    setChartSelection((prev) => ({ ...prev, [chart]: !prev[chart] }));
  };

  const applySelection = () => {
    // Simply close the modal since state is already updated via checkboxes.
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Select Charts
      </button>

      {chartSelection.line && <CovidLineChart data={covidData} />}
      {chartSelection.bar && <CovidBarChart data={covidData} />}
      {chartSelection.area && <CovidAreaChart data={covidData} />}

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-lg z-20 p-6 w-96">
              <h2 className="text-xl font-bold mb-4">
                Select Charts to Display
              </h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={chartSelection.line}
                    onChange={() => toggleCheckbox("line")}
                    className="mr-2"
                  />
                  Line Chart
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={chartSelection.bar}
                    onChange={() => toggleCheckbox("bar")}
                    className="mr-2"
                  />
                  Bar Chart
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={chartSelection.area}
                    onChange={() => toggleCheckbox("area")}
                    className="mr-2"
                  />
                  Area Chart
                </label>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={applySelection}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CovidData;
