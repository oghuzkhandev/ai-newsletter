"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Clock,
  ChevronRight,
  Play,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroVisual from "./HeroVisual";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-50">
      {/* Sophisticated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-[80px]" />

        {/* Refined grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(214 211 209) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(214 211 209) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    New
                  </span>
                </span>
                <span className="w-px h-4 bg-stone-200" />
                <span className="text-sm text-stone-600">
                  100+ curated RSS sources
                </span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-stone-800 leading-[1.1] mb-6"
            >
              Your AI-powered
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
                newsletter engine
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-stone-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Build editorial-quality newsletters in minutes. Pick RSS feeds,
              let AI summarize, and schedule daily sends—all personalized to
              your voice.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <FeaturePill icon={Sparkles} text="AI Summarization" />
              <FeaturePill icon={Clock} text="Auto-scheduling" />
              <FeaturePill icon={Zap} text="Instant delivery" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full py-3">
                    <p>Start for Free</p>
                    <ArrowRight className="w-4 h-4 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex items-center gap-6 justify-center lg:justify-start"
            >
              {/* Avatar Stack */}
              <div className="flex -space-x-3">
                {[
                  "from-rose-300 to-rose-400",
                  "from-amber-300 to-amber-400",
                  "from-emerald-300 to-emerald-400",
                  "from-sky-300 to-sky-400",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}

                <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-white shadow-sm flex items-center justify-center text-stone-600 text-xs font-semibold">
                  +2k
                </div>
              </div>

              {/* Trustpilot Rating */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  {/* Stars */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#00B67A] fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Excellent */}
                  <span className="text-sm font-semibold text-stone-800">
                    Excellent
                  </span>

                  {/* Rating badge */}
                  <span className="text-xs font-semibold px-2 py-0.5 bg-[#00B67A] text-white rounded">
                    ★ 4.9
                  </span>
                </div>

                <p className="text-sm text-stone-500 leading-tight">
                  Rated by{" "}
                  <span className="font-semibold text-stone-800">2,000+</span>{" "}
                  verified creators
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/60 rounded-2xl ">
              <HeroVisual />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------- Feature Pill Component -------- */
function FeaturePill({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 text-sm text-stone-600 shadow-sm">
      <Icon className="w-4 h-4 text-rose-500" />
      {text}
    </span>
  );
}
