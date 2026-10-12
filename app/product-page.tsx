import { featureMap, tiers } from "@/lib/pricingData";

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Product architecture</h1>
      <p className="mt-2 text-slate-400">What each tier unlocks, mapped across every feature Race Fuel ships.</p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-3">Feature</th>
              {tiers.map((t) => (
                <th key={t.id} className="py-3 text-center">{t.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMap.map((row) => (
              <tr key={row.feature} className="border-b border-slate-800/60">
                <td className="py-3 text-slate-200">{row.feature}</td>
                <td className="text-center">{row.free ? "✅" : "—"}</td>
                <td className="text-center">{row.plus ? "✅" : "—"}</td>
                <td className="text-center">{row.coach ? "✅" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h3 className="font-semibold text-white">{t.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-orange-400">{t.segment}</p>
            <p className="mt-3 text-sm text-slate-400">{t.tagline}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
