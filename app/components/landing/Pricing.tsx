import { PricingTable } from "@clerk/nextjs";
import { Check, Minus } from "lucide-react";

export default function Pricing() {
  return (
    <div className="w-full pb-32 pt-24" id="pricing">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Build your own AI-powered news digest from Turkish RSS sources – pick the plan that
          matches how deep you want to go.
        </p>
      </div>

      {/* Clerk Pricing Table */}
      <div className="mt-16 flex justify-center px-4">
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

      {/* FAQ */}
      <section className="mt-24 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-slate-900 text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold">
              What&apos;s the difference between Starter and Pro?
            </h3>
            <p className="text-slate-600 mt-2">
              Starter is great if you want a single daily AI summary from a small set of
              RSS sources. Pro is designed for heavier users who need unlimited feeds, up
              to 3 daily digests, stronger AI summarization, automation, and alerts.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Can I switch plans later?</h3>
            <p className="text-slate-600 mt-2">
              Yes. You can upgrade or downgrade at any time. When you upgrade, the changes
              take effect immediately, and when you downgrade, you keep access until the
              end of your current billing period.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Do you lock me into a contract?</h3>
            <p className="text-slate-600 mt-2">
              No. All plans are month-to-month. You can cancel directly from your account
              settings whenever you like.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              What happens if I hit my limits on Starter?
            </h3>
            <p className="text-slate-600 mt-2">
              If you try to add more than 5 sources or generate more summaries than your
              plan allows, we&apos;ll simply ask you to upgrade to Pro. We never silently
              delete or throttle your existing data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
