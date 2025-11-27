"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function InfiniteMovingCards({
  items,
  direction = "right",
  speed = "fast",
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

  const baseSpeed =
    speed === "slow" ? 18 : speed === "normal" ? 12 : 8;

  return (
    <div className="relative w-full overflow-hidden py-6">
      <motion.div
        className={`flex ${gapClass}`}
        animate={{
          x: direction === "right" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: baseSpeed,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <HoverCard item={item} key={`${item.id}-${idx}`} />
        ))}
      </motion.div>
    </div>
  );
}

function HoverCard({ item }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [20, -20]);
  const rotateY = useTransform(x, [-120, 120], [-20, 20]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.12 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 15,
      }}
      className="relative h-[360px] w-[270px] shrink-0 rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.28)] group cursor-pointer select-none"
    >
      {/* IMAGE (JSX destekli) */}
      <div className="absolute inset-0">
        {item.image}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />

      {/* ICON + TITLE */}
      <div className="absolute top-2 left-5 flex items-center gap-2">
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shadow">
          {item.icon}
        </div>
        <h3 className="text-white font-semibold text-md">{item.title}</h3>
      </div>

      {/* Description */}
      <p className="absolute bottom-6 left-5 right-5 text-xs text-white font-bold leading-snug">
        {item.quote}
      </p>

      {/* Source */}
      <p className="absolute bottom-2 left-5 text-xs text-black font-semibold">
        {item.source}
      </p>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(56,132,245,0.55),transparent_70%)]" />
    </motion.div>
  );
}
