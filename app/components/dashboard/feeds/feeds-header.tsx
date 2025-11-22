"use client";

import { motion } from "framer-motion";
import { Sparkles, Rss } from "lucide-react";

export default function FeedsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl p-8 overflow-hidden shadow-lg shadow-slate-400 bg-linear-to-r from-red-300/60 to-orange-300/60"
    >

      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="p-4 rounded-xl bg-white/10 backdrop-blur-md"
        >
          <Rss className="w-10 h-10" />
        </motion.div>

        <div>
          <h1 className="text-4xl font-bold">
            Best Turkish RSS Contents
          </h1>

          <motion.p
            className="text-sm text-muted-foreground mt-1 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-bold">100+ curated Turkish RSS sources for Pro Plan Users — categories include and trending news, technology, sports, entertainment, and more!"</span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
