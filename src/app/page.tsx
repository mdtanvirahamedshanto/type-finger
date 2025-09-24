import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">TypeFinger</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Improve your typing speed and accuracy with our interactive typing tests.
            Support for both English and Bangla languages.
          </p>
          
          {!session ? (
            <div className="mt-8">
              <Link 
                href="/auth/signin" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In to Track Progress
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              <Link 
                href="/dashboard" 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mr-4"
              >
                View Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">English Typing Test</h2>
            <p className="text-gray-600 mb-6">
              Practice your typing skills in English with our collection of texts.
              Measure your WPM and accuracy.
            </p>
            <Link 
              href="/test/english" 
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start English Test
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">বাংলা টাইপিং টেস্ট</h2>
            <p className="text-gray-600 mb-6">
              বাংলা ভাষায় আপনার টাইপিং দক্ষতা অনুশীলন করুন। আপনার গতি এবং নির্ভুলতা পরিমাপ করুন।
            </p>
            <Link 
              href="/test/bangla" 
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              বাংলা টেস্ট শুরু করুন
            </Link>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Practice typing in both English and Bangla languages.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">Track your progress with comprehensive statistics and charts.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Offline Support</h3>
              <p className="text-gray-600">Practice typing even without an internet connection with our PWA.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
