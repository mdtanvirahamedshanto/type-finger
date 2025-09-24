"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import TypingTest from "./TypingTest";
import TestOptions from "./TestOptions";
import StatisticsDisplay from "./StatisticsDisplay";
import PerformanceGraph from "./PerformanceGraph";
import { useTheme } from "../theme/ThemeProvider";

// Sample text for typing test
const sampleText = "high she late may if that say house take people keep want thing as who find follow have over line we because find can begin face child find begin end early back see that of public where leave";

type TypingTestPageProps = {
  session: Session | null;
};

export default function TypingTestPage({ session }: TypingTestPageProps) {
  const { currentTheme } = useTheme();
  const [testMode, setTestMode] = useState<"time" | "words" | "quote">("time");
  const [testDuration, setTestDuration] = useState<number>(30);
  const [wordCount, setWordCount] = useState<number>(25);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [performanceData, setPerformanceData] = useState<{time: number, wpm: number, raw: number, accuracy: number}[]>([]);

  // Mock data for the performance graph
  useEffect(() => {
    if (performanceData.length === 0) {
      const mockData = Array.from({ length: 30 }, (_, i) => ({
        time: i,
        wpm: Math.floor(Math.random() * 30) + 40,
        raw: Math.floor(Math.random() * 30) + 45,
        accuracy: Math.floor(Math.random() * 10) + 90,
      }));
      setPerformanceData(mockData);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <TestOptions
          testMode={testMode}
          setTestMode={setTestMode}
          testDuration={testDuration}
          setTestDuration={setTestDuration}
          wordCount={wordCount}
          setWordCount={setWordCount}
        />
      </div>

      {/* Performance Graph */}
      <div className="mb-8">
        <PerformanceGraph data={performanceData} height={120} />
      </div>

      {/* Statistics Display */}
      <StatisticsDisplay
        wpm={currentWPM}
        accuracy={currentAccuracy}
        time={elapsedTime}
      />

      {/* Typing Test */}
      <div className="bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <TypingTest
          text={sampleText}
          language="english"
        />
      </div>

      {/* Footer with keyboard layout and other options */}
      <div className="flex justify-center space-x-4 text-sm opacity-70">
        <button className="hover:text-primary transition-colors">restart test</button>
        <span>|</span>
        <button className="hover:text-primary transition-colors">keyboard</button>
        <span>|</span>
        <button className="hover:text-primary transition-colors">language</button>
      </div>
    </div>
  );
}