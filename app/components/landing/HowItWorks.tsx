"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Globe2,
  BrainCircuit,
  LayoutTemplate,
  SendHorizonal,
  Plus,
  Tag,
  RefreshCw,
  Database,
  MousePointer,
  ThumbsDown,
  Zap,
  FileText,
  Palette,
  Type,
  Layers,
  PenTool,
  Clock,
  Mail,
  MessageSquare,
  BarChart3,
  CheckCircle,
  Activity,
  BookType,
} from "lucide-react";

function Bullet({
  children,
  color,
  icon,
}: {
  children: React.ReactNode;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className={`mt-0.5 p-1.5 rounded-lg ${color}/10 flex-shrink-0`}>
        <div className={`${color}`}>{icon}</div>
      </div>
      <p className="flex-1 leading-relaxed text-sm lg:text-base">{children}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  const t = useTranslations("howitworks");
  const [activeTab, setActiveTab] = useState("sources");

  const tabData = [
    {
      value: "sources",
      label: t("tabs.connect"),
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/20 via-blue-600/20 to-sky-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      value: "train",
      label: t("tabs.train"),
      color: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/20 via-teal-600/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
    },
    {
      value: "design",
      label: t("tabs.design"),
      color: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-500/20 via-amber-600/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      value: "send",
      label: t("tabs.automate"),
      color: "from-red-500 to-rose-600",
      bgGradient: "from-red-500/20 via-rose-600/20 to-pink-500/20",
      borderColor: "border-red-500/30",
    },
  ];

  const activeTabData = tabData.find((t) => t.value === activeTab);

  return (
    <section
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0A0B0F] dark:via-[#0F1015] dark:to-[#0A0B0F] py-24 sm:py-32 lg:py-40 overflow-hidden"
      id="howitworks"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-200/50 via-transparent to-transparent dark:from-slate-800/50 blur-3xl" />
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex"
          >
            <div className="relative group">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 shadow-md shadow-orange-500">
                <BookType className="w-6 h-6" />
                <span className="text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                  {t("badge")}
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="block text-slate-900 dark:text-white mb-2">
              {t("title.line1")}
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
              {t("title.line2")}
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t("subtitle")}
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-12"
        >
          <div className="relative">
            <TabsList className="relative grid w-full grid-cols-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-2xl gap-1.5 h-auto">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`
                    relative rounded-xl text-xs sm:text-sm font-bold px-3 py-3
                    transition-all duration-500 z-10
                    ${
                      activeTab === tab.value
                        ? "text-white shadow-lg"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }
                  `}
                >
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="sources">
            <StepCard
              icon={<Globe2 className="h-6 w-6" />}
              iconBg="from-blue-500 to-blue-600"
              cardBg="from-blue-500/5 via-transparent to-sky-500/5"
              imageBg="from-blue-500/20 to-sky-500/20"
              bulletColor="text-blue-600"
              title={t("connect.title")}
              desc={t("connect.description")}
              bullets={[
                {
                  text: t("connect.step1"),
                  icon: <Plus className="h-4 w-4" />,
                },
                {
                  text: t("connect.step2"),
                  icon: <Tag className="h-4 w-4" />,
                },
                {
                  text: t("connect.step3"),
                  icon: <RefreshCw className="h-4 w-4" />,
                },
                {
                  text: t("connect.step4"),
                  icon: <Database className="h-4 w-4" />,
                },
              ]}
              image="/Selection.svg"
            />
          </TabsContent>

          <TabsContent value="train">
            <StepCard
              icon={<BrainCircuit className="h-6 w-6" />}
              iconBg="from-emerald-500 to-teal-600"
              cardBg="from-emerald-500/5 via-transparent to-teal-500/5"
              imageBg="from-emerald-500/20 to-teal-500/20"
              bulletColor="text-emerald-600"
              title={t("train.title")}
              desc={t("train.description")}
              bullets={[
                {
                  text: t("train.step1"),
                  icon: <MousePointer className="h-4 w-4" />,
                },
                {
                  text: t("train.step2"),
                  icon: <ThumbsDown className="h-4 w-4" />,
                },
                {
                  text: t("train.step3"),
                  icon: <Zap className="h-4 w-4" />,
                },
                {
                  text: t("train.step4"),
                  icon: <FileText className="h-4 w-4" />,
                },
              ]}
              image="/Processing.svg"
            />
          </TabsContent>

          <TabsContent value="design">
            <StepCard
              icon={<LayoutTemplate className="h-6 w-6" />}
              iconBg="from-orange-500 to-amber-600"
              cardBg="from-orange-500/5 via-transparent to-amber-500/5"
              imageBg="from-orange-500/20 to-amber-500/20"
              bulletColor="text-orange-600"
              title={t("design.title")}
              desc={t("design.description")}
              bullets={[
                {
                  text: t("design.step1"),
                  icon: <Palette className="h-4 w-4" />,
                },
                {
                  text: t("design.step2"),
                  icon: <Type className="h-4 w-4" />,
                },
                {
                  text: t("design.step3"),
                  icon: <Layers className="h-4 w-4" />,
                },
                {
                  text: t("design.step4"),
                  icon: <PenTool className="h-4 w-4" />,
                },
              ]}
              image="/Customization.svg"
            />
          </TabsContent>

          <TabsContent value="send">
            <StepCard
              icon={<SendHorizonal className="h-6 w-6" />}
              iconBg="from-red-500 to-rose-600"
              cardBg="from-red-500/5 via-transparent to-rose-500/5"
              imageBg="from-red-500/20 to-rose-500/20"
              bulletColor="text-red-600"
              title={t("automate.title")}
              desc={t("automate.description")}
              bullets={[
                {
                  text: t("automate.step1"),
                  icon: <Clock className="h-4 w-4" />,
                },
                {
                  text: t("automate.step2"),
                  icon: <Mail className="h-4 w-4" />,
                },
                {
                  text: t("automate.step3"),
                  icon: <MessageSquare className="h-4 w-4" />,
                },
                {
                  text: t("automate.step4"),
                  icon: <BarChart3 className="h-4 w-4" />,
                },
                {
                  text: t("automate.step5"),
                  icon: <CheckCircle className="h-4 w-4" />,
                },
              ]}
              image="/Automation.svg"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  iconBg,
  cardBg,
  imageBg,
  bulletColor,
  title,
  desc,
  bullets,
  image,
}: {
  icon: React.ReactNode;
  iconBg: string;
  cardBg: string;
  imageBg: string;
  bulletColor: string;
  title: string;
  desc: string;
  bullets: { text: string; icon: React.ReactNode }[];
  image: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardBg} opacity-50 dark:opacity-30`}
        />

        <div className="grid gap-12 lg:grid-cols-2 items-center relative z-10">
          <div className="px-8 py-10 lg:px-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBg} text-white shadow-xl`}
                >
                  {icon}
                </motion.div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {bullets.map((bullet, i) => (
                  <Bullet key={i} color={bulletColor} icon={bullet.icon}>
                    {bullet.text}
                  </Bullet>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[350px] lg:min-h-[400px] mr-5">
            <div
              className={`absolute inset-0 bg-linear-to-br ${imageBg} dark:opacity-60 rounded-3xl`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-white/20 via-transparent to-transparent dark:from-slate-900/20 rounded-3xl" />

            <div className="relative z-10 h-full flex items-center justify-center p-12 rounded-2xl overflow-hidden">
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-contain drop-shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
