"use client";

import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Trash2,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { deleteNewsletterAction } from "@/actions/delete-newsletter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterDisplay } from "../newsletter-display";

interface Newsletter {
  id: string;
  userId: string;
  suggestedTitles: string[];
  suggestedSubjectLines: string[];
  body: string;
  topAnnouncements: string[];
  additionalInfo: string | null;
  startDate: Date;
  endDate: Date;
  userInput: string | null;
  feedsUsed: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface NewsletterHistoryViewProps {
  newsletter: Newsletter;
}

export function NewsletterHistoryView({
  newsletter,
}: NewsletterHistoryViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [sendingEmail, setSendingEmail] = React.useState(false);

  const handleBackToHistory = () => {
    router.push("/dashboard/history");
  };

  const handleDelete = () => {
    const title = newsletter.suggestedTitles[0] || "this newsletter";
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteNewsletterAction(newsletter.id);
        toast.success("Newsletter deleted successfully");
        router.push("/dashboard/history");
      } catch (error) {
        console.error("Failed to delete newsletter:", error);
        toast.error("Failed to delete newsletter");
      }
    });
  };

  const sendEmail = async () => {
    setSendingEmail(true);

    try {
      const res = await fetch("/api/newsletter/send-email", {
        method: "POST",
        body: JSON.stringify({
          html: newsletter.body,
          subject: newsletter.suggestedSubjectLines[0] || "Your Newsletter",
        }),
      });

      if (!res.ok) throw new Error("Email failed");

      toast.success("Email sent!");
    } catch {
      toast.error("Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="container mx-auto py-12 px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHistory}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to History
              </Button>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wider italic">
              My Newsletters
            </h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={sendEmail}
              disabled={sendingEmail}
              className="hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              <Mail className="h-4 w-4 mr-2" />
              {sendingEmail ? "Sending..." : "Email"}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        {/* METADATA CARD */}
        <Card className="shadow-lg border shadow-gray-400 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Newsletter Information
            </CardTitle>

            <CardDescription>
              Generated on{" "}
              {new Date(newsletter.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {/* Date Range */}
              <div className="flex items-start gap-3">
                <div className="inline-flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Date Range</p>
                  <p className="text-muted-foreground">
                    {new Date(newsletter.startDate).toLocaleDateString()} —{" "}
                    {new Date(newsletter.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Feeds */}
              <div className="flex items-start gap-3">
                <div className="inline-flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Feeds Used</p>
                  <p className="text-muted-foreground">
                    {newsletter.feedsUsed.length} feeds
                  </p>
                </div>
              </div>

              {/* Custom Context */}
              {newsletter.userInput && (
                <div className="flex items-start gap-3">
                  <div className="inline-flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="font-medium">Custom Context</p>
                    <p className="text-muted-foreground line-clamp-2">
                      {newsletter.userInput}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MAIN NEWSLETTER DISPLAY */}
        <NewsletterDisplay
          newsletter={{
            suggestedTitles: newsletter.suggestedTitles,
            suggestedSubjectLines: newsletter.suggestedSubjectLines,
            body: newsletter.body,
            topAnnouncements: newsletter.topAnnouncements,
            additionalInfo: newsletter.additionalInfo ?? undefined,
          }}
          onSave={async () => {}}
          isGenerating={false}
          hideSaveButton={true}
        />
      </div>
    </div>
  );
}
