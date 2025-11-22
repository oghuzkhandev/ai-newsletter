import FeaturesSection from "./components/landing/Features";
import Hero from "./components/landing/Hero";
import { SignedIn, UserButton } from "@clerk/nextjs";
import HowItWorksSection from "./components/landing/HowItWorks";
import Pricing from "./components/landing/Pricing";

export default function page() {
  return (
    <main className="h-screen dark:bg-black">
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <SignedIn>
        <div className="fixed top-4 right-4">
          <UserButton />
        </div>
      </SignedIn>
      <Pricing />
    </main>
  );
}
