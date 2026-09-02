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
          The{" "}
          <a href="/core" className="text-orange-400 underline">
            /core
          </a>{" "}
          page uses a{" "}
          <strong className="text-slate-200">simulated, rule-based extraction</strong>{" "}
          this week — not a real AI model call — so it runs for free with no
          API key required. It is labeled &quot;Simulated&quot; directly on the
          output card, per course rules.
        </p>
        <p className="mt-4 text-sm text-slate-400">The exact rules used:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-300">
{`Sport detection:
  "triathlon" / "ironman" / "70.3" / "half iron"  -> triathlon
  "bike" / "cycling" / "cyclist"                  -> bike
  "run" / "running" / "marathon" / "5k" / "10k"    -> run

Weight: regex match for "NN kg" or "NN lbs" (converted to kg)

Duration: regex match for "H:MM", "N hours", or "N minutes";
  falls back to a typical duration for the detected sport if
  nothing is stated (flagged in the note as an estimate)

Carb target:  60 g/h by default, 75 g/h if sweat/cramping mentioned
Sodium target: 500 mg/h by default, 800 mg/h if sweat/cramping mentioned

Sweat/cramping signal words: "cramp", "heavy sweat", "sweat a lot",
  "hot weather", "heat", "humid"`}
        </pre>
      </section>
    </main>
  );
}
