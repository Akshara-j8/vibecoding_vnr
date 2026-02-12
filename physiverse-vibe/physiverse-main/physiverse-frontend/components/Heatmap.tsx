"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function Heatmap() {
  const values = [
    { date: "2026-02-01", count: 1 },
    { date: "2026-02-02", count: 2 },
  ];

  return (
    <div className="mt-10">
      <CalendarHeatmap
        startDate={new Date("2026-01-01")}
        endDate={new Date("2026-12-31")}
        values={values}
      />
    </div>
  );
}
