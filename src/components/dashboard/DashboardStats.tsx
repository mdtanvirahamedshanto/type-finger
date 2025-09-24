"use client";

interface DashboardStatsProps {
  averageWPM: number;
  highestWPM: number;
  totalTests: number;
}

export default function DashboardStats({
  averageWPM,
  highestWPM,
  totalTests,
}: DashboardStatsProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-500 mb-2">Average Speed</h3>
        <p className="text-3xl font-bold text-blue-600">{Math.round(averageWPM)} WPM</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-500 mb-2">Highest Speed</h3>
        <p className="text-3xl font-bold text-green-600">{Math.round(highestWPM)} WPM</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-500 mb-2">Total Tests</h3>
        <p className="text-3xl font-bold text-purple-600">{totalTests}</p>
      </div>
    </>
  );
}