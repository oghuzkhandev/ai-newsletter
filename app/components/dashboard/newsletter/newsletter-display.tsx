"use client";

import { useAuth } from "@clerk/nextjs";
import { Check, Copy, Download, Save, Mail } from "lucide-react";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import type { GeneratedNewsletter } from "@/actions/generate-newsletter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

/* --------------------------
   ENHANCED MARKDOWN COMPONENTS
-------------------------- */

const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-red-600 mt-8 mb-6 text-center border-b-2 border-red-200 pb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-bold text-red-500 mt-8 mb-4 flex items-center gap-2 border-l-4 border-red-500 pl-4">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 pl-2">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="leading-relaxed text-[17px] text-gray-700 dark:text-gray-300 my-4 text-justify">
      {children}
    </p>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline decoration-dotted underline-offset-2 transition-all hover:decoration-solid"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 pl-6 py-2 my-6 italic text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-r-lg">
      {children}
    </blockquote>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc ml-8 space-y-3 text-gray-700 dark:text-gray-300 my-4">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal ml-8 space-y-3 text-gray-700 dark:text-gray-300 my-4">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed pl-2">
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100">
      {children}
    </strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
  ),
  hr: () => (
    <hr className="my-8 border-t-2 border-gray-200 dark:border-gray-700" />
  ),
  code: ({ children }: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
      {children}
    </code>
  ),
};

interface NewsletterDisplayProps {
  newsletter: Partial<GeneratedNewsletter>;
  onSave: () => Promise<void>;
  isGenerating?: boolean;
  hideSaveButton?: boolean;
}

