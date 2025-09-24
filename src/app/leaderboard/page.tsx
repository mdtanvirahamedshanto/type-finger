"use client";

import Leaderboard from "@/components/leaderboard/Leaderboard";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function LeaderboardPage() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <Leaderboard />
      </div>
    </div>
  );
}