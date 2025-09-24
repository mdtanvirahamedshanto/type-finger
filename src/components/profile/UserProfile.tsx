"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeProvider";

type UserStats = {
  testsStarted: number;
  testsCompleted: number;
  timeTyping: string;
  highestWpm: number;
  averageWpm: number;
  averageWpmLast10: number;
  highestRawWpm: number;
  averageRawWpm: number;
  averageRawWpmLast10: number;
  highestAccuracy: number;
  avgAccuracy: number;
  avgAccuracyLast10: number;
  highestConsistency: number;
  avgConsistency: number;
  avgConsistencyLast10: number;
  estimatedWordsTyped: number;
};

export default function UserProfile() {
  const { data: session } = useSession();
  const { currentTheme } = useTheme();
  const [userStats, setUserStats] = useState<UserStats>({
    testsStarted: 54,
    testsCompleted: 42,
    timeTyping: "00:37:53",
    highestWpm: 54,
    averageWpm: 39,
    averageWpmLast10: 46,
    highestRawWpm: 56,
    averageRawWpm: 42,
    averageRawWpmLast10: 47,
    highestAccuracy: 97,
    avgAccuracy: 91,
    avgAccuracyLast10: 92,
    highestConsistency: 76,
    avgConsistency: 62,
    avgConsistencyLast10: 63,
    estimatedWordsTyped: 1424,
  });

  // In a real app, we would fetch this data from the API
  // useEffect(() => {
  //   const fetchUserStats = async () => {
  //     const response = await fetch("/api/user/stats");
  //     const data = await response.json();
  //     setUserStats(data);
  //   };
  //   fetchUserStats();
  // }, []);

  return (
    <div className="user-profile">
      {/* User header with avatar and basic info */}
      <div className="flex items-center gap-4 p-4 mb-6 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
        <div className="avatar w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-3xl text-gray-300">
            {session?.user?.name?.charAt(0) || "T"}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-mono">{session?.user?.name || "tashanto"}</h2>
          <p className="text-sm opacity-70">Joined 08 Nov 2023</p>
          <div className="flex items-center mt-2">
            <div className="w-24 h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: "15%", 
                  backgroundColor: currentTheme.colors.primary 
                }}
              ></div>
            </div>
            <span className="ml-2 text-sm">15</span>
          </div>
          <p className="text-xs opacity-70 mt-1">520/786</p>
        </div>
        <div className="ml-auto">
          <button className="p-2 rounded hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Basic stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">tests started</div>
          <div className="text-4xl">{userStats.testsStarted}</div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">tests completed</div>
          <div className="text-4xl">{userStats.testsCompleted}</div>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
          <div className="text-sm opacity-70">time typing</div>
          <div className="text-4xl">{userStats.timeTyping}</div>
        </div>
      </div>

      {/* Estimated words typed */}
      <div className="text-center mb-8">
        <div className="text-sm opacity-70">estimated words typed</div>
        <div className="text-5xl">{userStats.estimatedWordsTyped}</div>
      </div>
    </div>
  );
}