"use client";

import { PricingTable } from "@clerk/nextjs";
import { Check, Minus, ChevronDown, Wallet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Pricing() {
  const t = useTranslations("pricing");

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqs = t.raw("faqs");

  return (
    <div className="mx-auto max-w-7xl" id="pricing">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center mb-10 gap-2 px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 shadow-md shadow-orange-500">
          <Wallet className="w-6 h-6" />
          <span className="text-sm font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
            {t("badge")}
          </span>
        </div>
      </div>
      {/* HEADER */}
      <div className="flex max-w-7xl mx-auto text-center gap-10 px-4">
        <div className="whitespace-normal wrap-break-word flex-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex-1">
          <Image src="/Subs.svg" alt="Subs" height={250} width={250} />
        </div>
      </div>

      {/* CLERK PRICING TABLE */}
      <div className="mt-16 flex justify-center w-full ">
        <div className="w-full max-w-4xl">
          <PricingTable />
        </div>
      </div>

      {/* WHY UPGRADE */}
      <section className="mt-24 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-10">
          {t("whyUpgrade.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.raw("whyUpgrade.cards").map((card: any, i: number) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-xl text-indigo-600 dark:text-indigo-400">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-3">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mt-24 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 text-center mb-10">
          {t("compare.title")}
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b dark:border-slate-700">
              <tr>
                <th className="p-4 font-semibold">{t("compare.features")}</th>
                <th className="p-4 font-semibold text-center">
                  {t("compare.starter")}
                </th>
                <th className="p-4 font-semibold text-center">
                  {t("compare.pro")}
                </th>
              </tr>
            </thead>

            <tbody>
              {t.raw("compare.rows").map((row: any, i: number) => (
                <tr key={i} className="border-b dark:border-slate-800">
                  <td className="p-4">{row.label}</td>
                  <td className="p-4 text-center">
                    {row.starter === "check" ? (
                      <Check className="h-5 w-5 mx-auto text-emerald-600" />
                    ) : row.starter === "minus" ? (
                      <Minus className="h-5 w-5 mx-auto text-slate-400" />
                    ) : (
                      row.starter
                    )}
                  </td>
                  <td className="p-4 text-center font-medium">
                    {row.pro === "check" ? (
                      <Check className="h-5 w-5 mx-auto text-emerald-600" />
                    ) : row.pro === "minus" ? (
                      <Minus className="h-5 w-5 mx-auto text-slate-400" />
                    ) : (
                      row.pro
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 max-w-4xl mx-auto px-4 mb-10">
        <h2 className="text-4xl font-bold text-center mb-14 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {t("faqTitle")}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <span className="text-lg font-medium text-slate-900 dark:text-slate-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-300 animate-fadeIn">
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
