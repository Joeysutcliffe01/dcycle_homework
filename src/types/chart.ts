// src/types/chart.ts

export type ChartType = "line" | "bar" | "area";

export interface DataKeyProps {
  key: string;
  color: string;
  label: string;
}
