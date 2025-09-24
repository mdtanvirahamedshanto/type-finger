"use client";

import { RefObject } from "react";

interface TypingTestInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  disabled: boolean;
}

export default function TypingTestInput({
  value,
  onChange,
  inputRef,
  disabled,
}: TypingTestInputProps) {
  return (
    <div className="mt-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing..."
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
}