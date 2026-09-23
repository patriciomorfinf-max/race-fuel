export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Docs</h1>
      <p className="mt-4 text-slate-400">Setup guides and documentation for Race Fuel, growing week over week.</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Prompt library — Core extraction (Week 1)</h2>
        <p className="mt-2 text-sm text-slate-400">
          The <a href="/core" className="text-orange-400 underline">/core</a> page uses a{" "}
          <strong className="text-slate-200">simulated, rule-based extraction</strong> — not a real AI model call — so it runs for free with no API key required.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Research sources — Week 2</h2>
        <p className="mt-2 text-sm text-slate-400">
          The <a href="/research" className="text-orange-400 underline">/research</a> page's competitor table is hand-researched
          with cited sources — see the page itself for links to every product listed.
        </p>
      </section>
    </main>
  );
}
