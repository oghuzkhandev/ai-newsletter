'use client';

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTAButtonClientProps {
  userId: string | null | undefined; 
  hasPaidPlan: boolean;
}


export default function CTAButtonClient({ userId, hasPaidPlan }: CTAButtonClientProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/#pricing">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
        <Button asChild>
          <Link href="/#pricing">View Pricing Plans</Link>
        </Button>
      </SignedOut>

      {userId && hasPaidPlan && (
        <SignedIn>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link
              href="/dashboard"
              className="flex items-center justify-center"
            >
              Go To Dashboard <ArrowRight className="ml-2 size-4" />{" "}
            </Link>
          </Button>
        </SignedIn>
      )}
      
      {userId && !hasPaidPlan && (
        <SignedIn>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/#pricing" className="flex items-center justify-center">
              Choose a Plan <ArrowRight className="ml-2 size-4" />{" "}
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto">
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </SignedIn>
      )}
    </div>
  );
}