import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import ChartControls from "./ChartControls";
import { CovidChart } from "../Charts";
import { ChartType } from "../../types/chart";
import { CovidEntry, FormattedCovidData } from "../../types/covid";
import { API_BASE_URL } from "../../config";

// Lottie Animation
import Lottie from "lottie-react";
import covidLottie from "../../assets/Lottie/lottie_covid.json";

const CovidData: React.FC = () => {
  // Raw COVID data from API
  const [covidData, setCovidData] = useState<CovidEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Chart type selection state
  const [chartTypes, setChartTypes] = useState<{
    total: ChartType;
    daily: ChartType;
  }>({ total: "line", daily: "bar" });

  // Toggle 7-day moving average and date range selector
  const [showMovingAvg, setShowMovingAvg] = useState(true);
  const [dateRange, setDateRange] = useState(90); // default: last 90 days

  // Ref for downloading charts as an image
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch COVID-19 historical data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/covid/historical`
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

  // Format data for charts and calculate 7-day moving averages
  const formatData: FormattedCovidData[] = useMemo(() => {
    return covidData
      .map((entry, i, arr) => {
        // Helper to calculate N-day moving average for any metric
        const avg = (getter: (e: CovidEntry) => number, days: number) => {
          const slice = arr.slice(i, i + days);
          const sum = slice.reduce((acc, curr) => acc + getter(curr), 0);
          return Math.round(sum / days);
        };

        return {
          date: entry.date,
          totalCases: entry.cases?.total?.value || 0,
          newCases: entry.cases?.total?.calculated?.change_from_prior_day || 0,
          avgNewCases: avg(
            (e) => e.cases?.total?.calculated?.change_from_prior_day || 0,
            7
          ),
          totalTests: entry.testing?.total?.value || 0,
          newTests:
            entry.testing?.total?.calculated?.change_from_prior_day || 0,
          avgNewTests: avg(
            (e) => e.testing?.total?.calculated?.change_from_prior_day || 0,
            7
          ),
          totalDeaths: entry.outcomes?.death?.total?.value || 0,
          newDeaths:
            entry.outcomes?.death?.total?.calculated?.change_from_prior_day ||
            0,
          avgNewDeaths: avg(
            (e) =>
              e.outcomes?.death?.total?.calculated?.change_from_prior_day || 0,
            7
          ),
        };
      })
      .slice(0, dateRange)
      .reverse(); // latest dates first
  }, [covidData, dateRange]);

  // Export charts as a PNG
  const downloadChart = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: "#ffffff", // ensures white background
      scale: 2, // higher resolution
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "covid_chart.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Lottie
          animationData={covidLottie}
          loop
          autoplay
          style={{ width: 300, height: 300 }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls for chart settings and download */}
      <ChartControls
        chartTypes={chartTypes}
        setChartTypes={setChartTypes}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showMovingAvg={showMovingAvg}
        setShowMovingAvg={setShowMovingAvg}
        downloadChart={downloadChart}
      />

      {/* Render charts and wrap for export */}
      <div ref={chartRef} className="space-y-4">
        {/* Total Metrics Chart */}
        <CovidChart
          type={chartTypes.total}
          data={formatData}
          title="Total Metrics Over Time"
          dataKeys={[
            { key: "totalCases", color: "#8884d8", label: "Total Cases" },
            { key: "totalTests", color: "#82ca9d", label: "Total Tests" },
            { key: "totalDeaths", color: "#ffc658", label: "Total Deaths" },
          ]}
        />

        {/* Daily Metrics Chart with optional 7-day averages */}
        <CovidChart
          type={chartTypes.daily}
          data={formatData}
          title="New Metrics Per Day"
          dataKeys={[
            { key: "newCases", color: "#ff7300", label: "New Cases" },
            ...(showMovingAvg
              ? [
                  {
                    key: "avgNewCases",
                    color: "#1e90ff",
                    label: "7-Day Avg Cases",
                  },
                ]
              : []),
            { key: "newTests", color: "#00c49f", label: "New Tests" },
            ...(showMovingAvg
              ? [
                  {
                    key: "avgNewTests",
                    color: "#8a2be2",
                    label: "7-Day Avg Tests",
                  },
                ]
              : []),
            { key: "newDeaths", color: "#ff0000", label: "New Deaths" },
            ...(showMovingAvg
              ? [
                  {
                    key: "avgNewDeaths",
                    color: "#6a5acd",
                    label: "7-Day Avg Deaths",
                  },
                ]
              : []),
          ]}
        />
      </div>
    </div>
  );
};

export default CovidData;
