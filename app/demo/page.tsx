import Link from "next/link";
import { walkthrough, agents, impactChecks, roadmap } from "@/lib/demoData";

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Guided demo</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        A 5-minute walkthrough of the whole Race Fuel venture. Follow the steps in order; each one opens a live page and
        tells you what to look for. AI outputs on this site are <strong className="text-slate-200">simulated</strong> and labelled as such.
      </p>

      {/* Walkthrough */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">1. Walkthrough</h2>
        <ol className="mt-4 space-y-3">
          {walkthrough.map((s) => (
            <li key={s.step} className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-slate-950">
                {s.step}
              </span>
              <div className="flex-1">
                <Link href={s.href} className="font-semibold text-white hover:text-orange-400">
                  {s.title} <span className="text-sm font-normal text-orange-400">{s.href}</span>
                </Link>
                <p className="mt-1 text-sm text-slate-300">{s.what}</p>
                <p className="mt-1 text-sm text-slate-500">Look for: {s.look}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Agent map */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">2. Agent map</h2>
        <p className="mt-2 text-sm text-slate-400">
          Each module is a small agent: it takes an input, produces an output and saves a record. None of them call a paid AI API.
        </p>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="mx-auto mb-4 w-fit rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-slate-950">
            Race Fuel site (Next.js on Vercel)
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <div key={a.name} className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm">
                <p className="font-semibold text-white">{a.name}</p>
                <p className="text-xs text-orange-400">{a.page} · {a.type}</p>
                <p className="mt-2 text-slate-400"><span className="text-slate-500">Input:</span> {a.input}</p>
                <p className="text-slate-400"><span className="text-slate-500">→ Output:</span> {a.output}</p>
                <p className="text-slate-400"><span className="text-slate-500">→ Saves to:</span> {a.stores}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">All records are stored in Supabase and summarized on <Link href="/dashboard" className="text-orange-400 underline">/dashboard</Link>.</p>
        </div>
      </section>

      {/* Impact check */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">3. Practical impact check</h2>
        <p className="mt-2 text-sm text-slate-400">What could go wrong, and what the product does about it.</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr><th className="p-3">Risk</th><th className="p-3">Mitigation</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody>
              {impactChecks.map((r) => (
                <tr key={r.risk} className="border-t border-slate-800 align-top">
                  <td className="p-3"><p className="font-medium text-white">{r.risk}</p><p className="text-xs text-slate-500">{r.detail}</p></td>
                  <td className="p-3 text-slate-300">{r.mitigation}</td>
                  <td className="p-3 text-slate-300">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">4. Version 2 roadmap</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {roadmap.map((r) => (
            <div key={r.phase} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-orange-400">{r.phase}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {r.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
