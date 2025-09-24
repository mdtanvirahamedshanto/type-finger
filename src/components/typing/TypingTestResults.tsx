"use client";

interface TypingTestResultsProps {
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
  onReset: () => void;
  onSave?: () => void;
}

export default function TypingTestResults({
  wpm,
  accuracy,
  duration,
  errors,
  onReset,
  onSave,
}: TypingTestResultsProps) {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold text-center mb-4">Test Results</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-500">Speed</div>
          <div className="text-3xl font-bold text-blue-600">{Math.round(wpm)} WPM</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-500">Accuracy</div>
          <div className="text-3xl font-bold text-green-600">{accuracy.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-500">Time</div>
          <div className="text-3xl font-bold text-purple-600">{Math.round(duration)}s</div>
        </div>
        
        <div className="bg-white p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-500">Errors</div>
          <div className="text-3xl font-bold text-red-600">{errors}</div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
        
        {onSave && (
          <button
            onClick={onSave}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Save Results
          </button>
        )}
      </div>
    </div>
  );
}