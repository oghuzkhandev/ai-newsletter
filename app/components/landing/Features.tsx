"use client";

import { cn } from "@/lib/utils";
import {
  Sparkles,
  Zap,
  Target,
  Palette,
  Timer,
  BarChart3,
  Rss,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="relative py-32 bg-stone-50 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px]" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(168 162 158) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Powerful Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-medium tracking-tight text-stone-800 mb-6 max-w-3xl mx-auto leading-tight"
          >
            Transform RSS Feeds into
            <span className="block text-rose-500 mt-1">
              Beautiful Newsletters
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed"
          >
            RSS → AI → Summary → Send. Fully automated content curation powered
            by artificial intelligence.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative bg-white rounded-3xl border border-stone-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:border-stone-300",
                item.className
              )}
            >
              {/* Header visual */}
              <div className="h-48 relative overflow-hidden">{item.header}</div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      item.iconBg
                    )}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-stone-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-stone-400">
            Join thousands of creators who save hours every week ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------- Premium Skeletons ---------------------------- */

/* 1 - AI Content Engine */
const SkeletonAI = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-gradient-to-br from-stone-50 to-rose-50 p-8 relative">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(214 211 209) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(214 211 209) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="m-auto relative">
        {/* Orbiting elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-300" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber-300" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-stone-300" />
        </motion.div>

        {/* Center icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-white shadow-lg shadow-rose-100 flex items-center justify-center relative z-10"
        >
          <Sparkles className="w-9 h-9 text-rose-500" />
        </motion.div>

        {/* Glow */}
        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-rose-200 blur-xl opacity-40" />
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-6 right-8 w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center"
      >
        <Rss className="w-4 h-4 text-stone-400" />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-6 left-8 w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center"
      >
        <Mail className="w-4 h-4 text-stone-400" />
      </motion.div>
    </div>
  );
};

/* 2 - Smart Curation */
const SkeletonCuration = () => {
  const items = [
    { width: "85%", delay: 0 },
    { width: "70%", delay: 0.15 },
    { width: "90%", delay: 0.3 },
  ];

  return (
    <div className="flex flex-col justify-center w-full h-full bg-gradient-to-br from-stone-50 to-amber-50/50 p-8 relative">
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: item.delay,
              duration: 0.4,
            }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: item.delay + 1, duration: 0.3 }}
              className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </motion.div>
            <div
              className="h-3 rounded-full bg-stone-200"
              style={{ width: item.width }}
            />
          </motion.div>
        ))}
      </div>

      {/* Target indicator */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center"
      >
        <Target className="w-5 h-5 text-emerald-500" />
      </motion.div>
    </div>
  );
};

