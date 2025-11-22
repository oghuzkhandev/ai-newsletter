import { auth } from "@clerk/nextjs/server";
import CTAButtonClient from "./CTAButtonClient";

export default async function CTAButtonServer() {
  const { userId, has } = await auth();
  
  const hasPaidPlan =
    (await has({ plan: "Pro" })) || (await has({ plan: "Free" }));
    
  return <CTAButtonClient userId={userId} hasPaidPlan={hasPaidPlan} />;
}