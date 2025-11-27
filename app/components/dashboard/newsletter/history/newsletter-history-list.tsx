"use client";

import { formatDistanceToNow } from "date-fns";
import { Calendar, ChevronRight, Layers, Trash2, Sparkles, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { deleteNewsletterAction } from "@/actions/delete-newsletter";

interface Newsletter {
  id: string;
  suggestedTitles: string[];
  suggestedSubjectLines: string[];
  body: string;
  topAnnouncements: string[];
  additionalInfo?: string | null;
  startDate: Date;
  endDate: Date;
  userInput?: string | null;
  feedsUsed: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NewsletterHistoryListProps {
  newsletters: Newsletter[];
}

export function NewsletterHistoryList({
  newsletters,
}: NewsletterHistoryListProps) {
  const [isPending, startTransition] = React.useTransition();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleDelete = (
    e: React.MouseEvent,
    newsletterId: string,
    newsletterTitle: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete "${newsletterTitle}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(newsletterId);

    startTransition(async () => {
      try {
        await deleteNewsletterAction(newsletterId);
        toast.success("Newsletter deleted successfully");
        setDeletingId(null);
      } catch (error) {
        console.error("Failed to delete newsletter:", error);
        toast.error("Failed to delete newsletter");
        setDeletingId(null);
      }
    });
  };

  if (newsletters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-stone-200/60 p-12 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-stone-100 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-stone-400" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-stone-800 mb-3">
            No Newsletters Yet
          </h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto leading-relaxed">
            You haven't saved any newsletters yet. Generate and save your first
            newsletter to see it here.
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
            >
              Go to Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {newsletters.map((newsletter, index) => {
          const title = newsletter.suggestedTitles[0] || "Untitled Newsletter";
          const isDeleting = deletingId === newsletter.id || isPending;
          const isHovered = hoveredId === newsletter.id;

          return (
            <motion.div
              key={newsletter.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/dashboard/history/${newsletter.id}`}>
                <motion.article
                  onHoverStart={() => setHoveredId(newsletter.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className={`
                    relative group cursor-pointer
                    bg-white/90 backdrop-blur-sm
                    rounded-2xl border border-stone-200/80
                    p-6 transition-all duration-300
                    ${isHovered ? "shadow-lg shadow-stone-200/50 border-stone-300" : "shadow-sm hover:shadow-md"}
                    ${isDeleting ? "opacity-50 pointer-events-none" : ""}
                  `}
                >
                  {/* Subtle accent line on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-6 right-6 h-[2px] bg-rose-400/60 rounded-full origin-left"
                  />

                  <div className="flex items-start gap-5">
                    {/* Date Badge */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-stone-50 border border-stone-100 shrink-0">
                      <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                        {new Date(newsletter.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-2xl font-semibold text-stone-700 -mt-0.5">
                        {new Date(newsletter.createdAt).getDate()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-medium text-lg text-stone-800 line-clamp-1 group-hover:text-stone-900 transition-colors">
                          {title}
                        </h3>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Delete Button */}
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleDelete(e, newsletter.id, title)}
                            disabled={isDeleting}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>

                          {/* Arrow */}
                          <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center group-hover:bg-stone-800 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Subject Line Preview */}
                      <p className="text-stone-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {newsletter.suggestedSubjectLines[0] ||
                          `${newsletter.body.substring(0, 120)}...`}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                        {/* Time Ago */}
                        <div className="flex items-center gap-1.5 text-stone-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {formatDistanceToNow(new Date(newsletter.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>

                        {/* Date Range */}
                        <div className="flex items-center gap-1.5 text-stone-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(newsletter.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            →{" "}
                            {new Date(newsletter.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-3 bg-stone-200" />

                        {/* Feeds Count */}
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-stone-400" />
                          <span className="text-stone-500 font-medium">
                            {newsletter.feedsUsed.length} feeds
                          </span>
                        </div>

                        {/* Announcements */}
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-medium">
                          {newsletter.topAnnouncements.length} highlights
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Loading overlay when deleting */}
                  {isDeleting && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
                    </div>
                  )}
                </motion.article>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Bottom fade hint if many items */}
      {newsletters.length > 5 && (
        <div className="h-8 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}