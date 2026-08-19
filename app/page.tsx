export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-400">
          For runners, cyclists &amp; triathletes
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Never bonk on race day again.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Race Fuel turns your weight, race duration and nutrition targets into a
          precise, hour-by-hour fueling plan — built from the products you
          already carry.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-orange-500/50 px-6 py-3 font-semibold text-slate-950"
            title="Coming soon"
          >
            Build my fueling plan
          </button>
          <a
            href="/docs"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Read the docs
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          The fueling calculator is coming in a future release. This week: core
          infrastructure.
        </p>
      </section>

      {/* Feature preview cards */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-3">
        {[
          {
            title: "Athlete & Race",
            desc: "Enter your weight, discipline and race duration.",
          },
          {
            title: "Nutrition Goals",
            desc: "Set your carb, sodium and fluid targets per hour.",
          },
          {
            title: "Your Fueling Plan",
            desc: "Get a minute-by-minute timeline of what to consume.",
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
    </main>
  );
}
