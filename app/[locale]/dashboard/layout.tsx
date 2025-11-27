import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ToasterProvider } from "./toaster-provider";
import { DashboardSidebar } from "../../components/dashboard/SideBar";
import { PlanProvider } from "../../components/providers/plan-provider";
import type { Plan } from "@/lib/plan";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { has, userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let plan: Plan = "free";

  if (await has({ plan: "starter" })) {
    plan = "starter";
  }

  if (await has({ plan: "pro" })) {
    plan = "pro";
  }
  if (plan === "free") {
    redirect("/#pricing");
  }

  return (
    <PlanProvider plan={plan}>
      <div className="min-h-screen bg-slate-50">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <div className="max-w-7xl mx-auto p-4">{children}</div>
        </div>
      </div>
      <ToasterProvider />
    </PlanProvider>
  );
}
