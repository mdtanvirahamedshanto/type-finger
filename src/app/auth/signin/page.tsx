import { getProviders } from "next-auth/react";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">TypeFinger</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to track your typing progress
          </p>
        </div>
        <SignInForm providers={providers} />
      </div>
    </div>
  );
}