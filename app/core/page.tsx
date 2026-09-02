"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

type Extraction = {
  sport: string | null;
  duration_min: number | null;
  weight_kg: number | null;
  carb_target_g_h: number | null;
  sodium_target_mg_h: number | null;
  context_note: string;
};

type SavedRow = Extraction & { id: string; raw_description: string; created_at: string };

function field(value: number | string | null | undefined) {
  return value === null || value === undefined || value === ""
    ? "not specified"
    : String(value);
}

export default function CorePage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Extraction | null>(null);
  const [savedRows, setSavedRows] = useState<SavedRow[]>([]);
  const [loadingRows, setLoadingRows] = useState(true);

  const loadRecent = useCallback(async () => {
    setLoadingRows(true);
    const { data } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    setSavedRows((data ?? []) as SavedRow[]);
    setLoadingRows(false);
  }, []);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!description.trim()) {
      setError("Describe your race first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/core", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setResult(json.extraction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    setError(null);
    try {
      const { error: insertError } = await supabase.from("core_outputs").insert({
        raw_description: description,
        sport: result.sport,
        duration_min: result.duration_min,
        weight_kg: result.weight_kg,
        carb_target_g_h: result.carb_target_g_h,
        sodium_target_mg_h: result.sodium_target_mg_h,
        context_note: result.context_note,
      });
      if (insertError) throw new Error(insertError.message);
      await loadRecent();
      setResult(null);
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Describe your race</h1>
      <p className="mt-2 text-slate-400">
        Write it in your own words — sport, distance, and anything about your
        body that matters (sweat rate, cramping, weather).
      </p>

      <form onSubmit={handleGenerate} className="mt-8 space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='e.g. "Half Ironman in August, I sweat a lot and get cramps, I weigh 75kg"'
          rows={4}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-slate-100 placeholder:text-slate-500 focus:border-orange-500 focus:outline-none"
        />

        {error && (
          <p className="rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </form>

      {result && (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold text-white">Extracted result</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">Sport</dt>
              <dd className="text-slate-200">{field(result.sport)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Duration (min)</dt>
              <dd className="text-slate-200">{field(result.duration_min)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Weight (kg)</dt>
              <dd className="text-slate-200">{field(result.weight_kg)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Carb target (g/h)</dt>
              <dd className="text-slate-200">{field(result.carb_target_g_h)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-slate-500">Sodium target (mg/h)</dt>
              <dd className="text-slate-200">{field(result.sodium_target_mg_h)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-slate-400">{result.context_note}</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full rounded-lg border border-orange-500 py-2 font-semibold text-orange-400 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-semibold text-white">Recent extractions</h2>
        {loadingRows && <p className="mt-2 text-sm text-slate-500">Loading…</p>}
        {!loadingRows && savedRows.length === 0 && (
          <p className="mt-2 text-sm text-slate-500">No saved extractions yet.</p>
        )}
        <div className="mt-4 space-y-3">
          {savedRows.map((row) => (
            <div
              key={row.id}
              className="rounded-lg border border-slate-800 bg-slate-900/30 p-4 text-sm"
            >
              <p className="text-slate-300">{row.raw_description}</p>
              <p className="mt-2 text-xs text-slate-500">
                {field(row.sport)} · {field(row.duration_min)} min ·{" "}
                {field(row.carb_target_g_h)} g/h carbs ·{" "}
                {field(row.sodium_target_mg_h)} mg/h sodium
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
