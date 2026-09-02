const EXTRACTION_PROMPT = `You extract structured endurance-race nutrition
planning fields from a free-text description an athlete writes about their race
and body. Respond with ONLY a JSON object, no prose, no markdown fences...

{
  "sport": "run" | "bike" | "triathlon" | null,
  "duration_min": number | null,
  "weight_kg": number | null,
  "carb_target_g_h": number | null,
  "sodium_target_mg_h": number | null,
  "context_note": string
}

Rules:
- If the athlete does not mention or imply a field, its value MUST be null.
- Base carb/sodium suggestions on established endurance nutrition guidelines.
- Be conservative: only suggest a target when there's a reasonable basis for it.`;

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Docs</h1>
      <p className="mt-4 text-slate-400">
        Setup guides and API documentation for Race Fuel will grow here week
        over week.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">
          Prompt library — Core extraction (Week 1)
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          This is the exact system prompt used to turn an athlete&apos;s free-text
          race description into structured nutrition targets on the{" "}
          <a href="/core" className="text-orange-400 underline">
            /core
          </a>{" "}
          page.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300">
          {EXTRACTION_PROMPT}
        </pre>
      </section>
    </main>
  );
}
