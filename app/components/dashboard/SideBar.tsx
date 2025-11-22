// Collapsible version of the sidebar with improved hover effects
// Your layout, width, height, mobile logic all preserved exactly.
// Only collapsible + better hover added.

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
  const pathname = usePathname();
  const plan = usePlan();
  const [collapsed, setCollapsed] = useState(false);

  const content = (
    <div className="flex h-full flex-col">
      {/* HEADER */}
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
                Newsflow
              </span>
              {getPlanBadge(plan)}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              AI-powered Turkish news digest
            </p>
          </motion.div>
        )}
      </div>

      {/* NAVIGATION */}
      <ScrollArea className="flex-1 px-2 pb-4">
        <nav className="space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="mt-5"
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "relative mb-1 flex w-full justify-start gap-2 rounded-xl px-3 py-2 text-sm",
                      "transition-all duration-150",
                      "hover:bg-red-200 hover:text-slate-900 hover:shadow-red-300 shadow-lg",
                      isActive && "bg-red-900 text-slate-50 "
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}

                    <Icon
                      className={cn(
                        "h-4 w-4 flex items-center justify-center transition-colors",
                        isActive ? "text-slate-50" : "text-black"
                      )}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* FOOTER */}
      {!collapsed && (
        <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
          <p>Tip: Connect more RSS feeds to improve your daily digest.</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* MOBILE */}
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

      {/* DESKTOP COLLAPSIBLE */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex items-center justify-center lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white transition-all duration-300",
          collapsed ? "lg:w-20" : "lg:w-60"
        )}
      >
        {content}

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-white border-slate-300 shadow hover:bg-slate-50 transition"
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
