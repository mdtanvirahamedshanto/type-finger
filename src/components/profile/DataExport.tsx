"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

type ExportFormat = "json" | "csv" | "txt";

export default function DataExport() {
  const { currentTheme } = useTheme();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("json");
  
  const handleExport = () => {
    // In a real app, this would call an API to generate the export file
    // For now, we'll just simulate a download with mock data
    
    let content = "";
    const mockData = {
      user: "tashanto",
      testsCompleted: 42,
      timeTyping: "00:37:53",
      highestWpm: 54,
      averageWpm: 39,
      highestAccuracy: 97,
    };
    
    if (selectedFormat === "json") {
      content = JSON.stringify(mockData, null, 2);
    } else if (selectedFormat === "csv") {
      content = "user,testsCompleted,timeTyping,highestWpm,averageWpm,highestAccuracy\n";
      content += `${mockData.user},${mockData.testsCompleted},${mockData.timeTyping},${mockData.highestWpm},${mockData.averageWpm},${mockData.highestAccuracy}`;
    } else {
      content = `User: ${mockData.user}\n`;
      content += `Tests Completed: ${mockData.testsCompleted}\n`;
      content += `Time Typing: ${mockData.timeTyping}\n`;
      content += `Highest WPM: ${mockData.highestWpm}\n`;
      content += `Average WPM: ${mockData.averageWpm}\n`;
      content += `Highest Accuracy: ${mockData.highestAccuracy}%`;
    }
    
    // Create a download link
    const blob = new Blob([content], { type: `text/${selectedFormat}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `type-finger-stats.${selectedFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="data-export mb-8">
      <h3 className="text-lg font-mono mb-4">Export Data</h3>
      
      <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
        <div className="mb-4">
          <label className="block text-sm opacity-70 mb-2">Export Format</label>
          <div className="flex gap-2">
            {(["json", "csv", "txt"] as ExportFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedFormat === format
                    ? `bg-opacity-80`
                    : `bg-opacity-20 hover:bg-opacity-40`
                }`}
                style={{
                  backgroundColor: selectedFormat === format
                    ? currentTheme.colors.primary
                    : `${currentTheme.colors.secondary}20`
                }}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-md text-sm font-medium"
            style={{ backgroundColor: currentTheme.colors.primary }}
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}