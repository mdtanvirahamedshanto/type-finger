"use client";

import { useTheme } from "../theme/ThemeProvider";
import SettingItem from "./SettingItem";

export default function FunboxSettings() {
  const { currentTheme } = useTheme();
  
  const funboxModes = [
    { id: "none", name: "none", description: "Normal typing experience" },
    { id: "arrows", name: "arrows", description: "Type using only arrow keys" },
    { id: "capitals", name: "capitals", description: "All capital letters" },
    { id: "earthquake", name: "earthquake", description: "Screen shakes as you type" },
    { id: "mirror", name: "mirror", description: "Text is displayed in reverse" },
    { id: "upside-down", name: "upside-down", description: "Text is displayed upside down" }
  ];
  
  return (
    <div className="p-4">
      <SettingItem 
        label="funbox mode"
        description="Change the typing experience with fun modifiers."
      >
        <div className="grid grid-cols-2 gap-3">
          {funboxModes.map((mode) => (
            <button
              key={mode.id}
              style={{ 
                backgroundColor: `${currentTheme.colors.secondary}40`,
              }}
              className={`p-3 rounded-md text-sm flex flex-col items-start ${
                mode.id === "none" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              <span className="font-medium">{mode.name}</span>
              <span className="text-xs opacity-70 mt-1">{mode.description}</span>
            </button>
          ))}
        </div>
      </SettingItem>
    </div>
  );
}