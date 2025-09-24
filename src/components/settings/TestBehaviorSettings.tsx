"use client";

import { useTheme } from "../theme/ThemeProvider";
import SettingItem from "./SettingItem";

export default function BehaviorSettings() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="p-4">
      <SettingItem 
        label="quick restart"
        description="Tab + Enter to quickly restart the test."
      >
        <div className="flex gap-2">
          {["off", "on"].map((option) => (
            <button
              key={option}
              style={{ 
                backgroundColor: option === "on" 
                  ? currentTheme.colors.primary 
                  : `${currentTheme.colors.secondary}40`
              }}
              className={`px-4 py-2 rounded-md text-sm ${
                option === "on" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="blind mode"
        description="Hide the text during the test."
      >
        <div className="flex gap-2">
          {["off", "on"].map((option) => (
            <button
              key={option}
              style={{ 
                backgroundColor: option === "off" 
                  ? currentTheme.colors.primary 
                  : `${currentTheme.colors.secondary}40`
              }}
              className={`px-4 py-2 rounded-md text-sm ${
                option === "off" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="difficulty"
        description="Change the difficulty of the test."
      >
        <div className="grid grid-cols-3 gap-2">
          {["normal", "expert", "master"].map((difficulty) => (
            <button
              key={difficulty}
              style={{ 
                backgroundColor: `${currentTheme.colors.secondary}40`
              }}
              className={`p-2 rounded-md text-sm ${
                difficulty === "normal" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="stop on error"
        description="Stop the test when an error is made."
      >
        <div className="flex gap-2">
          {["off", "on"].map((option) => (
            <button
              key={option}
              style={{ 
                backgroundColor: option === "off" 
                  ? currentTheme.colors.primary 
                  : `${currentTheme.colors.secondary}40`
              }}
              className={`px-4 py-2 rounded-md text-sm ${
                option === "off" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="always show words history"
        description="Always show the words history."
      >
        <div className="flex gap-2">
          {["off", "on"].map((option) => (
            <button
              key={option}
              style={{ 
                backgroundColor: option === "on" 
                  ? currentTheme.colors.primary 
                  : `${currentTheme.colors.secondary}40`
              }}
              className={`px-4 py-2 rounded-md text-sm ${
                option === "on" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </SettingItem>
    </div>
  );
}