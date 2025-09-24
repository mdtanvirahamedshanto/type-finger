"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  success: string;
};

type Theme = {
  name: string;
  colors: ThemeColors;
};

const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      background: '#ffffff',
      text: '#1f2937',
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#8b5cf6',
      error: '#ef4444',
      success: '#10b981',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#1f2937',
      text: '#f3f4f6',
      primary: '#60a5fa',
      secondary: '#9ca3af',
      accent: '#a78bfa',
      error: '#f87171',
      success: '#34d399',
    },
  },
  monkeytype: {
    name: 'MonkeyType',
    colors: {
      background: '#323437',
      text: '#d1d0c5',
      primary: '#e2b714',
      secondary: '#646669',
      accent: '#ca4754',
      error: '#ca4754',
      success: '#4ac087',
    },
  },
  matrix: {
    name: 'Matrix',
    colors: {
      background: '#0d0208',
      text: '#00ff41',
      primary: '#00ff41',
      secondary: '#008f11',
      accent: '#003b00',
      error: '#ff0000',
      success: '#00ff41',
    },
  },
};

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.monkeytype);

  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(themes[savedTheme]);
    }

    // Apply theme to document
    applyTheme(currentTheme);
  }, []);

  useEffect(() => {
    // Apply theme whenever it changes
    applyTheme(currentTheme);
    // Save to localStorage
    localStorage.setItem('theme', currentTheme.name.toLowerCase());
  }, [currentTheme]);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  const setTheme = (themeName: string) => {
    if (themes[themeName.toLowerCase()]) {
      setCurrentTheme(themes[themeName.toLowerCase()]);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes: Object.keys(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};