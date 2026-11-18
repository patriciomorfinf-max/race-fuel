"use client";

import { useEffect, useState } from "react";
import { externalTests, changeFromFeedback, regressionChecks } from "@/lib/testingData";

interface DashboardData {
  counts: Record<string, number>;
  recent: {
    core_outputs: { sport: string | null; duration_min: number | null; carb_target_g_h: number | null; sodium_target_mg_h: number | null; created_at: string }[];
    pricing_scenarios: { name: string; monthly_revenue: number | null; created_at: string }[];
    marketing_assets: { asset_type: string; created_at: string }[];
    chat_sessions: { sport: string | null; duration: string | null; experience: string | null; created_at: string }[];
  };
  ab: { a: number; b: number };
  feedback: { up: number; down: number };
  errors: string[];
}

const LABELS: Record<string, string> = {
  core_outputs: "Race plans (core)",
  research_signals: "Research votes",
  pricing_scenarios: "Pricing scenarios",
  marketing_assets: "Marketing assets",
  ab_test_votes: "A/B votes",
  chat_sessions: "Saved chats",
  chat_feedback: "Chat ratings",
};

function when(iso: string) {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function RecentList({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">No records yet.</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-slate-300">
          {rows.map((r, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span>{r[0]}</span>
              <span className="text-slate-500">{r[1]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Could not load dashboard data."));
  }, []);

  const rated = externalTests.filter((t) => t.rating !== null);
  const avg = rated.length ? (rated.reduce((a, t) => a + (t.rating ?? 0), 0) / rated.length).toFixed(1) : "—";

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Live records from the database, plus the testing summary. Only counts and non-personal fields are shown — never free
        text or chat messages.
      </p>

      {error && <p className="mt-6 text-red-400">{error}</p>}
      {!data && !error && <p className="mt-6 text-slate-500">Loading…</p>}

      {data && (
        <>
          {data.errors.length > 0 && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              Some data could not be read: {data.errors.join(" · ")}
            </p>
          )}

          <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Object.entries(LABELS).map(([k, label]) => (
              <div key={k} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-3xl font-bold text-orange-400">{data.counts[k] ?? 0}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white">A/B headline test</h3>
              <p className="mt-2 text-sm text-slate-300">A — “Never bonk on race day again.”: <strong>{data.ab.a}</strong> votes</p>
              <p className="text-sm text-slate-300">B — “Your fueling plan, built in 2 minutes.”: <strong>{data.ab.b}</strong> votes</p>
              <p className="mt-1 text-xs text-slate-500">
                {data.ab.a + data.ab.b === 0 ? "No votes yet." : data.ab.a === data.ab.b ? "Currently tied." : `Currently leading: ${data.ab.a > data.ab.b ? "A" : "B"}. Small sample — not statistically conclusive.`}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="font-semibold text-white">Chat feedback</h3>
              <p className="mt-2 text-sm text-slate-300">👍 {data.feedback.up} · 👎 {data.feedback.down}</p>
            </div>
          </section>

          <section className="mt-4 grid gap-4 md:grid-cols-2">
            <RecentList title="Latest race plans" rows={data.recent.core_outputs.map((r) => [`${r.sport ?? "—"}, ${r.duration_min ?? "?"} min · ${r.carb_target_g_h ?? "?"} g/h carbs, ${r.sodium_target_mg_h ?? "?"} mg/h sodium`, when(r.created_at)])} />
            <RecentList title="Latest pricing scenarios" rows={data.recent.pricing_scenarios.map((r) => [`${r.name} · $${r.monthly_revenue ?? "?"}/mo`, when(r.created_at)])} />
            <RecentList title="Latest marketing assets" rows={data.recent.marketing_assets.map((r) => [r.asset_type, when(r.created_at)])} />
            <RecentList title="Latest saved chats" rows={data.recent.chat_sessions.map((r) => [`${r.sport ?? "—"}, ${r.duration ?? "?"} h, ${r.experience ?? "—"}`, when(r.created_at)])} />
          </section>
        </>
      )}

      {/* Testing summary */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-white">Testing summary</h2>
        <p className="mt-2 text-sm text-slate-400">
          5 external users in total, plus a full-site regression check. Average rating so far: <strong className="text-slate-200">{avg}/5</strong> ({rated.length} of {externalTests.length} tests completed).
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr><th className="p-3">Tester</th><th className="p-3">Task</th><th className="p-3">What happened</th><th className="p-3">Rating</th><th className="p-3">Issue found</th></tr>
            </thead>
            <tbody>
              {externalTests.map((t) => (
                <tr key={t.id} className="border-t border-slate-800 align-top text-slate-300">
                  <td className="p-3">{t.tester}</td>
                  <td className="p-3">{t.task}</td>
                  <td className="p-3">{t.status === "pending" ? <span className="text-slate-500">Pending</span> : t.whatHappened}</td>
                  <td className="p-3">{t.rating ?? "—"}</td>
                  <td className="p-3">{t.issue || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm">
          <p className="font-semibold text-orange-300">Change made from tester feedback</p>
          <p className="mt-1 text-slate-300"><span className="text-slate-500">Feedback:</span> {changeFromFeedback.feedback}</p>
          <p className="text-slate-300"><span className="text-slate-500">Change:</span> {changeFromFeedback.change}</p>
        </div>

        <h3 className="mt-6 font-semibold text-white">Full-site regression</h3>
        <ul className="mt-2 grid gap-1 text-sm text-slate-300 md:grid-cols-2">
          {regressionChecks.map((c) => (
            <li key={c.area + c.check} className="flex justify-between gap-3 rounded border border-slate-800 px-3 py-1.5">
              <span><span className="font-mono text-orange-400">{c.area}</span> — {c.check}</span>
              <span className={c.result === "PASS" ? "text-emerald-400" : "text-red-400"}>{c.result}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
