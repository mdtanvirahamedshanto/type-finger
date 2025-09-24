"use client";

import UserProfile from "@/components/profile/UserProfile";
import TestHistoryStats from "@/components/profile/TestHistoryStats";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import DetailedStats from "@/components/profile/DetailedStats";
import DataExport from "@/components/profile/DataExport";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function ProfilePage() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="profile-page max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-mono mb-8">Profile</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <UserProfile />
        <TestHistoryStats />
        <ActivityHeatmap />
        <DetailedStats />
        <DataExport />
      </div>
    </div>
  );
}