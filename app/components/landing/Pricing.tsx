"use client";
import { PricingTable } from "@clerk/nextjs";
import { Check, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqs = [
    {
      question: "What's the difference between Starter and Pro?",
      answer:
        "Starter gives you 1 daily AI summary and up to 5 RSS sources. Pro unlocks unlimited feeds, up to 3 daily digests, stronger AI summarization, full automation, premium templates, and alert-based notifications.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "Absolutely. You can upgrade or downgrade at any time. Upgrades apply instantly; downgrades take effect at the end of your billing cycle.",
    },
    {
      question: "Do you lock me into a contract?",
      answer:
        "No long-term commitments. All plans are month-to-month and you can cancel directly from your account settings whenever you want.",
    },
    {
      question: "What happens if I hit my limits on Starter?",
      answer:
        "If you exceed your allowed sources or summaries, we'll prompt you to upgrade—your data is never deleted or throttled.",
    },
  ];

  return (
    <div className="w-full pb-32 pt-24" id="pricing">
      <div className="flex max-w-7xl mx-auto text-center gap-10 px-4">
        <div className="whitespace-normal wrap-break-word flex-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Build your own AI-powered news digest from all around of the world RSS sources – pick the plan that
            matches how deep you want to go.
          </p>
        </div>
        <div className="flex-1">
          <Image src="/Subs.svg" alt="Subs" height={250} width={250} />
        </div>
      </div>

      {/* Clerk Pricing Table */}
      <div className="mt-16 flex justify-center w-full ">
        <div className="w-full max-w-4xl">
          <PricingTable />
        </div>
      </div>

      {/* Why Upgrade */}
      <section className="mt-24 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-slate-900 text-center mb-10">
          Why upgrade from Starter to Pro?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl text-indigo-600">
              More content, more context
            </h3>
            <p className="text-slate-600 mt-3">
              Starter gives you up to 5 RSS sources and 1 daily summary. Pro unlocks unlimited
              feeds, access to hundreds of categories, and up to 3 AI-powered daily digests.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl text-indigo-600">
              Stronger AI & better design
            </h3>
            <p className="text-slate-600 mt-3">
              Move from basic 300-word summaries and simple templates to advanced long-form
              AI summaries (1,000+ words), premium newsletter designs, and a more powerful
              AI engine.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-xl text-indigo-600">
              Full automation & alerts
            </h3>
            <p className="text-slate-600 mt-3">
              With Pro you can automatically create and deliver newsletters on a schedule, and
              get trending story + category-based alerts instead of manually checking the app.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mt-24 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-slate-900 text-center mb-10">
          Compare plans
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 border-b">
              <tr>
                <th className="p-4 font-semibold">Features</th>
                <th className="p-4 font-semibold text-center">Starter</th>
                <th className="p-4 font-semibold text-center">Pro</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-4">Monthly price</td>
                <td className="p-4 text-center">$7.50 / month</td>
                <td className="p-4 text-center font-medium">$20 / month</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">RSS sources</td>
                <td className="p-4 text-center">Up to 5</td>
                <td className="p-4 text-center font-medium">Unlimited</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">AI-powered daily summaries</td>
                <td className="p-4 text-center">1 per day</td>
                <td className="p-4 text-center font-medium">Up to 3 per day</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">AI Newsletter Engine</td>
                <td className="p-4 text-center">Custom AI Newsletter Engine</td>
                <td className="p-4 text-center font-medium">
                  Advanced AI Newsletter Engine
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Newsletter design & templates</td>
                <td className="p-4 text-center">Basic templates</td>
                <td className="p-4 text-center font-medium">Premium templates</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Max AI summary length</td>
                <td className="p-4 text-center">Up to 300 words</td>
                <td className="p-4 text-center font-medium">1,000+ words</td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Access to RSS categories</td>
                <td className="p-4 text-center">
                  Limited, based on selected sources
                </td>
                <td className="p-4 text-center font-medium">
                  Access to hundreds of categories and feeds
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">View latest articles in dashboard</td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">
                  Email notification when daily newsletter is ready
                </td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">
                  Automatically create & deliver on a schedule (Daily / Weekly)
                </td>
                <td className="p-4 text-center">
                  <Minus className="h-5 w-5 mx-auto text-slate-400" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
              </tr>

              <tr>
                <td className="p-4">
                  Trending story alerts & category-based notifications
                </td>
                <td className="p-4 text-center">
                  <Minus className="h-5 w-5 mx-auto text-slate-400" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-5 w-5 mx-auto text-emerald-600" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* PREMIUM FAQ */}
      <section className="mt-24 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <span className="text-lg font-medium text-slate-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 pt-0 text-slate-600 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }
        `}</style>
      </section>
    </div>
  );
}
