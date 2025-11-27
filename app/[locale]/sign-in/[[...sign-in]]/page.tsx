"use client";

import { SignIn } from "@clerk/nextjs";
import { Vortex } from "@/components/ui/vortex";

export default function Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Vortex
        className="absolute inset-0 flex flex-col items-center justify-start text-center"
      >
        <h2 className="text-white text-3xl md:text-6xl font-bold drop-shadow-lg mt-5">
          Welcome Back
        </h2>

        <p className="text-white/70 text-sm md:text-xl mt-4 max-w-xl drop-shadow-md">
          Sign in to access your personalized AI-powered global news digest,
          track your feeds, and manage your subscriptions.
        </p>
      </Vortex>

      <div className="opacity-90 absolute inset-0 flex items-center justify-center mt-10 z-10">
        <SignIn />
      </div>
    </div>
  );
}
