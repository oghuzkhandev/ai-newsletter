import FeaturesSection from "../components/landing/Features";
import Hero from "../components/landing/Hero";
import { SignedIn, UserButton } from "@clerk/nextjs";
import HowItWorksSection from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import Header from "../components/landing/Header";
import GlobalNewsGlobe from "../components/landing/NewsGlobe";
import CategoriesShowcase from "../components/landing/CategoriesShowcase";
import Footer from "../components/landing/Footer";
import Testimonials from "../components/landing/Testimonials";

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
      <SignedIn>
        <div className="fixed top-4 right-4">
          <UserButton />
        </div>
      </SignedIn>
      <Pricing />
      <Footer />
    </main>
  );
}
