"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, BrainCircuit, SendHorizonal } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center space-y-3">
          <Badge className="bg-slate-900 text-slate-50 border-slate-900/10">
            How it works
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            From hundreds of RSS feeds to one clean newsletter
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
            You bring your taste in sources. The system brings AI-powered curation, summaries, and
            structure. The result: a daily or weekly digest that actually fits into your life.
          </p>
        </div>

        <Tabs defaultValue="sources" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 border border-slate-200 rounded-2xl p-1">
            <TabsTrigger
              value="sources"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 rounded-xl text-xs sm:text-sm"
            >
              Choose sources
            </TabsTrigger>
            <TabsTrigger
              value="curate"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 rounded-xl text-xs sm:text-sm"
            >
              AI curate
            </TabsTrigger>
            <TabsTrigger
              value="send"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50 rounded-xl text-xs sm:text-sm"
            >
              Review & send
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-slate-200/80 bg-white/90 shadow-sm">
                <CardHeader className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-slate-50">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Pick your categories and favorite sites
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      Start by choosing what you care about: science, technology, culture, sports,
                      economy, business, lifestyle and more – all powered by curated Turkish RSS feeds.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>• Toggle categories like Science, Tech, Entertainment, Culture & Arts, Agenda, Finance and more.</p>
                  <p>• Within each category, follow specific sites (e.g. Evrim Ağacı, Webrazzi, T24, NTV Spor, Forbes Türkiye...).</p>
                  <p>• Mark some sources as “must include” and others as “low priority” so the digest behaves the way you expect.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="curate">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-slate-200/80 bg-white/90 shadow-sm">
                <CardHeader className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-slate-50">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Let the AI filter, group, and summarize
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      The engine continuously pulls fresh items from your RSS sources, removes
                      duplicates, reduces noise, and turns long articles into clean summaries.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>• Fetch the latest content from all selected feeds and cluster similar stories together.</p>
                  <p>• Detect clickbait or low-quality items and push them to the bottom of your digest (or drop them entirely).</p>
                  <p>• Generate concise Turkish summaries, key points, and suggested headlines for each story.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="send">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-slate-200/80 bg-white/90 shadow-sm">
                <CardHeader className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-slate-50">
                    <SendHorizonal className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Review, style, and ship your digest
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600">
                      Make quick edits, reorder sections, and send the final digest to your inbox or
                      sync it with your email platform as a recurring newsletter.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <p>• Reorder sections like “Top stories”, “Science & Tech”, “Culture”, “Markets”, “Sports”.</p>
                  <p>• Fine-tune AI-generated text: adjust tone, add commentary, or pin important stories at the top.</p>
                  <p>• Schedule a daily or weekly send, or export HTML to use inside your existing email tool.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
