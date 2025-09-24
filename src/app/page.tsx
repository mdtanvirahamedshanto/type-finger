import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TypingTestPage from "@/components/typing/TypingTestPage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen">
      <TypingTestPage session={session} />
    </main>
  );
}
