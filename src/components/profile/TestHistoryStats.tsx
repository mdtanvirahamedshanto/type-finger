"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

type TimePeriod = "all" | "daily" | "weekly" | "monthly";

type StatCategory = {
  label: string;
  value: number;
  unit: string;
  percentage?: number;
};

export default function TestHistoryStats() {
  const { currentTheme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("all");

  // Mock data for different time periods
  const statsByPeriod = {
    all: [
      { label: "wpm", value: 51, unit: "", percentage: 94 },
      { label: "raw", value: 54, unit: "", percentage: 97 },
      { label: "accuracy", value: 43, unit: "%", percentage: 97 },
      { label: "consistency", value: 45, unit: "%", percentage: 92 },
    ],
    daily: [
      { label: "wpm", value: 53, unit: "", percentage: 95 },
      { label: "raw", value: 56, unit: "", percentage: 98 },
      { label: "accuracy", value: 45, unit: "%", percentage: 98 },
      { label: "consistency", value: 47, unit: "%", percentage: 94 },
    ],
    weekly: [
      { label: "wpm", value: 50, unit: "", percentage: 93 },
      { label: "raw", value: 53, unit: "", percentage: 96 },
      { label: "accuracy", value: 42, unit: "%", percentage: 96 },
      { label: "consistency", value: 44, unit: "%", percentage: 91 },
    ],
    monthly: [
      { label: "wpm", value: 49, unit: "", percentage: 92 },
      { label: "raw", value: 52, unit: "", percentage: 95 },
      { label: "accuracy", value: 41, unit: "%", percentage: 95 },
      { label: "consistency", value: 43, unit: "%", percentage: 90 },
    ],
  };

  const currentStats = statsByPeriod[selectedPeriod];

  return (
    <div className="test-history-stats mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-mono">Test History</h3>
        <div className="time-period-selector flex gap-2">
          {(["all", "daily", "weekly", "monthly"] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedPeriod === period
                  ? `bg-opacity-80`
                  : `bg-opacity-20 hover:bg-opacity-40`
              }`}
              style={{
                backgroundColor: selectedPeriod === period
                  ? currentTheme.colors.primary
                  : `${currentTheme.colors.secondary}20`
              }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {currentStats.map((stat, index) => (
          <div
            key={index}
            className="stat-card p-4 rounded-lg"
            style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}
          >
            <div className="text-sm opacity-70">{stat.label}</div>
            <div className="text-4xl">
              {stat.value}
              <span className="text-sm">{stat.unit}</span>
            </div>
            <div className="mt-2">
              <div className="w-full h-1 bg-gray-700 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: currentTheme.colors.primary,
                  }}
                ></div>
              </div>
              <div className="text-xs opacity-70 mt-1">{stat.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}