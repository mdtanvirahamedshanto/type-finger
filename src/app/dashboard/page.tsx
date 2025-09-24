import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentTests from "@/components/dashboard/RecentTests";
import LanguagePerformance from "@/components/dashboard/LanguagePerformance";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import TestResult from "@/models/TestResult";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/auth/signin");
  }
  
  await dbConnect();
  
  // Fetch user data
  const user = await User.findById(session.user.id);
  
  // Fetch recent test results
  const recentTests = await TestResult.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(5);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats 
            averageWPM={user?.typingStats?.averageWPM || 0} 
            highestWPM={user?.typingStats?.highestWPM || 0} 
            totalTests={user?.typingStats?.totalTests || 0} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Language Performance</h2>
            <LanguagePerformance 
              englishStats={user?.typingStats?.languages?.english || {
                averageWPM: 0,
                highestWPM: 0,
                totalTests: 0,
              }}
              banglaStats={user?.typingStats?.languages?.bangla || {
                averageWPM: 0,
                highestWPM: 0,
                totalTests: 0,
              }}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Tests</h2>
            <RecentTests tests={JSON.parse(JSON.stringify(recentTests))} />
          </div>
        </div>
      </div>
    </div>
  );
}