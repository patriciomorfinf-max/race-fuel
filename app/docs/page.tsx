const macroPrompt = `ROLE: You are my disciplined AI-native product architect and coding partner.
COURSE RULE: Do not let me code before the plan is clear.
TASK: Help me complete this week's Build Discipline Packet, then create a precise implementation prompt.
CONSTRAINTS: Free tools only. Next.js + Tailwind + Vercel + GitHub + Supabase. Small, testable features.
No paid APIs; label simulated AI output. Require acceptance criteria before coding.`;

const promptLibrary = [
  { week: "Week 1 — /core", prompt: "Build an intake form that turns a free-text race description into carb and sodium targets using simulated, rule-based extraction, and save each result to Supabase (core_outputs)." },
  { week: "Week 2 — /research", prompt: "Build a research page with a hand-researched competitor table (with sources) and a Yes/No signal that saves to Supabase and shows a live tally. Add both insert and select policies." },
  { week: "Week 3 — /product, /pricing", prompt: "Build a feature-by-tier table and a live revenue calculator with a Conservative/Optimistic toggle and saved scenarios (pricing_scenarios)." },
  { week: "Week 4 — /marketing", prompt: "Build a 6-tab content system: persona, landing copy, 10 social posts, 3 video scripts, a 14-day calendar and a persisted A/B headline vote. Extract vote counting into a testable function." },
  { week: "Week 5 — /chat", prompt: "Build a guided chat with 3 ordered intake questions, a medical guardrail, an always-visible simulated-assistant notice, thumbs up/down ratings and a save-conversation button." },
  { week: "Week 5 fix", prompt: "Test the guardrail with ordinary sentences, then fix substring false positives (\"accurate\", \"secure\") without letting medical questions through." },
  { week: "Week 6 — /demo, /dashboard", prompt: "Integrate all pages: guided demo, dashboard of live records (counts and non-personal fields only), agent map, impact check, testing summary and v2 roadmap. Change the chat's carb and sodium answers using tester feedback." },
];

const buildLog = [
  { week: "Week 0 — Setup (Aug 19)", notes: "Next.js, Tailwind, GitHub, Vercel and Supabase connected; homepage and navigation deployed." },
  { week: "Week 1 — Core agent (Sep 2, Sep 11)", notes: "/core with simulated extraction and Supabase save. Fixed: homepage button path and a misplaced page file." },
  { week: "Week 2 — Research (Sep 23)", notes: "/research with cited competitor data and a live tally. Lesson: tables that are read back need both insert and select policies." },
  { week: "Week 3 — Product and pricing (Oct 11)", notes: "/product and /pricing with saved scenarios. Fixed: pages and an API route uploaded to the wrong folders (404s)." },
  { week: "Week 4 — Marketing (Nov 4)", notes: "/marketing with 6 tabs and A/B vote. Fixed: page file named wrongly after a deletion (404)." },
  { week: "Week 5 — Chat (Nov 4–6)", notes: "/chat with intake, guardrail, ratings and saved chats. Fixed: guardrail false positives; thumbs buttons made visibly clickable." },
  { week: "Week 6 — Integration (Nov 18)", notes: "/demo, /dashboard, impact check, testing summary and roadmap. Changed: chat gives narrower carb and sodium guidance from the intake, after tester feedback." },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Docs</h1>
      <p className="mt-4 text-slate-400">Prompt library and build logs for Race Fuel, week by week.</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">How the AI parts work</h2>
        <p className="mt-2 text-sm text-slate-400">
          The <a href="/core" className="text-orange-400 underline">/core</a> extraction and the{" "}
          <a href="/chat" className="text-orange-400 underline">/chat</a> assistant are{" "}
          <strong className="text-slate-200">simulated, rule-based</strong> — not real AI model calls — so they run for free with no API key.
          The <a href="/research" className="text-orange-400 underline">/research</a> competitor table is hand-researched with cited sources.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Prompt library</h2>
        <p className="mt-2 text-sm text-slate-400">The macro-prompt pattern used at the start of every week:</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-900 p-4 text-xs text-slate-300">{macroPrompt}</pre>
        <div className="mt-4 space-y-3">
          {promptLibrary.map((p) => (
            <div key={p.week} className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm font-semibold text-orange-400">{p.week}</p>
              <p className="mt-1 text-sm text-slate-300">{p.prompt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Build logs</h2>
        <ul className="mt-3 space-y-3">
          {buildLog.map((b) => (
            <li key={b.week} className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm font-semibold text-white">{b.week}</p>
              <p className="mt-1 text-sm text-slate-400">{b.notes}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
