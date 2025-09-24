"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface Provider {
  id: string;
  name: string;
}

interface SignInFormProps {
  providers: Record<string, Provider> | null;
}

export default function SignInForm({ providers }: SignInFormProps) {
  return (
    <div className="mt-8 space-y-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className={`w-full flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white ${
                provider.id === "google"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {provider.id === "google" ? (
                <FaGoogle className="mr-2" />
              ) : (
                <FaGithub className="mr-2" />
              )}
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}