"use client";

import React from "react";
import { motion } from "framer-motion";

export function InfiniteMovingCards({
  items,
  direction = "right",
  speed = "normal",
  gap = "lg",
}: {
  items: any[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  gap?: "sm" | "md" | "lg" | "xl";
}) {
  const gapClass =
    gap === "sm"
      ? "gap-4"
      : gap === "md"
      ? "gap-6"
      : gap === "lg"
      ? "gap-10"
      : "gap-14";

  const duration = speed === "slow" ? 30 : speed === "normal" ? 23 : 15;

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Wrapper */}
      <motion.div
        className={`flex ${gapClass} whitespace-nowrap`}
        animate={{
          x: direction === "right" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <Card item={item} key={`${item.id}-${index}`} />
        ))}
      </motion.div>
    </div>
  );
}

function Card({ item }: any) {
  return (
    <div className="relative h-[360px] w-[270px] shrink-0 rounded-3xl overflow-hidden shadow-xl bg-black/10">
      {/* IMAGE */}
      <div className="absolute inset-0">{item.image}</div>

      {/* ICON + TITLE */}
      <div className="absolute top-2 left-4 flex items-center gap-2">
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shadow">
          {item.icon}
        </div>
        <h3 className="text-white font-semibold text-md">{item.title}</h3>
      </div>

      {/* QUOTE */}
      <p className="absolute bottom-6 left-5 right-5 text-xs text-white font-bold line-clamp-2">
        {item.quote}
      </p>

      {/* SOURCE */}
      <p className="absolute bottom-2 left-5 text-xs text-green-400 font-bold">
        {item.source}
      </p>
    </div>
  );
}
