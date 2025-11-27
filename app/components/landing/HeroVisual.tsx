"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="relative"
    >
      {/* Main container */}
      <div className="relative w-[320px] sm:w-[420px] md:w-[520px] lg:w-[560px] xl:w-[620px] rounded-3xl border border-slate-200 bg-white/90 shadow-[0_22px_70px_rgba(15,23,42,0.18)] overflow-hidden backdrop-blur-xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="h-6 flex-1 mx-3 rounded-lg bg-white border border-slate-200 px-3 text-[10px] flex items-center text-slate-400 shadow-inner">
            globebrief.com/dashboard/generate/newsletter
          </div>

          <span className="text-[10px] text-indigo-500 font-semibold">
            LIVE
          </span>
        </div>

        {/* IMAGE AREA */}
        <div className="relative h-[240px] sm:h-[270px] md:h-[310px] lg:h-[330px] bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="flex items-center">
            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(99,102,241,0.25)]"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-400/20 via-purple-400/10 to-pink-300/20 blur-2xl opacity-70" />
              <Image
                src="/AIResponse.svg"
                alt="AI Response"
                height={225}
                width={225}
                className="object-cover"
              />
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(99,102,241,0.25)]"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-400/20 via-purple-400/10 to-pink-300/20 opacity-70" />
              <Image
                src="/Article.svg"
                alt="Article"
                height={350}
                width={350}
                className="object-cover py-2"
              />
            </motion.div>
          </div>

          {/* FLOATING STATS */}
          <div className="absolute bottom-2 left-12 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between opacity-70">
            {/* Left stat */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="rounded-2xl bg-white/95 border border-slate-200 p-2 shadow-lg"
            >
              <p className="mt-1 text-xs font-semibold text-slate-900">
                3 new RSS Feed selected
              </p>
              <p className="mt-1 text-xs text-emerald-600">
                +42% higher click-through rate
              </p>
            </motion.div>

            {/* Right stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px] shadow-lg font-semibold">
                Next send will be:
                <div className="mt-1">
                  <span className="font-semibold">✅ Friday · 10:30 AM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom shadow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mt-4 h-1 w-40 mx-auto rounded-full bg-slate-300/70 blur-sm"
      />
    </motion.div>
  );
}
