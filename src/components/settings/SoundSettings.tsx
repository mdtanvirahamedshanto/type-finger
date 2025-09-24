"use client";

import { useTheme } from "../theme/ThemeProvider";
import SettingItem from "./SettingItem";

export default function SoundSettings() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="p-4">
      <SettingItem 
        label="sound volume"
        description="Change the volume of the sound effects."
      >
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full"
            style={{
              accentColor: currentTheme.colors.primary
            }}
          />
          <span className="text-sm">50%</span>
        </div>
      </SettingItem>
      
      <SettingItem 
        label="click sounds"
        description="Play a click sound when typing."
      >
        <div className="grid grid-cols-3 gap-2">
          {["off", "click", "pop", "mechanical"].map((sound) => (
            <button
              key={sound}
              style={{
                backgroundColor: `${currentTheme.colors.secondary}40`,
              }}
              className={`p-2 rounded-md text-sm flex items-center justify-center ${
                sound === "click" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {sound}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="error sounds"
        description="Play a sound when making an error."
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
        label="result sounds"
        description="Play a sound when the test is completed."
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