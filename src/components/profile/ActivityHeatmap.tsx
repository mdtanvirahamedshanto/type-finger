"use client";

import { useTheme } from "../theme/ThemeProvider";

type HeatmapData = {
  date: string;
  count: number;
};

export default function ActivityHeatmap() {
  const { currentTheme } = useTheme();
  
  // Mock data for the heatmap (last 12 weeks)
  const generateMockData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    const today = new Date();
    
    // Generate data for the last 12 weeks (84 days)
    for (let i = 0; i < 84; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Random activity count (0-3)
      const count = Math.floor(Math.random() * 4);
      
      data.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    return data;
  };
  
  const heatmapData = generateMockData();
  
  // Group data by week for display
  const weeks: HeatmapData[][] = [];
  for (let i = 0; i < 12; i++) {
    weeks.push(heatmapData.slice(i * 7, (i + 1) * 7));
  }
  
  // Get color based on activity count
  const getActivityColor = (count: number) => {
    if (count === 0) return `${currentTheme.colors.secondary}20`;
    if (count === 1) return `${currentTheme.colors.primary}40`;
    if (count === 2) return `${currentTheme.colors.primary}70`;
    return currentTheme.colors.primary;
  };
  
  // Get day labels for the first column
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="activity-heatmap mb-8">
      <h3 className="text-lg font-mono mb-4">Activity</h3>
      
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2">
          {dayLabels.map((day, index) => (
            <div key={index} className="h-6 flex items-center justify-end">
              <span className="text-xs opacity-70">{day}</span>
            </div>
          ))}
        </div>
        
        {/* Heatmap grid */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-6 h-6 rounded-sm"
                style={{ backgroundColor: getActivityColor(day.count) }}
                title={`${day.date}: ${day.count} tests`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-2 gap-2 items-center">
        <span className="text-xs opacity-70">Less</span>
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getActivityColor(level) }}
          ></div>
        ))}
        <span className="text-xs opacity-70">More</span>
      </div>
    </div>
  );
}