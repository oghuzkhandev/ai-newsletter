"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rss,
  Mail,
  Settings,
  CreditCard,
  Menu,
  Crown,
  Gem,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePlan } from "../providers/plan-provider";
import type { Plan } from "@/lib/plan";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "RSS Feeds", href: "/dashboard/feeds", icon: Rss },
  { label: "Newsletters", href: "/dashboard/history", icon: Mail },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "User Settings", href: "/dashboard/settings", icon: Settings },
];

function getPlanBadge(plan: Plan) {
  if (plan === "free")
    return (
      <Badge
        variant="outline"
        className="text-xs border-slate-300 text-slate-600"
      >
        Free plan
      </Badge>
    );

  if (plan === "starter")
    return (
      <Badge className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Gem className="h-3 w-3" /> Starter Plan
      </Badge>
    );

  return (
    <Badge className="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
      <Crown className="h-3 w-3" /> Pro Plan
    </Badge>
  );
}

export function DashboardSidebar() {
  const rawPath = usePathname();

  function normalizePath(path: string) {
    const parts = path.split("/").filter(Boolean);
    if (["en", "tr"].includes(parts[0])) {
      parts.shift();
    }
    return "/" + parts.join("/");
  }

  const pathname = normalizePath(rawPath);

  const plan = usePlan();
  const [collapsed, setCollapsed] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pb-4 pt-6">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2">
              <UserButton />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                GlobeBrief
              </span>
              {getPlanBadge(plan)}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              AI-powered news digest
            </p>
          </motion.div>
        )}
      </div>

      <ScrollArea className="flex-1 px-2 pb-4">
        <nav className="space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{
                    scale: collapsed ? 1.06 : 1.02,
                    x: collapsed ? 0 : 4,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="mt-4"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative z-10 mb-1 flex w-full justify-start gap-3 rounded-xl px-4 py-2 text-sm transition-all duration-300",
                      "bg-white/50 backdrop-blur-xl border border-white/30 shadow-sm",
                      "hover:bg-gradient-to-r hover:from-rose-400/20 hover:to-purple-500/20 hover:border-white/40 hover:shadow-[0_0_18px_rgba(255,80,180,0.35)]",
                      isActive &&
                        "bg-gradient-to-r from-rose-600 to-purple-700 text-white border-white/40 shadow-[0_0_20px_rgba(255,80,150,0.45)] scale-[1.02]"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl z-0 pointer-events-none"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: [0.4, 0.65, 0.4] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(255,150,220,0.45), transparent 70%)",
                        }}
                      />
                    )}

                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors z-10",
                        isActive ? "text-white" : "text-slate-700"
                      )}
                    />

                    {!collapsed && (
                      <span
                        className={cn(
                          "transition-colors font-medium tracking-wide z-10",
                          isActive ? "text-white" : "text-slate-800"
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
          <p>Tip: Connect more RSS feeds to improve your daily digest.</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Newsflow
          </span>
          {getPlanBadge(plan)}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-slate-300 shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            {content}
          </SheetContent>
        </Sheet>
      </div>

      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex items-center justify-center lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white/80 backdrop-blur-xl transition-all duration-300",
          collapsed ? "lg:w-20" : "lg:w-60"
        )}
      >
        {content}

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-white/80 backdrop-blur-lg border-slate-300 shadow hover:bg-slate-50 transition"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      <div
        className="hidden lg:block"
        style={{ width: collapsed ? "5rem" : "16rem" }}
      />
    </>
  );
}
