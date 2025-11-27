"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTAButtonClientProps {
  userId: string | null | undefined;
  hasPaidPlan: boolean;
}

export default function CTAButtonClient({ userId, hasPaidPlan }: CTAButtonClientProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SignedOut>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <SignInButton mode="modal" forceRedirectUrl="/#pricing">
            <Button size="lg" className={`w-full sm:w-auto`}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignInButton>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }}>
          <Button asChild size="lg" className={`w-full sm:w-auto`}>
            <Link href="/#pricing">View Pricing Plans</Link>
          </Button>
        </motion.div>
      </SignedOut>

      {userId && hasPaidPlan && (
        <SignedIn>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Button size="lg" asChild className={`w-full sm:w-auto`}>
              <Link href="/dashboard" className="flex items-center justify-center">
                Go To Dashboard <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </SignedIn>
      )}

      {userId && !hasPaidPlan && (
        <SignedIn>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Button size="lg" asChild className={`w-full sm:w-auto`}>
              <Link href="/#pricing" className="flex items-center justify-center">
                Choose a Plan <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }}>
            <Button size="lg" asChild className={`w-full sm:w-auto`}>
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </SignedIn>
      )}
    </div>
  );
}
