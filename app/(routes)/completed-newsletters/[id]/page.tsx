"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Sun, Moon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { NewsletterData } from "@/lib/newsletter/types";
import MinimalTemplate from "@/app/components/dashboard/newsletter/template/minimal";
import MagazineTemplate from "@/app/components/dashboard/newsletter/template/magazine";
import CardsTemplate from "@/app/components/dashboard/newsletter/template/cards";

const templateMap = {
  minimal: MinimalTemplate,
  magazine: MagazineTemplate,
  cards: CardsTemplate,
} as const;

export default function NewsletterCompletedPage({ params }: { params: { id: string } }) {
  const [dark, setDark] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const newsletterData: NewsletterData = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        suggestedTitles: [],
        suggestedSubjectLines: [],
        body: "",
        topAnnouncements: [],
        template: "minimal",
      };
    }

    const stored = localStorage.getItem(`newsletter-${params.id}`);
    if (!stored) {
      return {
        suggestedTitles: [],
        suggestedSubjectLines: [],
        body: "",
        topAnnouncements: [],
        template: "minimal",
      };
    }

    try {
      const parsed = JSON.parse(stored);
      return {
        suggestedTitles: parsed.suggestedTitles || [],
        suggestedSubjectLines: parsed.suggestedSubjectLines || [],
        body: parsed.body || "",
        topAnnouncements: parsed.topAnnouncements || [],
        template: parsed.template || "minimal",
      };
    } catch {
      return {
        suggestedTitles: [],
        suggestedSubjectLines: [],
        body: "",
        topAnnouncements: [],
        template: "minimal",
      };
    }
  }, [params.id]);

  /** Template Component */
  const Template =
    templateMap[newsletterData.template as keyof typeof templateMap] || MinimalTemplate;

  async function generatePDF() {
    const element = document.getElementById("newsletter-content");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save(`newsletter-${params.id}.pdf`);

    toast.success("PDF exported!");
  }

  async function sendEmail() {
    const html = document.getElementById("newsletter-content")?.innerHTML;
    if (!html) return toast.error("Newsletter content not found.");

    const res = await fetch("/api/newsletter/send-email", {
      method: "POST",
      body: JSON.stringify({ html }),
    });

    res.ok ? toast.success("Email sent!") : toast.error("Failed to send email");
  }

  async function generateCoverImage() {
    const res = await fetch("/api/newsletter/generate-cover", { method: "POST" });
    const data = await res.json();
    setCoverImage(data.url);
    toast.success("Cover image generated!");
  }

  return (
    <div className={dark ? "dark bg-neutral-900 text-white" : "bg-gray-50"}>
      <div className="max-w-4xl mx-auto py-14 space-y-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Newsletter Completed
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              {dark ? <Sun /> : <Moon />}
            </button>

            <button
              onClick={generatePDF}
              className="p-2 rounded-xl border hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <Download />
            </button>

            <button
              onClick={sendEmail}
              className="p-2 rounded-xl border hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <Mail />
            </button>

            <button
              onClick={generateCoverImage}
              className="p-2 rounded-xl border hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <ImageIcon />
            </button>
          </div>
        </motion.div>

        {/* COVER IMAGE */}
        {coverImage && (
          <motion.img
            src={coverImage}
            alt="Cover"
            className="w-full rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* CONTENT */}
        <div
          id="newsletter-content"
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-10 space-y-10"
        >
          <Template data={newsletterData} />
        </div>
      </div>
    </div>
  );
}
