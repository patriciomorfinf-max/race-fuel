import Link from "next/link";
import { landingCopy } from "@/lib/marketingData";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-400">
          For runners, cyclists &amp; triathletes
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {landingCopy.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          {landingCopy.subheadline}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/core"
            className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            {landingCopy.ctaPrimary}
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-500"
          >
            {landingCopy.ctaSecondary}
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-3">
        {[
          {
            title: "Describe your race",
            desc: "Tell us about your race and body in your own words.",
          },
          {
            title: "AI extraction",
            desc: "We turn that into structured nutrition targets.",
          },
          {
            title: "Plans, pricing & support",
            desc: "Free, Plus and Coach tiers — plus a guided assistant if you get stuck.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <h3 className="font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
        <Link href="/chat" className="text-sm font-semibold text-orange-400 hover:text-orange-300">
          Have a question? Chat with our guided assistant →
        </Link>
      </section>
    </main>
  );
}
