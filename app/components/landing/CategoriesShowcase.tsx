"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  FlaskConical,
  Cpu,
  Newspaper,
  Trophy,
  LineChart,
  Globe2,
  BookOpenCheck,
} from "lucide-react";

export default function CategoriesShowcase() {
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">

      {/* 🔥 BADGE */}
      <div className="w-full flex justify-center mb-10">
        <span className="px-5 flex gap-2 font-bold py-2 rounded-full text-sm
          bg-gradient-to-r from-indigo-500/20 to-purple-500/20
          text-indigo-600 dark:text-indigo-300
          border border-indigo-400/30
          shadow-[0_5px_15px_rgba(99,102,241,0.35)]
          backdrop-blur-md">
          <BookOpenCheck /> Discover Categories
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center mb-14">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Choose and Explore top news categories that interest you most from
          around the world
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          AI curates global RSS feeds and summarizes daily insights across the
          most important topics.
        </p>
      </div>

      <div className="h-[32rem] flex items-center justify-center font-semibold text-slate-50">
        <InfiniteMovingCards
          items={categories}
          direction="right"
          speed="normal"
        />
      </div>
    </section>
  );
}

const iconClass = "h-6 w-6 text-white opacity-90";

const categories = [
  {
    id: "culture",
    icon: <Globe2 className={iconClass} />,
    title: "Culture",
    image: (
      <img
        src="/Culture.png"
        className="w-full h-[300px] object-cover"
        alt="culture"
      />
    ),
    source: "National Geographic · NY Times",
    quote:
      "Arts, travel, history, photography and culture from iconic sources.",
  },
  {
    id: "technology",
    icon: <Cpu className={iconClass} />,
    title: "Technology",
    image: (
      <img
        src="/Technology.png"
        className="w-full h-[300px] object-cover"
        alt="technology"
      />
    ),
    source: "Apple Newsroom · TechCrunch",
    quote:
      "AI breakthroughs, startups, gadgets and innovation shaping the future.",
  },
  {
    id: "world",
    icon: <Newspaper className={iconClass} />,
    title: "World News",
    image: (
      <img
        src="/WorldNews.png"
        className="w-full h-[300px] object-cover"
        alt="world"
      />
    ),
    source: "BBC · Reuters",
    quote:
      "Unbiased global coverage and real-time updates from across the planet.",
  },
  {
    id: "finance",
    icon: <LineChart className={iconClass} />,
    title: "Finance",
    image: (
      <img
        src="/Finance.png"
        className="w-full h-[300px] object-cover"
        alt="finance"
      />
    ),
    source: "Bloomberg · CNBC",
    quote:
      "Markets, crypto, business insights and economic stories simplified.",
  },
  {
    id: "sports",
    icon: <Trophy className={iconClass} />,
    title: "Sports",
    image: (
      <img
        src="/Sports.png"
        className="w-full h-[300px] object-cover"
        alt="sports"
      />
    ),
    source: "ESPN · SkySports",
    quote:
      "Worldwide sports highlights football, basketball, UFC and more.",
  },
  {
    id: "science",
    icon: <FlaskConical className={iconClass} />,
    title: "Science",
    image: (
      <img
        src="/Science.png"
        className="w-full h-[300px] object-cover"
        alt="science"
      />
    ),
    source: "NASA · National Geographic",
    quote:
      "Daily discoveries, astrophysics, biology and science journalism.",
  },
];
