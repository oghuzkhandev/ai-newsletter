"use client";

import FeaturesSection from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import HowItWorksSection from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import Header from "../components/landing/Header";
import CategoriesShowcase from "../components/landing/CategoriesShowcase";
import Footer from "../components/landing/Footer";
import Testimonials from "../components/landing/Testimonials";
import { Spinner } from "../../components/ui/spinner";
import dynamic from "next/dynamic";

const GlobalNewsGlobe = dynamic(
  () => import("../components/landing/NewsGlobe"),
  {
    ssr: false,
    loading: () => <div className="text-white p-6">Loading globe...</div>,
  }
);

export default function Page() {
  return (
    <main className="h-screen dark:bg-black">
      <Header />
      <Hero />
      <CategoriesShowcase />
      <FeaturesSection />
      <HowItWorksSection />

      <GlobalNewsGlobe />

      <Testimonials />

      <ClerkLoading>
        <Spinner />
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <div className="fixed top-4 right-4">
            <UserButton />
          </div>
        </SignedIn>
      </ClerkLoaded>

      <Pricing />
      <Footer />
    </main>
  );
}
