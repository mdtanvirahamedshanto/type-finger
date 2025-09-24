"use client";

import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { useTheme } from '../theme/ThemeProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PerformancePoint = {
  time: number;
  wpm: number;
  raw: number;
  accuracy?: number;
};

type PerformanceGraphProps = {
  data: PerformancePoint[];
  height?: number;
};

export default function PerformanceGraph({ data, height = 100 }: PerformanceGraphProps) {
  const { currentTheme } = useTheme();
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    // Update chart colors when theme changes
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [currentTheme]);

  const chartData = {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: 'WPM',
        data: data.map(point => point.wpm),
        borderColor: currentTheme.colors.primary,
        backgroundColor: `${currentTheme.colors.primary}20`,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Raw',
        data: data.map(point => point.raw),
        borderColor: currentTheme.colors.secondary,
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: currentTheme.colors.text,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: `${currentTheme.colors.secondary}20`,
        },
        ticks: {
          display: true,
          color: currentTheme.colors.text,
          font: {
            size: 10,
          },
        },
        min: 0,
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Line ref={chartRef as React.RefObject<ChartJS<"line">>} data={chartData} options={options} />
    </div>
  );
}