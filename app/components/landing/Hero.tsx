import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CTAButtonServer from "./Buttons/CTAButtonServer";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-sky-100 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.35)_0,transparent_55%),linear-gradient(to_right,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[length:100%_100%,80px_80px,80px_80px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16 items-center">
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-1 text-xs sm:text-sm font-medium text-indigo-700 shadow-sm backdrop-blur"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI-powered newsletter automation
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block mb-1 text-slate-900">Automate your newsletters</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-500 bg-clip-text text-transparent">
                with intelligent workflows
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-base sm:text-lg text-slate-600">
              Curate, personalize, and design high-performing newsletters in minutes. Let AI handle
              content, personalization, and timing — so you can focus on strategy and growth.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4 pt-2">
              <div className="flex -space-x-2 justify-center lg:justify-start">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs">
                  💌
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs">
                  🤖
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs">
                  📈
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                10,000+ newsletters generated · Avg. 38% open rate · Up to 2.4x more engagement
              </p>
            </div>

            <CTAButtonServer />
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