export function NewsletterDisplay({
  newsletter,
  onSave,
  isGenerating = false,
  hideSaveButton = false,
}: NewsletterDisplayProps) {
  const { has } = useAuth();
  const [isPro, setIsPro] = React.useState(false);

  React.useEffect(() => {
    const checkPlan = async () => {
      if (has) {
        const proStatus = await has({ plan: "pro" });
        setIsPro(proStatus);
      }
    };
    checkPlan();
  }, [has]);

  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadNewsletter = () => {
    const formatSection = (title: string, items: string[]) =>
      `${title}:\n${items.map((item, i) => `${i + 1}. ${item}`).join("\n")}`;

    const sections = [
      "NEWSLETTER",
      "",
      formatSection("TITLE OPTIONS", newsletter.suggestedTitles ?? []),
      "",
      formatSection(
        "SUBJECT LINE OPTIONS",
        newsletter.suggestedSubjectLines ?? []
      ),
      "",
      "NEWSLETTER BODY:",
      newsletter.body ?? "",
      "",
      formatSection("TOP 5 ANNOUNCEMENTS", newsletter.topAnnouncements ?? []),
    ];

    if (newsletter.additionalInfo) {
      sections.push("", "ADDITIONAL INFORMATION:", newsletter.additionalInfo);
    }

    const content = sections.join("\n").trim();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `newsletter-${new Date().toISOString().split("T")[0]}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Newsletter downloaded!");
  };

  const sendEmail = async () => {
    const html = document.getElementById("newsletter-body-render")?.innerHTML;
    if (!html) return toast.error("Newsletter content missing.");

    const bestSubject =
      newsletter.suggestedSubjectLines?.[0] || "Your Newsletter";

    try {
      const res = await fetch("/api/newsletter/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          subject: bestSubject,
        }),
      });

      if (res.ok) {
        toast.success("Newsletter sent to your email!");
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("Email sending failed.");
    }
  };

  return (
    <Card className="transition-all hover:shadow-xl border-2">
      <CardHeader className="dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Generated Newsletter
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Your professional newsletter is ready
            </CardDescription>
          </div>

          <div className="flex gap-2">
            {isPro && !hideSaveButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                disabled={isGenerating}
                className="hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-all"
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={downloadNewsletter}
              disabled={isGenerating}
              className="hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-all"
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={isGenerating || !newsletter.body}
              onClick={sendEmail}
              className="hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700 transition-all"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Me
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* TOP 3 SECTIONS – PREMIUM VERSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between gap-10"
        >
          {[
            {
              title: "📰 Newsletter Titles",
              items: newsletter.suggestedTitles ?? [],
              key: "titles",
            },
            {
              title: "🚨 Top Announcements",
              items: newsletter.topAnnouncements ?? [],
              key: "announcements",
            },
          ].map((section, idx) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="
        group border rounded-xl p-6 
        bg-neutral-50 dark:bg-neutral-900 
        hover:bg-neutral-100 dark:hover:bg-neutral-800 
        shadow-sm hover:shadow-md 
        transition-all duration-300
      "
            >
              {/* Title */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold tracking-tight">
                  {section.title}
                </h3>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!section.items.length}
                  onClick={() =>
                    copyToClipboard(section.items.join("\n"), section.key)
                  }
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  {copiedSection === section.key ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {section.items.length === 0 ? (
                  <p className="text-sm italic opacity-60 text-center py-4">
                    {isGenerating ? "Generating..." : "No items yet"}
                  </p>
                ) : (
                  section.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="
                h-6 w-6 flex items-center justify-center 
                rounded-lg border 
                text-xs font-semibold 
                bg-white dark:bg-neutral-800
              "
                      >
                        {i + 1}
                      </span>

                      <p className="text-sm opacity-80 leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BODY */}
        <div className="mt-10 space-y-5">
          <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
            <Label className="text-3xl font-bold text-red-600 flex items-center gap-2">
              📄 Newsletter Content
            </Label>

            {newsletter.body && (
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="text-md px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                >
                  {newsletter.body.split(/\s+/).filter(Boolean).length} words
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    newsletter.body && copyToClipboard(newsletter.body, "body")
                  }
                  disabled={!newsletter.body}
                  className="hover:bg-gray-100"
                >
                  {copiedSection === "body" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Copy className="h-4 w-4" />
                      <span>Copy Content</span>
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div
            id="newsletter-body-render"
            className="border-2 rounded-xl p-10 prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-neutral-900 shadow-inner"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              lineHeight: "1.8",
            }}
          >
            {newsletter.body ? (
              <ReactMarkdown components={markdownComponents}>
                {newsletter.body}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic text-center">
                Generating newsletter content...
              </p>
            )}
          </div>
        </div>

        {/* ADDITIONAL INFO */}
        {newsletter.additionalInfo && (
          <div className="space-y-5 mt-10">
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
              <Label className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                💡 Additional Insights
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  newsletter.additionalInfo &&
                  copyToClipboard(newsletter.additionalInfo, "additional")
                }
                className="hover:bg-gray-100"
              >
                {copiedSection === "additional" ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="border-2 rounded-xl p-8 prose prose-lg max-w-none dark:prose-invert bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
              <ReactMarkdown components={markdownComponents}>
                {newsletter.additionalInfo}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface NewsletterSectionProps {
  title: string;
  items: string[];
  onCopy: (text: string) => void;
  isCopied: boolean;
  isGenerating?: boolean;
  compact?: boolean;
  color?: "red" | "orange" | "purple";
}

function NewsletterSection({
  title,
  items,
  onCopy,
  isCopied,
  isGenerating = false,
  compact = false,
  color = "red",
}: NewsletterSectionProps) {
  const safeItems = items ?? [];

  const colorClasses = {
    red: "border-red-500 text-red-600 bg-red-50 dark:bg-red-950",
    orange: "border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950",
    purple: "border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-950",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className={`font-bold text-lg text-${color}-600`}>{title}</Label>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(safeItems.join("\n"))}
          disabled={safeItems.length === 0}
          className="hover:bg-gray-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div
        className={`border-2 rounded-lg p-4 space-y-3 ${colorClasses[color]} shadow-sm`}
      >
        {safeItems.length === 0 ? (
          <p className="text-muted-foreground italic text-sm text-center">
            {isGenerating
              ? `Generating ${title.toLowerCase()}...`
              : `No ${title.toLowerCase()} available`}
          </p>
        ) : (
          safeItems.map((item, index) => (
            <div
              key={`${title}-${index}`}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <Badge
                variant="outline"
                className={`text-xs border-${color}-600 text-${color}-700 dark:text-${color}-300 min-w-[24px] text-center`}
              >
                {index + 1}
              </Badge>

              <p className="flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {item}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
