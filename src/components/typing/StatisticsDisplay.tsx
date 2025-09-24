"use client";

import { useTheme } from "../theme/ThemeProvider";

type StatisticsDisplayProps = {
  wpm: number;
  accuracy: number;
  time: number;
  errors?: number;
};

export default function StatisticsDisplay({
  wpm,
  accuracy,
  time,
  errors = 0,
}: StatisticsDisplayProps) {
  const { currentTheme } = useTheme();

  return (
    <div className="flex flex-wrap justify-center gap-6 my-6">
      <div className="stat-card">
        <div className="stat-value">{wpm}</div>
        <div className="stat-label">wpm</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{accuracy.toFixed(1)}%</div>
        <div className="stat-label">accuracy</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{time.toFixed(1)}s</div>
        <div className="stat-label">time</div>
      </div>
      
      {errors > 0 && (
        <div className="stat-card">
          <div className="stat-value">{errors}</div>
          <div className="stat-label">errors</div>
        </div>
      )}
    </div>
  );
}