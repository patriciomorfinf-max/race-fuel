"use client";

import { useEffect, useState } from "react";
import { tiers, assumptions, scenarioPresets } from "@/lib/pricingData";
import { calculatePricing } from "@/lib/calculatePricing";

interface SavedScenario {
  id: string;
  name: string;
  free_users: number;
  conversion_pct: number;
  coach_accounts: number;
  monthly_revenue: number;
  annual_revenue: number;
  created_at: string;
}

export default function PricingPage() {
  const [freeUsers, setFreeUsers] = useState(500);
  const [conversionPct, setConversionPct] = useState(5);
  const [coachAccounts, setCoachAccounts] = useState(3);
  const [activeScenario, setActiveScenario] = useState<"conservative" | "optimistic" | "custom">("conservative");
  const [scenarioName, setScenarioName] = useState("");
  const [saved, setSaved] = useState<SavedScenario[]>([]);
  const [saving, setSaving] = useState(false);

  const result = calculatePricing({ freeUsers, conversionPct, coachAccounts });

  useEffect(() => {
    loadScenarios();
  }, []);

  async function loadScenarios() {
    try {
      const res = await fetch("/api/pricing-scenarios");
      const data = await res.json();
      if (Array.isArray(data)) setSaved(data);
    } catch {
      // Supabase may be paused/unreachable; fail quietly in the UI.
    }
  }

  function applyPreset(id: "conservative" | "optimistic") {
    const preset = scenarioPresets.find((p) => p.id === id)!;
    setFreeUsers(preset.freeUsers);
    setConversionPct(preset.conversionPct);
    setCoachAccounts(preset.coachAccounts);
    setActiveScenario(id);
  }

  async function saveScenario() {
    if (!scenarioName) return;
    setSaving(true);
    await fetch("/api/pricing-scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: scenarioName,
        free_users: freeUsers,
        conversion_pct: conversionPct,
        coach_accounts: coachAccounts,
        monthly_revenue: result.monthlyRevenue,
        annual_revenue: result.annualRevenue,
      }),
    });
    setScenarioName("");
    setSaving(false);
    await loadScenarios();
  }

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Pricing &amp; revenue simulator</h1>
      <p className="mt-2 text-slate-400">Three tiers, two customer segments, and an interactive calculator to model revenue.</p>

      {/* Pricing tiers */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="font-semibold text-white">{t.name}</h3>
            <p className="mt-2 text-2xl font-bold text-orange-400">
              ${t.monthlyPrice.toFixed(2)}<span className="text-sm text-slate-500">/mo</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{t.segment}</p>
            <p className="mt-3 text-sm text-slate-400">{t.tagline}</p>
          </div>
        ))}
      </div>

      {/* Scenario toggle + calculator */}
      <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-400">Scenario:</span>
          {scenarioPresets.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeScenario === p.id
                  ? "bg-orange-500 text-slate-950"
                  : "border border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {p.label}
            </button>
          ))}
          {activeScenario === "custom" && (
            <span className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-400">Custom</span>
          )}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm text-slate-400">
              Free users
              <input
                type="number"
                min={0}
                value={freeUsers}
                onChange={(e) => { setFreeUsers(Number(e.target.value)); setActiveScenario("custom"); }}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white outline-none focus:border-orange-500"
              />
            </label>
            <label className="block text-sm text-slate-400">
              Conversion to Plus (%)
              <input
                type="number"
                min={0}
                max={100}
                value={conversionPct}
                onChange={(e) => { setConversionPct(Number(e.target.value)); setActiveScenario("custom"); }}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white outline-none focus:border-orange-500"
              />
            </label>
            <label className="block text-sm text-slate-400">
              Coach accounts
              <input
                type="number"
                min={0}
                value={coachAccounts}
                onChange={(e) => { setCoachAccounts(Number(e.target.value)); setActiveScenario("custom"); }}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white outline-none focus:border-orange-500"
              />
            </label>
          </div>

          <div className="flex flex-col justify-center rounded-lg bg-slate-950 p-6 text-center">
            <p className="text-sm text-slate-500">Plus subscribers</p>
            <p className="text-xl font-semibold text-white">{result.plusSubscribers}</p>
            <p className="mt-4 text-sm text-slate-500">Monthly revenue</p>
            <p className="text-3xl font-bold text-orange-400">${result.monthlyRevenue.toLocaleString()}</p>
            <p className="mt-4 text-sm text-slate-500">Annual revenue</p>
            <p className="text-xl font-semibold text-white">${result.annualRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <input
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            placeholder="Name this scenario..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-2 text-sm text-white outline-none focus:border-orange-500"
          />
          <button
            onClick={saveScenario}
            disabled={saving || !scenarioName}
            className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save scenario"}
          </button>
        </div>
      </section>

      {/* Assumptions table */}
      <section className="mt-12">
        <h2 className="font-semibold text-white">Assumptions</h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr><th className="py-2">Assumption</th><th>Value</th><th>Rationale</th></tr>
          </thead>
          <tbody className="text-slate-300">
            {assumptions.map((a) => (
              <tr key={a.label} className="border-t border-slate-800">
                <td className="py-2 font-medium text-white">{a.label}</td>
                <td>{a.value}</td>
                <td className="text-slate-400">{a.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Saved scenarios */}
      <section className="mt-12">
        <h2 className="font-semibold text-white">Saved scenarios</h2>
        {saved.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No scenarios saved yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Name</th><th>Free users</th><th>Conv. %</th><th>Coach accts</th><th>Monthly</th><th>Annual</th></tr>
            </thead>
            <tbody className="text-slate-300">
              {saved.map((s) => (
                <tr key={s.id} className="border-t border-slate-800">
                  <td className="py-2 font-medium text-white">{s.name}</td>
                  <td>{s.free_users}</td>
                  <td>{s.conversion_pct}%</td>
                  <td>{s.coach_accounts}</td>
                  <td>${Number(s.monthly_revenue).toLocaleString()}</td>
                  <td>${Number(s.annual_revenue).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
