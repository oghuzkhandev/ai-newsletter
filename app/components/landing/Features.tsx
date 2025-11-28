"use client";

import { cn } from "@/lib/utils";
import {
  Sparkles,
  Target,
  Palette,
  Timer,
  BarChart3,
  Rss,
  Mail,
  BookCopy,
  MailCheck,
  Send,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations("features");

  const items = getItems(t);

  return (
    <section
      className="relative py-32 bg-stone-50 overflow-hidden"
      id="features"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px]" />
      </div>

      {/* Dots */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-linear(circle at 1px 1px, rgb(168 162 158) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center mb-10 gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 shadow-md shadow-orange-500">
              <Star className="w-6 h-6" />
              <span className="text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                {t("badge")}
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-medium tracking-tight text-stone-800 mb-6 max-w-3xl mx-auto leading-tight"
          >
            {t("title1")}
            <span className="block text-rose-500 mt-1">{t("title2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Grid */}
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
              <div className="h-48 relative overflow-hidden">{item.header}</div>

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

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-rose-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-stone-400">{t("ctaHint")}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------- ITEMS ---------------------------- */

function getItems(t: any) {
  return [
    {
      title: t("items.ai.title"),
      description: t("items.ai.description"),
      header: <SkeletonAI />,
      className: "md:col-span-2",
      icon: <Sparkles className="h-4 w-4 text-rose-500" />,
      iconBg: "bg-rose-50",
    },
    {
      title: t("items.curation.title"),
      description: t("items.curation.description"),
      header: (
        <img
          src="/Intelligence.svg"
          className="max-h-[200px] p-3 w-full object-contain"
        />
      ),
      className: "md:col-span-1",
      icon: <BookCopy className="h-4 w-4 text-emerald-500" />,
      iconBg: "bg-emerald-50",
    },
    {
      title: t("items.design.title"),
      description: t("items.design.description"),
      header: <SkeletonDesign />,
      className: "md:col-span-1",
      icon: <Palette className="h-4 w-4 text-rose-400" />,
      iconBg: "bg-rose-50",
    },
    {
      title: t("items.timer.title"),
      description: t("items.timer.description"),
      header: (
        <img
          src="/SetTime.svg"
          className="max-h-[200px] p-2 w-full object-contain"
        />
      ),
      className: "md:col-span-1",
      icon: <Timer className="h-4 w-4 text-amber-500" />,
      iconBg: "bg-amber-50",
    },
    {
      title: t("items.analytics.title"),
      description: t("items.analytics.description"),
      header: (
        <img
          src="/Analytics.svg"
          className="max-h-[200px] p-2 w-full object-contain"
        />
      ),
      className: "md:col-span-1",
      icon: <BarChart3 className="h-4 w-4 text-sky-500" />,
      iconBg: "bg-sky-50",
    },
    {
      title: t("items.send.title"),
      description: t("items.send.description"),
      header: <SkeletonSend />,
      className: "md:col-span-3",
      icon: <Send className="h-4 w-4 text-violet-500" />,
      iconBg: "bg-violet-50",
    },
  ];
}

/* ---------------------------- SKELETON COMPONENTS ---------------------------- */

const SkeletonAI = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-linear-to-br from-stone-50 to-rose-50 p-8 relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-linear(to right, rgb(214 211 209) 1px, transparent 1px),
                           linear-linear(to bottom, rgb(214 211 209) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="flex items-center justify-center w-full relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32"
        ></motion.div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img
            src="/Newsletter.svg"
            className="max-h-[180px] p-3 w-full object-contain"
          />
        </motion.div>

        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-rose-200 blur-xl opacity-40" />
      </div>

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

const SkeletonCuration = () => {
  const items = [
    { width: "85%", delay: 0 },
    { width: "70%", delay: 0.15 },
    { width: "90%", delay: 0.3 },
  ];

  return (
    <div className="flex flex-col justify-center w-full h-full bg-linear-to-br from-stone-50 to-amber-50/50 p-8 relative">
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

const SkeletonDesign = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-linear-to-br from-rose-50/50 to-stone-50 p-6 relative items-center justify-center">
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

const SkeletonSend = () => {
  return (
    <div className="flex flex-1 w-full h-full bg-linear-to-br from-violet-50/50 to-stone-50 p-8 relative overflow-hidden items-center justify-center">
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
          <MailCheck className="w-6 h-6 text-violet-500" />
        </div>
      </motion.div>

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

      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-stone-200" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-200 ring-4 ring-violet-100" />
    </div>
  );
};
