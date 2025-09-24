import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import TestResult from "@/models/TestResult";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to save results" },
        { status: 401 }
      );
    }

    const { language, wpm, accuracy, duration, errors } = await req.json();
    
    await dbConnect();
    
    // Create a dummy text ID for now (in production, this would be a real text ID)
    const dummyTextId = new mongoose.Types.ObjectId();
    
    // Save the test result
    const testResult = await TestResult.create({
      userId: session.user.id,
      language,
      wpm,
      accuracy,
      textId: dummyTextId,
      duration,
      errors,
    });
    
    // Update user's typing stats
    const user = await User.findById(session.user.id);
    
    if (user) {
      // Update overall stats
      const totalTests = user.typingStats.totalTests + 1;
      const totalWPM = user.typingStats.averageWPM * user.typingStats.totalTests + wpm;
      const newAverageWPM = totalWPM / totalTests;
      const newHighestWPM = Math.max(user.typingStats.highestWPM, wpm);
      
      // Update language-specific stats
      const langStats = user.typingStats.languages[language];
      const langTotalTests = langStats.totalTests + 1;
      const langTotalWPM = langStats.averageWPM * langStats.totalTests + wpm;
      const langNewAverageWPM = langTotalWPM / langTotalTests;
      const langNewHighestWPM = Math.max(langStats.highestWPM, wpm);
      
      // Update user document
      await User.findByIdAndUpdate(session.user.id, {
        $set: {
          "typingStats.totalTests": totalTests,
          "typingStats.averageWPM": newAverageWPM,
          "typingStats.highestWPM": newHighestWPM,
          [`typingStats.languages.${language}.totalTests`]: langTotalTests,
          [`typingStats.languages.${language}.averageWPM`]: langNewAverageWPM,
          [`typingStats.languages.${language}.highestWPM`]: langNewHighestWPM,
        },
      });
    }
    
    return NextResponse.json({ success: true, testResult });
  } catch (error) {
    console.error("Error saving test result:", error);
    return NextResponse.json(
      { error: "Failed to save test result" },
      { status: 500 }
    );
  }
}