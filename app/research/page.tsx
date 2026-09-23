"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { competitors, gapAnalysis } from "@/lib/researchData";

type Tally = { yes: number; no: number };

function Check({ value }: { value: boolean }) {
  return value ? (
    <span className="text-emerald-400">✓</span>
  ) : (
    <span className="text-slate-600">✕</span>
  );
}

export default function ResearchPage() {
  // --- Poll state ---
  const [tally, setTally] = useState<Tally>({ yes: 0, no: 0 });
  const [tallyError, setTallyError] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [note, setNote] = useState("");
  const [pendingVote, setPendingVote] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const loadTally = useCallback(async () => {
    const { data, error } = await supabase.from("research_signals").select("struggled");
    if (error) {
      setTallyError("Could not reach Supabase.");
      return;
    }
    setTallyError(null);
    const yes = (data ?? []).filter((r) => r.struggled).length;
    const no = (data ?? []).length - yes;
    setTally({ yes, no });
  }, []);

  useEffect(() => {
    loadTally();
  }, [loadTally]);

  function chooseVote(struggled: boolean) {
    setPendingVote(struggled);
  }

  async function submitVote() {
    if (pendingVote === null) return;
    try {
      const { error } = await supabase
        .from("research_signals")
        .insert({ struggled: pendingVote, note: note.trim() || null });
      if (error) throw error;
      setStatus("Thanks — response saved ✓");
      setVoted(true);
      await loadTally();
    } catch {
      setStatus("Could not save your response — please try again.");
    }
  }

  // --- Table filter state ---
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"all" | "Global" | "Mexico/LatAm">("all");

  const filtered = useMemo(() => {
    return competitors.filter((c) => {
      const matchesQuery =
        !query.trim() ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.whatItDoes.toLowerCase().includes(query.toLowerCase());
      const matchesRegion = regionFilter === "all" || c.region === regionFilter;
      return matchesQuery && matchesRegion;
    });
  }, [query, regionFilter]);

  const total = tally.yes + tally.no;
  const yesPct = total ? Math.round((tally.yes / total) * 100) : 0;
  const noPct = total ? 100 - yesPct : 0;

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Research &amp; Benchmarking</h1>
      <p className="mt-2 max-w-2xl text-slate-400">
        Is &quot;I don&apos;t know how much or when to fuel during a race&quot; a real problem — and is it
        already solved by something else? This page collects a live signal from real visitors and
        lays out the researched competitive landscape.
      </p>

      {/* --- Poll --- */}
      <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="font-semibold text-white">
          Have you ever struggled to know exactly what/how much to eat or drink during a race?
        </h2>

        {!voted ? (
          <>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => chooseVote(true)}
                className={`flex-1 rounded-lg border py-3 font-semibold transition ${
                  pendingVote === true
                    ? "border-orange-500 bg-orange-500 text-slate-950"
                    : "border-slate-700 text-slate-200 hover:border-slate-500"
                }`}
              >
                Yes, often
              </button>
              <button
                onClick={() => chooseVote(false)}
                className={`flex-1 rounded-lg border py-3 font-semibold transition ${
                  pendingVote === false
                    ? "border-orange-500 bg-orange-500 text-slate-950"
                    : "border-slate-700 text-slate-200 hover:border-slate-500"
                }`}
              >
                No, not really
              </button>
            </div>
            {pendingVote !== null && (
              <>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional: say more (not required)"
                  className="mt-4 w-full rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={submitVote}
                  className="mt-4 rounded-lg bg-orange-500 px-6 py-2 font-semibold text-slate-950 transition hover:bg-orange-400"
                >
                  Submit response
                </button>
              </>
            )}
          </>
        ) : (
          <p className="mt-4 text-sm text-emerald-400">{status}</p>
        )}

        {status && !voted && <p className="mt-3 text-sm text-red-400">{status}</p>}

        {/* Live tally */}
        <div className="mt-6 space-y-2">
          {tallyError ? (
            <p className="text-sm text-slate-500">{tallyError}</p>
          ) : (
            <>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-20 text-slate-400">Yes, often</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-3 bg-orange-500" style={{ width: `${yesPct}%` }} />
                </div>
                <span className="w-8 text-right text-slate-400">{tally.yes}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-20 text-slate-400">No, not really</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-3 bg-slate-500" style={{ width: `${noPct}%` }} />
                </div>
                <span className="w-8 text-right text-slate-400">{tally.no}</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* --- Competitor table --- */}
      <section className="mt-12">
        <h2 className="font-semibold text-white">Competitive landscape</h2>
        <p className="mt-1 text-sm text-slate-400">
          {competitors.length} real, cited competitors and substitutes — global and Mexico/LatAm.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description…"
            className="flex-1 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value as typeof regionFilter)}
            className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-sm text-slate-100"
          >
            <option value="all">All regions</option>
            <option value="Global">Global</option>
            <option value="Mexico/LatAm">Mexico/LatAm</option>
          </select>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-900/60 text-slate-400">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">What it does</th>
                <th className="p-3 text-center">Instant</th>
                <th className="p-3 text-center">Free</th>
                <th className="p-3 text-center">No signup</th>
                <th className="p-3 text-center">Uses your products</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.name} className="border-t border-slate-800">
                  <td className="p-3 text-slate-200">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.source}</div>
                  </td>
                  <td className="p-3 text-slate-400">{c.category}</td>
                  <td className="p-3 text-slate-400">{c.whatItDoes}</td>
                  <td className="p-3 text-center"><Check value={c.instant} /></td>
                  <td className="p-3 text-center"><Check value={c.free} /></td>
                  <td className="p-3 text-center"><Check value={c.noSignup} /></td>
                  <td className="p-3 text-center"><Check value={c.usesYourProducts} /></td>
                </tr>
              ))}
              <tr className="border-t border-slate-800 bg-orange-500/10">
                <td className="p-3 font-semibold text-orange-400">Race Fuel (this product)</td>
                <td className="p-3 text-orange-300">Calculator</td>
                <td className="p-3 text-orange-300">
                  Hour-by-hour carb/sodium plan generated from your race and your own products.
                </td>
                <td className="p-3 text-center"><Check value={true} /></td>
                <td className="p-3 text-center"><Check value={true} /></td>
                <td className="p-3 text-center"><Check value={true} /></td>
                <td className="p-3 text-center"><Check value={true} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Gap analysis --- */}
      <section className="mt-12 rounded-xl border border-orange-900 bg-orange-950/20 p-6">
        <h2 className="font-semibold text-orange-400">Gap analysis</h2>
        <p className="mt-2 text-sm text-slate-300">{gapAnalysis}</p>
      </section>
    </main>
  );
}
