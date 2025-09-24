"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import TypingTestHeader from "./TypingTestHeader";
import TypingTestInput from "./TypingTestInput";
import TypingTestResults from "./TypingTestResults";
import { calculateWPM, calculateAccuracy } from "@/lib/typingUtils";

interface TypingTestProps {
  text: string;
  language: "english" | "bangla";
}

export default function TypingTest({ text, language }: TypingTestProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = text.split(" ");

  useEffect(() => {
    // Focus the input field when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (value: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    setInput(value);

    // Check if the current input matches the current word
    const currentWord = words[currentWordIndex];
    const typedWord = value.trim();

    if (value.endsWith(" ") && typedWord !== "") {
      // User has completed a word
      if (typedWord !== currentWord) {
        setErrors(errors + 1);
      }

      setInput("");
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);

      // Check if test is complete
      if (currentWordIndex === words.length - 1) {
        setEndTime(Date.now());
        setIsFinished(true);
      }
    } else {
      // Update current character index
      setCurrentCharIndex(value.length);
    }
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    setIsFinished(false);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const wpm = startTime && endTime ? calculateWPM(text, startTime, endTime) : 0;
  const accuracy = calculateAccuracy(text.split(" ").length, errors);
  const duration = startTime && endTime ? (endTime - startTime) / 1000 : 0;

  const saveResult = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/test-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          wpm,
          accuracy,
          duration,
          errors,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save result");
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <TypingTestHeader language={language} />

      <div className="my-6 p-4 bg-gray-50 rounded-md text-lg leading-relaxed">
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className={`${
              wordIndex === currentWordIndex
                ? "bg-yellow-100"
                : wordIndex < currentWordIndex
                ? "text-gray-500"
                : ""
            } ${language === "bangla" ? "font-bangla" : ""}`}
          >
            {wordIndex === currentWordIndex
              ? word.split("").map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={
                      charIndex === currentCharIndex
                        ? "border-b-2 border-blue-500"
                        : charIndex < currentCharIndex
                        ? "text-gray-700"
                        : ""
                    }
                  >
                    {char}
                  </span>
                ))
              : word}
            {wordIndex < words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>

      {!isFinished ? (
        <TypingTestInput
          value={input}
          onChange={handleInputChange}
          inputRef={inputRef}
          disabled={isFinished}
        />
      ) : (
        <TypingTestResults
          wpm={wpm}
          accuracy={accuracy}
          duration={duration}
          errors={errors}
          onReset={resetTest}
          onSave={session?.user ? saveResult : undefined}
        />
      )}
    </div>
  );
}