"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import SettingItem from "./SettingItem";

export default function ThemeSettings() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [fontSize, setFontSize] = useState(15);
  
  return (
    <div className="p-4">
      <SettingItem 
        label="theme"
        description="Select a color theme for the application."
      >
        <div className="grid grid-cols-3 gap-2">
          {availableThemes.map((themeName) => (
            <button
              key={themeName}
              onClick={() => setTheme(themeName)}
              style={{ 
                backgroundColor: currentTheme.name.toLowerCase() === themeName.toLowerCase() ? currentTheme.colors.primary : `${currentTheme.colors.secondary}40`,
                color: currentTheme.colors.text
              }}
              className={`p-2 rounded-md text-sm ${
                currentTheme.name === themeName ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {themeName}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="font size"
        description="Change the font size of the text during the test."
      >
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="10"
            max="30"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
            style={{
              accentColor: currentTheme.colors.primary
            }}
          />
          <span className="text-sm">{fontSize}px</span>
        </div>
      </SettingItem>
      
      <SettingItem 
        label="caret style"
        description="Change the style of the caret during the test."
      >
        <div className="grid grid-cols-3 gap-2">
          {["block", "outline", "underline", "off"].map((style) => (
            <button
              key={style}
              style={{ 
                backgroundColor: `${currentTheme.colors.secondary}40`
              }}
              className={`p-2 rounded-md text-sm ${
                style === "block" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </SettingItem>
      
      <SettingItem 
        label="smooth caret"
        description="The caret will move smoothly between letters and words."
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
        label="layout emulator"
        description="With this setting you can emulate other layouts."
      >
        <div className="grid grid-cols-3 gap-2">
          {["off", "qwerty", "dvorak", "colemak"].map((layout) => (
            <button
              key={layout}
              style={{ 
                backgroundColor: `${currentTheme.colors.secondary}40`
              }}
              className={`p-2 rounded-md text-sm ${
                layout === "off" ? `ring-2 ring-[${currentTheme.colors.text}]` : ""
              }`}
            >
              {layout}
            </button>
          ))}
        </div>
      </SettingItem>
    </div>
  );
}