/* 3 - Design Templates */
const SkeletonDesign = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-gradient-to-br from-rose-50/50 to-stone-50 p-6 relative items-center justify-center">
      {/* Stacked cards */}
      <div className="relative w-36 h-44">
        <motion.div
          animate={{ rotate: [-3, -3], y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-amber-100 rounded-xl shadow-sm transform -rotate-3"
        />
        <motion.div
          animate={{ rotate: [2, 2], y: [0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 bg-rose-100 rounded-xl shadow-sm transform rotate-2 translate-x-1"
        />
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-4">
          <div className="w-8 h-8 rounded-lg bg-stone-100 mb-3 flex items-center justify-center">
            <Palette className="w-4 h-4 text-rose-400" />
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-stone-100 rounded-full w-full" />
            <div className="h-2 bg-stone-100 rounded-full w-3/4" />
            <div className="h-2 bg-stone-100 rounded-full w-5/6" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 h-6 bg-rose-100 rounded-md" />
        </div>
      </div>
    </div>
  );
};

/* 4 - Automation / Timer */
const SkeletonAutomation = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-gradient-to-br from-amber-50/50 to-stone-50 p-8 relative items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-28 h-28 rounded-full border-2 border-dashed border-amber-200"
        />

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 rounded-full border-2 border-stone-200"
        />

        {/* Center */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-6 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <Timer className="w-6 h-6 text-amber-500" />
        </motion.div>

        {/* Tick marks */}
        {[0, 90, 180, 270].map((deg, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateY(-56px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* 5 - Analytics Dashboard */
const SkeletonAnalytics = () => {
  const bars = [35, 55, 40, 70, 50, 65, 45];

  return (
    <div className="flex flex-1 w-full h-full bg-gradient-to-br from-sky-50/50 to-stone-50 p-6 relative">
      {/* Chart */}
      <div className="flex items-end gap-1.5 w-full h-full pt-8">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${height}%` }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 bg-sky-200 rounded-t-md hover:bg-sky-300 transition-colors cursor-pointer"
          />
        ))}
      </div>

      {/* Stats badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        viewport={{ once: true }}
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200"
      >
        <span className="text-xs font-semibold text-emerald-600">+24%</span>
      </motion.div>

      {/* Y-axis hint */}
      <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between text-[10px] text-stone-300">
        <span>100</span>
        <span>50</span>
        <span>0</span>
      </div>
    </div>
  );
};

/* 6 - Instant Send */
const SkeletonSend = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-gradient-to-br from-violet-50/50 to-stone-50 p-8 relative overflow-hidden items-center justify-center">
      {/* Paper plane animation */}
      <motion.div
        animate={{
          x: [-120, 200],
          y: [20, -20],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-violet-500" />
        </div>
      </motion.div>

      {/* Trail dots */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            x: [-120 + i * 30, 200 + i * 30],
            y: [20 - i * 5, -20 - i * 5],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.5,
            delay: i * 0.1,
          }}
          className="absolute w-2 h-2 rounded-full bg-violet-300"
        />
      ))}

      {/* Endpoint indicators */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-stone-200" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-200 ring-4 ring-violet-100" />
    </div>
  );
};

/* ---------------------------- Items Configuration ---------------------------- */

const items = [
  {
    title: "AI Summaries Engine",
    description:
      "Intelligent content summarization with smart categorization. Maintains accuracy while adapting to your preferred tone.",
    header: <SkeletonAI />,
    className: "md:col-span-2",
    icon: <Sparkles className="h-4 w-4 text-rose-500" />,
    iconBg: "bg-rose-50",
  },
  {
    title: "Smart Curation",
    description:
      "Automatic duplicate merging and relevance scoring for clean content.",
    header: <SkeletonCuration />,
    className: "md:col-span-1",
    icon: <Target className="h-4 w-4 text-emerald-500" />,
    iconBg: "bg-emerald-50",
  },
  {
    title: "Beautiful Templates",
    description: "Professional designs that adapt to your brand identity.",
    header: <SkeletonDesign />,
    className: "md:col-span-1",
    icon: <Palette className="h-4 w-4 text-rose-400" />,
    iconBg: "bg-rose-50",
  },
  {
    title: "Set & Forget",
    description: "Schedule once, deliver consistently on autopilot.",
    header: <img src="/SetTime.svg" alt="timer" className="max-h-[200px] p-2 w-full object-contain" />,
    className: "md:col-span-1",
    icon: <Timer className="h-4 w-4 text-amber-500" />,
    iconBg: "bg-amber-50",
  },
  {
    title: "Analytics Dashboard",
    description: "Track open rates, engagement, and trends in real-time.",
    header: <img src="/Analytics.svg" alt="timer" className="max-h-[200px] p-2 w-full object-contain" />,
    className: "md:col-span-1",
    icon: <BarChart3 className="h-4 w-4 text-sky-500" />,
    iconBg: "bg-sky-50",
  },
  {
    title: "Instant Distribution",
    description:
      "One-click delivery to thousands of subscribers. Lightning fast, always reliable.",
    header: <SkeletonSend />,
    className: "md:col-span-3",
    icon: <Zap className="h-4 w-4 text-violet-500" />,
    iconBg: "bg-violet-50",
  },
];
