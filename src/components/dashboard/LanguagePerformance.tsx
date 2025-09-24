"use client";

interface LanguageStats {
  averageWPM: number;
  highestWPM: number;
  totalTests: number;
}

interface LanguagePerformanceProps {
  englishStats: LanguageStats;
  banglaStats: LanguageStats;
}

export default function LanguagePerformance({
  englishStats,
  banglaStats,
}: LanguagePerformanceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">English</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Average Speed:</span>
            <span className="font-medium">{Math.round(englishStats.averageWPM)} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Highest Speed:</span>
            <span className="font-medium">{Math.round(englishStats.highestWPM)} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tests Completed:</span>
            <span className="font-medium">{englishStats.totalTests}</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Bangla</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Average Speed:</span>
            <span className="font-medium">{Math.round(banglaStats.averageWPM)} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Highest Speed:</span>
            <span className="font-medium">{Math.round(banglaStats.highestWPM)} WPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tests Completed:</span>
            <span className="font-medium">{banglaStats.totalTests}</span>
          </div>
        </div>
      </div>
    </div>
  );
}