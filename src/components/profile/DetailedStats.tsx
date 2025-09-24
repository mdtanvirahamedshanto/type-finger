"use client";

import { useTheme } from "../theme/ThemeProvider";

export default function DetailedStats() {
  const { currentTheme } = useTheme();
  
  // Mock data for the line chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    wpm: [42, 45, 48, 46, 50, 53, 51, 54, 52, 54],
    accuracy: [88, 90, 91, 89, 92, 94, 93, 97, 95, 97],
  };
  
  // Calculate chart dimensions
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 40;
  const graphWidth = chartWidth - (padding * 2);
  const graphHeight = chartHeight - (padding * 2);
  
  // Calculate scales
  const maxWpm = Math.max(...chartData.wpm) + 5;
  const maxAccuracy = 100;
  
  // Generate path data for WPM line
  const wpmPoints = chartData.wpm.map((wpm, i) => {
    const x = padding + (i * (graphWidth / (chartData.labels.length - 1)));
    const y = chartHeight - padding - ((wpm / maxWpm) * graphHeight);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  // Generate path data for accuracy line
  const accuracyPoints = chartData.accuracy.map((acc, i) => {
    const x = padding + (i * (graphWidth / (chartData.labels.length - 1)));
    const y = chartHeight - padding - ((acc / maxAccuracy) * graphHeight);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  return (
    <div className="detailed-stats mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-mono">Detailed Statistics</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
            <span className="text-xs opacity-70">WPM</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFD700" }}></div>
            <span className="text-xs opacity-70">Accuracy</span>
          </div>
        </div>
      </div>
      
      <div className="chart-container p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
        <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding + (graphHeight * ratio);
            return (
              <line 
                key={i}
                x1={padding} 
                y1={y} 
                x2={chartWidth - padding} 
                y2={y} 
                stroke="#444444" 
                strokeWidth="1" 
                strokeDasharray={i > 0 ? "4 4" : ""}
              />
            );
          })}
          
          {/* X-axis labels */}
          {chartData.labels.map((label, i) => {
            const x = padding + (i * (graphWidth / (chartData.labels.length - 1)));
            return (
              <text 
                key={i}
                x={x} 
                y={chartHeight - 10} 
                textAnchor="middle" 
                fontSize="10" 
                fill="#999999"
              >
                {label}
              </text>
            );
          })}
          
          {/* Y-axis labels */}
          {[0, maxWpm / 2, maxWpm].map((value, i) => {
            const y = chartHeight - padding - ((value / maxWpm) * graphHeight);
            return (
              <text 
                key={i}
                x={padding - 10} 
                y={y} 
                textAnchor="end" 
                dominantBaseline="middle" 
                fontSize="10" 
                fill="#999999"
              >
                {Math.round(value)}
              </text>
            );
          })}
          
          {/* WPM line */}
          <path 
            d={wpmPoints} 
            fill="none" 
            stroke={currentTheme.colors.primary} 
            strokeWidth="2"
          />
          
          {/* Accuracy line */}
          <path 
            d={accuracyPoints} 
            fill="none" 
            stroke="#FFD700" 
            strokeWidth="2"
          />
          
          {/* Data points for WPM */}
          {chartData.wpm.map((wpm, i) => {
            const x = padding + (i * (graphWidth / (chartData.labels.length - 1)));
            const y = chartHeight - padding - ((wpm / maxWpm) * graphHeight);
            return (
              <circle 
                key={i}
                cx={x} 
                cy={y} 
                r="4" 
                fill={currentTheme.colors.primary}
              />
            );
          })}
          
          {/* Data points for accuracy */}
          {chartData.accuracy.map((acc, i) => {
            const x = padding + (i * (graphWidth / (chartData.labels.length - 1)));
            const y = chartHeight - padding - ((acc / maxAccuracy) * graphHeight);
            return (
              <circle 
                key={i}
                cx={x} 
                cy={y} 
                r="4" 
                fill="#FFD700"
              />
            );
          })}
        </svg>
        
        {/* Tooltip example (static for demonstration) */}
        <div 
          className="tooltip absolute p-2 rounded-md text-xs"
          style={{ 
            left: "60%", 
            top: "40%", 
            backgroundColor: "#333333",
            border: "1px solid #555555"
          }}
        >
          <div className="font-bold">Oct 2023</div>
          <div className="flex justify-between gap-4">
            <span>WPM:</span>
            <span>54</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Accuracy:</span>
            <span>97%</span>
          </div>
        </div>
      </div>
      
      {/* Additional metrics */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">pb wpm</div>
          <div className="text-2xl">54</div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">pb raw</div>
          <div className="text-2xl">56</div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">pb accuracy</div>
          <div className="text-2xl">97%</div>
        </div>
      </div>
    </div>
  );
}