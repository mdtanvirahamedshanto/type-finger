"use client";

import { formatDistanceToNow } from "date-fns";

interface TestResult {
  _id: string;
  language: "english" | "bangla";
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  createdAt: string;
}

interface RecentTestsProps {
  tests: TestResult[];
}

export default function RecentTests({ tests }: RecentTestsProps) {
  if (tests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tests completed yet. Start a typing test to see your results here.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Language
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WPM
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Accuracy
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tests.map((test) => (
            <tr key={test._id}>
              <td className="px-4 py-3 whitespace-nowrap">
                {test.language === "english" ? "English" : "বাংলা"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-medium">
                {Math.round(test.wpm)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {test.accuracy.toFixed(1)}%
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {formatDistanceToNow(new Date(test.createdAt), { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}