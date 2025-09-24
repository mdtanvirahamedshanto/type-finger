"use client";

import { useState } from "react";

interface TypingTestHeaderProps {
  language: "english" | "bangla";
}

export default function TypingTestHeader({ language }: TypingTestHeaderProps) {
  const [timer, _setTimer] = useState(0);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Typing Test</h2>
        <p className="text-gray-600">
          Language: {language === "english" ? "English" : "বাংলা"}
        </p>
      </div>
      <div className="text-xl font-mono">
        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
      </div>
    </div>
  );
}