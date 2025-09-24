import { notFound } from "next/navigation";
import TypingTest from "@/components/typing/TypingTest";
import { getRandomText } from "@/lib/typingUtils";

interface TypingTestPageProps {
  params: {
    language: string;
  };
}

export default function TypingTestPage({ params }: TypingTestPageProps) {
  // Validate language parameter
  if (params.language !== "english" && params.language !== "bangla") {
    notFound();
  }

  const language = params.language as "english" | "bangla";
  const text = getRandomText(language);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <TypingTest text={text} language={language} />
      </div>
    </div>
  );
}

// Generate static params for supported languages
export function generateStaticParams() {
  return [
    { language: "english" },
    { language: "bangla" },
  ];
}