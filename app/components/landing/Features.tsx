"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Newspaper, Brain, Filter } from "lucide-react";

const features = [
  {
    icon: Newspaper,
    label: "Multi-source inbox",
    title: "One newsletter, dozens of trusted sources",
    description:
      "Combine science, tech, culture, finance, sports and more into a single digest. No more tab hell, no more jumping between websites.",
    badge: "Unified feed",
    footnote: "Built for Turkish content – from Arkeofili to Webrazzi.",
  },
  {
    icon: Brain,
    label: "AI summaries",
    title: "Readable, human-friendly summaries in seconds",
    description:
      "Turn long articles into concise, skimmable paragraphs. The AI keeps the signal, strips away the fluff, and highlights what actually matters.",
    badge: "Smart summarization",
    footnote: "Perfect for busy mornings or commute reading.",
  },
  {
    icon: Filter,
    label: "Noise control",
    title: "De-duplicate and de-clickbait your news",
    description:
      "Group similar stories from multiple outlets, reduce clickbait and repetitive headlines, and keep your digest clean and focused.",
    badge: "Less noise, more signal",
    footnote: "See a story once, with perspective – not 15 times.",
  },
  {
    icon: ListChecks,
    label: "Your rules",
    title: "You decide what gets in – and what stays out",
    description:
      "Follow favorite sites, mute others, prioritize topics and sections. Your digest learns over time from what you open, dismiss, or star.",
    badge: "Personalized control",
    footnote: "From hardcore science to light entertainment – you choose.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14 text-center space-y-3">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100">
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Build your own AI-powered Turkish news digest
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
            Plug into curated RSS feeds from science, technology, culture, sports, business and more.
            Let the AI do the heavy lifting while you keep full editorial control.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              >
                <Card className="group h-full border-slate-200/80 bg-white/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-indigo-200 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start gap-3">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wide text-indigo-500 font-semibold">
                          {feature.label}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                          {feature.badge}
                        </span>
                      </div>
                      <CardTitle className="text-base sm:text-lg">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-slate-600">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 pb-4 sm:pb-5">
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{feature.footnote}</span>
                      <span className="text-indigo-500 group-hover:text-indigo-600 font-medium">
                        Explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
