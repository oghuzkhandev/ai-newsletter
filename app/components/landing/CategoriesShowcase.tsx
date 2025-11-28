"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Cpu,
  Newspaper,
  Trophy,
  LineChart,
  Heart,
  GraduationCap,
  Gamepad2,
  Plane,
  ChevronRight,
  BookOpenCheck,
  Handbag,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function CategoriesShowcase() {
  const t = useTranslations("categories");

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-black dark:via-slate-950/50 dark:to-black overflow-hidden">
      {/* Hafif grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 shadow-md shadow-orange-500">
            <BookOpenCheck className="w-6 h-6" />
            <span className="text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-5xl mx-auto px-4 text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-slate-900 dark:text-white">
              {t("title.line1")}
            </span>{" "}
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
              {t("title.line2")}
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-3xl mx-auto px-4 text-center mb-10"
        >
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium">
            {t("subtitle")}
          </p>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-500">
            {t("description")}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-2xl mx-auto px-4 text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-900/50 dark:to-slate-800/50 border border-blue-200/50 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("cta.text")}
            </p>
            <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="h-[30rem] flex items-center justify-center font-semibold text-slate-50"
        >
          <InfiniteMovingCards
            items={getCategories(t)}
            direction="right"
            speed="normal"
          />
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-gradient-cards .moving-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </section>
  );
}

const iconClass = "h-5 w-5 text-white/90";

function getCategories(t: any) {
  return [
    {
      id: "technology",
      icon: <Cpu className={iconClass} />,
      title: t("technology.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Technology.png"
            className="w-full h-full object-fill"
            alt="technology"
          />
        </div>
      ),
      source: t("technology.source"),
      quote: t("technology.quote"),
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      id: "fashion",
      icon: <Handbag className={iconClass} />,
      title: t("fashion.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Fashion.png"
            className="w-full h-full object-fill"
            alt="fashion"
          />
        </div>
      ),
      source: t("fashion.source"),
      quote: t("fashion.quote"),
      gradient: "from-amber-600 to-orange-600",
    },
    {
      id: "health",
      icon: <Heart className={iconClass} />,
      title: t("health.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Health.png"
            className="w-full h-full object-fill"
            alt="health"
          />
        </div>
      ),
      source: t("health.source"),
      quote: t("health.quote"),
      gradient: "from-red-600 to-rose-600",
    },
    {
      id: "world",
      icon: <Newspaper className={iconClass} />,
      title: t("world.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/WorldNews.png"
            className="w-full h-full object-fill"
            alt="world"
          />
        </div>
      ),
      source: t("world.source"),
      quote: t("world.quote"),
      gradient: "from-slate-600 to-zinc-600",
    },
    {
      id: "finance",
      icon: <LineChart className={iconClass} />,
      title: t("finance.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Finance.png"
            className="w-full h-full object-fill"
            alt="finance"
          />
        </div>
      ),
      source: t("finance.source"),
      quote: t("finance.quote"),
      gradient: "from-green-600 to-emerald-600",
    },
    {
      id: "education",
      icon: <GraduationCap className={iconClass} />,
      title: t("education.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Education.png"
            className="w-full h-full object-fill"
            alt="education"
          />
        </div>
      ),
      source: t("education.source"),
      quote: t("education.quote"),
      gradient: "from-blue-600 to-sky-600",
    },
    {
      id: "entertainment",
      icon: <Gamepad2 className={iconClass} />,
      title: t("entertainment.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Entertainment.png"
            className="w-full h-full object-fill"
            alt="entertainment"
          />
        </div>
      ),
      source: t("entertainment.source"),
      quote: t("entertainment.quote"),
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      id: "sports",
      icon: <Trophy className={iconClass} />,
      title: t("sports.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Sports.png"
            className="w-full h-full object-fill"
            alt="sports"
          />
        </div>
      ),
      source: t("sports.source"),
      quote: t("sports.quote"),
      gradient: "from-orange-600 to-red-600",
    },
    {
      id: "science",
      icon: <FlaskConical className={iconClass} />,
      title: t("science.title"),
      image: (
        <div className="relative w-full h-full">
          <img
            src="/Science.png"
            className="w-full h-full object-fill"
            alt="science"
          />
        </div>
      ),
      source: t("science.source"),
      quote: t("science.quote"),
      gradient: "from-teal-600 to-cyan-600",
    },
  ];
}
