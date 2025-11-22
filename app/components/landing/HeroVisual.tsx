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
      <div className="relative w-[320px] sm:w-[420px] md:w-[520px] lg:w-[560px] xl:w-[620px] rounded-3xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.18)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="h-6 flex-1 mx-3 rounded-lg bg-white border border-slate-200 px-3 text-[10px] flex items-center text-slate-400 overflow-hidden">
            ai-newsletter.io/dashboard
          </div>
          <span className="text-[10px] text-slate-400">LIVE</span>
        </div>

        <div className="relative h-[230px] sm:h-[260px] md:h-[300px] lg:h-[320px] bg-slate-100">
          <Image
            src="/images/newsletter-dashboard-mockup.png"
            alt="AI Newsletter Dashboard Mockup"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="rounded-2xl bg-white/90 border border-slate-200 px-4 py-3 shadow-md backdrop-blur"
            >
              <p className="text-xs text-slate-500">Smart curation</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                12 new articles selected
              </p>
              <p className="mt-1 text-[11px] text-emerald-600">
                +42% higher click-through rate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px] text-emerald-800 shadow-sm">
                Latest campaign sent ✅
                <div className="mt-1 flex items-center justify-between text-[10px] text-emerald-700/80">
                  <span>6,482 recipients</span>
                  <span>41% open rate</span>
                </div>
              </div>

              <div className="rounded-xl bg-white/95 border border-slate-200 px-3 py-2 text-[11px] text-slate-800 shadow-sm">
                Next send:
                <span className="ml-1 text-indigo-600 font-medium">
                  Friday · 10:30 AM
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mt-4 h-1 w-40 mx-auto rounded-full bg-slate-300/70 blur-sm"
      />
    </motion.div>
  );
}
