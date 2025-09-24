"use client";

import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import LeaderboardEntry from "./LeaderboardEntry";

type LeaderboardType = "daily" | "weekly" | "all-time";
type TimeMode = "15" | "60";
type Language = "english" | "french" | "german" | "spanish" | "italian" | "portuguese" | "indonesian";

interface LeaderboardProps {
  initialType?: LeaderboardType;
  initialTimeMode?: TimeMode;
  initialLanguage?: Language;
}

export default function Leaderboard({
  initialType = "daily",
  initialTimeMode = "15",
  initialLanguage = "english"
}: LeaderboardProps) {
  const { currentTheme } = useTheme();
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>(initialType);
  const [timeMode, setTimeMode] = useState<TimeMode>(initialTimeMode);
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  // Mock data for demonstration
  const mockLeaderboardData = {
    daily: [
      { name: "aidan-lao", wpm: 240.77, accuracy: 96.54, raw: 254.37, consistency: 91.35, lastActivity: "24 Sep 2025 08:03" },
      { name: "Shizuko", wpm: 226.39, accuracy: 96.98, raw: 238.39, consistency: 82.87, lastActivity: "24 Sep 2025 07:58", badge: "White Hat" },
      { name: "Aperson998", wpm: 226.37, accuracy: 92.79, raw: 265.56, consistency: 83.45, lastActivity: "24 Sep 2025 10:33" },
      { name: "Hannnna", wpm: 225.58, accuracy: 96.07, raw: 243.98, consistency: 88.13, lastActivity: "24 Sep 2025 08:39" },
      { name: "TheLavatrex", wpm: 224.53, accuracy: 94.52, raw: 242.91, consistency: 84.84, lastActivity: "24 Sep 2025 06:18" },
      { name: "ThePrfectEraser2", wpm: 213.42, accuracy: 95.24, raw: 235.00, consistency: 92.36, lastActivity: "24 Sep 2025 08:00" },
      { name: "Refac", wpm: 211.19, accuracy: 96.79, raw: 221.59, consistency: 78.96, lastActivity: "24 Sep 2025 07:24" },
    ],
    weekly: [
      { name: "moros", wpm: 425.6, time: "18:11:04", gained: "425.6k", lastActivity: "23 Sep 2025 14:37" },
      { name: "MrC.GR", wpm: 191.8, time: "09:12:58", gained: "191.8k", lastActivity: "24 Sep 2025 03:19" },
      { name: "gidesc", wpm: 106.7, time: "06:55:44", gained: "106.7k", lastActivity: "24 Sep 2025 10:29" },
      { name: "endemaster", wpm: 98.1, time: "07:54:57", gained: "98.1k", lastActivity: "24 Sep 2025 04:42" },
      { name: "xiaoyuan", wpm: 81.6, time: "05:54:33", gained: "81.6k", lastActivity: "24 Sep 2025 09:57" },
      { name: "prolay", wpm: 81.5, time: "03:15:23", gained: "81.5k", lastActivity: "24 Sep 2025 04:16" },
      { name: "qwertysage", wpm: 81.5, time: "06:42:55", gained: "81.5k", lastActivity: "24 Sep 2025 00:44" },
    ],
    allTime: [
      { name: "joshua728", wpm: 314.39, accuracy: 99.25, raw: 319.19, consistency: 92.02, lastActivity: "21 Aug 2025 06:03" },
      { name: "przewodowy", wpm: 305.58, accuracy: 96.82, raw: 327.18, consistency: 95.67, lastActivity: "03 Jul 2025 05:23" },
      { name: "rocket", wpm: 304.76, accuracy: 98.97, raw: 311.96, consistency: 92.70, lastActivity: "27 Aug 2023 17:24", badge: "Mythical" },
      { name: "fallenrelic", wpm: 304.74, accuracy: 100.00, raw: 304.74, consistency: 91.40, lastActivity: "25 Dec 2024 16:28" },
      { name: "saerith", wpm: 304.60, accuracy: 98.48, raw: 315.79, consistency: 90.53, lastActivity: "25 Jun 2023 18:20" },
      { name: "sahib_lime", wpm: 293.30, accuracy: 99.73, raw: 297.30, consistency: 93.22, lastActivity: "12 Aug 2025 16:02" },
      { name: "APackOfSmarties", wpm: 285.55, accuracy: 100.00, raw: 285.55, consistency: 94.64, lastActivity: "19 Dec 2024 12:44" },
    ]
  };
  
  const getLeaderboardData = () => {
    if (leaderboardType === "weekly") {
      return mockLeaderboardData.weekly;
    } else if (leaderboardType === "daily") {
      return mockLeaderboardData.daily;
    } else {
      return mockLeaderboardData.allTime;
    }
  };
  
  const getLeaderboardTitle = () => {
    const typeText = leaderboardType === "all-time" ? "All-time" : leaderboardType.charAt(0).toUpperCase() + leaderboardType.slice(1);
    return `${typeText} ${language.charAt(0).toUpperCase() + language.slice(1)} Time ${timeMode} Leaderboard`;
  };
  
  const getLeaderboardDate = () => {
    const today = new Date();
    
    if (leaderboardType === "daily") {
      return `${today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} UTC`;
    } else if (leaderboardType === "weekly") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
      
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - today.getDay() + 7); // Sunday
      
      return `Monday, ${startOfWeek.getDate()}${getOrdinalSuffix(startOfWeek.getDate())} ${startOfWeek.toLocaleDateString('en-US', { month: 'long' })} ${startOfWeek.getFullYear()} - Sunday, ${endOfWeek.getDate()}${getOrdinalSuffix(endOfWeek.getDate())} ${endOfWeek.toLocaleDateString('en-US', { month: 'long' })} ${endOfWeek.getFullYear()} UTC`;
    }
    
    return "";
  };
  
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };
  
  const renderLeaderboardColumns = () => {
    if (leaderboardType === "weekly") {
      return (
        <tr className="text-sm opacity-70">
          <th className="py-2 px-2 text-left">#</th>
          <th className="py-2 px-2 text-left">name</th>
          <th className="py-2 px-2 text-right">gained</th>
          <th className="py-2 px-2 text-right">time typed</th>
          <th className="py-2 px-2 text-right">last activity</th>
        </tr>
      );
    } else {
      return (
        <tr className="text-sm opacity-70">
          <th className="py-2 px-2 text-left">#</th>
          <th className="py-2 px-2 text-left">name</th>
          <th className="py-2 px-2 text-right">wpm</th>
          <th className="py-2 px-2 text-right">accuracy</th>
          <th className="py-2 px-2 text-right">raw</th>
          <th className="py-2 px-2 text-right">consistency</th>
          <th className="py-2 px-2 text-right">date</th>
        </tr>
      );
    }
  };
  
  return (
    <div className="leaderboard-container">
      <div className="sidebar p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.background}80` }}>
        <div className="mb-6">
          <button 
            className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${leaderboardType === "all-time" && language === "english" ? "font-bold" : ""}`}
            style={{ 
              backgroundColor: leaderboardType === "all-time" && language === "english" 
                ? `${currentTheme.colors.primary}40` 
                : "transparent" 
            }}
            onClick={() => {
              setLeaderboardType("all-time");
              setLanguage("english");
            }}
          >
            <span className="mr-2">🌐</span>
            all-time english
          </button>
          
          <button 
            className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${leaderboardType === "weekly" ? "font-bold" : ""}`}
            style={{ 
              backgroundColor: leaderboardType === "weekly" 
                ? `${currentTheme.colors.primary}40` 
                : "transparent" 
            }}
            onClick={() => setLeaderboardType("weekly")}
          >
            <span className="mr-2">📅</span>
            weekly xp
          </button>
          
          <button 
            className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${leaderboardType === "daily" ? "font-bold" : ""}`}
            style={{ 
              backgroundColor: leaderboardType === "daily" 
                ? `${currentTheme.colors.primary}40` 
                : "transparent" 
            }}
            onClick={() => setLeaderboardType("daily")}
          >
            <span className="mr-2">📆</span>
            daily
          </button>
        </div>
        
        {leaderboardType !== "weekly" && (
          <div className="mb-6">
            <button 
              className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${timeMode === "15" ? "font-bold" : ""}`}
              style={{ 
                backgroundColor: timeMode === "15" 
                  ? `${currentTheme.colors.primary}40` 
                  : "transparent" 
              }}
              onClick={() => setTimeMode("15")}
            >
              <span className="mr-2">⏱️</span>
              time 15
            </button>
            
            <button 
              className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${timeMode === "60" ? "font-bold" : ""}`}
              style={{ 
                backgroundColor: timeMode === "60" 
                  ? `${currentTheme.colors.primary}40` 
                  : "transparent" 
              }}
              onClick={() => setTimeMode("60")}
            >
              <span className="mr-2">⏱️</span>
              time 60
            </button>
          </div>
        )}
        
        {leaderboardType !== "weekly" && (
          <div>
            {["english", "french", "german", "spanish", "italian", "portuguese", "indonesian"].map((lang) => (
              <button 
                key={lang}
                className={`w-full text-left p-2 rounded-md mb-2 flex items-center ${language === lang ? "font-bold" : ""}`}
                style={{ 
                  backgroundColor: language === lang 
                    ? `${currentTheme.colors.primary}40` 
                    : "transparent" 
                }}
                onClick={() => setLanguage(lang as Language)}
              >
                <span className="mr-2">🌐</span>
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="leaderboard-content ml-4 flex-1">
        <h1 className="text-2xl font-mono mb-2">{getLeaderboardTitle()}</h1>
        {leaderboardType !== "all-time" && <p className="text-sm opacity-70 mb-6">{getLeaderboardDate()}</p>}
        
        <div className="bg-opacity-20 rounded-lg p-4 mb-4" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <p className="text-center">Your account must have 2 hours typed to be placed on the leaderboard.</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-70">
            {leaderboardType === "daily" && "Next reset in: 18:44:09"}
            {leaderboardType === "weekly" && "Next reset in: 04:18:44:24"}
            {leaderboardType === "all-time" && "Next update in: 14:18"}
          </p>
          
          <div className="flex gap-2">
            <button className="p-2 opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </button>
            <button className="p-2 opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
            <button className="p-2 opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="p-2 opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
            <button className="p-2 opacity-70 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {renderLeaderboardColumns()}
            </thead>
            <tbody>
              {getLeaderboardData().map((entry, index) => (
                <LeaderboardEntry
                  key={index}
                  position={index + 1}
                  name={entry.name}
                  wpm={entry.wpm}
                  accuracy={'accuracy' in entry ? entry.accuracy : undefined}
                  raw={'raw' in entry ? entry.raw : undefined}
                  consistency={'consistency' in entry ? entry.consistency : undefined}
                  time={'time' in entry ? entry.time : undefined}
                  gained={'gained' in entry ? entry.gained : undefined}
                  lastActivity={entry.lastActivity}
                  badge={'badge' in entry ? entry.badge : undefined}
                  isCurrentUser={entry.name === "Shizuko"}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}