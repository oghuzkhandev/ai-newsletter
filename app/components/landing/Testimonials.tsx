"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { MessageSquareHeart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("items");

  return (
    <section className="relative py-32 lg:py-40 bg-linear-to-b from-white via-slate-50/50 to-white dark:from-[#0A0A0F] dark:via-[#12121A] dark:to-[#0A0A0F] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-linear(to_right,#80808012_1px,transparent_1px),linear-linear(to_bottom,#80808012_1px,transparent_1px)] bg-size:32px_32px mask-image:radial-linear(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <div className="inline-flex mb-10 items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 shadow-md shadow-orange-500">
            <MessageSquareHeart className="w-6 h-6" />
            <span className="text-sm font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
            <span className="bg-linear-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-slate-50 dark:via-slate-200 dark:to-slate-50 bg-clip-text text-transparent">
              {t("titleLine1")}
            </span>
            <br />
            <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Micro tilt only */}
          <div className="transform-gpu transition-transform duration-700 hover:rotate-[0.6deg] hover:scale-[1.01]">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
