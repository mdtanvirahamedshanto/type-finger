"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";

type TestOptionsProps = {
  testMode: "time" | "words" | "quote";
  setTestMode: (mode: "time" | "words" | "quote") => void;
  testDuration: number;
  setTestDuration: (duration: number) => void;
  wordCount: number;
  setWordCount: (count: number) => void;
};

export default function TestOptions({
  testMode,
  setTestMode,
  testDuration,
  setTestDuration,
  wordCount,
  setWordCount,
}: TestOptionsProps) {
  const { currentTheme } = useTheme();
  
  const timeOptions = [15, 30, 60, 120];
  const wordOptions = [10, 25, 50, 100];

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          className={`test-option ${testMode === "time" ? "active" : ""}`}
          onClick={() => setTestMode("time")}
        >
          time
        </button>
        <button
          className={`test-option ${testMode === "words" ? "active" : ""}`}
          onClick={() => setTestMode("words")}
        >
          words
        </button>
        <button
          className={`test-option ${testMode === "quote" ? "active" : ""}`}
          onClick={() => setTestMode("quote")}
        >
          quote
        </button>
      </div>

      {testMode === "time" && (
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              className={`test-option ${testDuration === time ? "active" : ""}`}
              onClick={() => setTestDuration(time)}
            >
              {time}s
            </button>
          ))}
        </div>
      )}

      {testMode === "words" && (
        <div className="flex flex-wrap gap-2">
          {wordOptions.map((count) => (
            <button
              key={count}
              className={`test-option ${wordCount === count ? "active" : ""}`}
              onClick={() => setWordCount(count)}
            >
              {count}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}