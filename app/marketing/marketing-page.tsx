"use client";

import { useEffect, useState } from "react";
import {
  persona, landingCopy, socialPosts, videoScripts, campaignCalendar, abHeadlines,
} from "@/lib/marketingData";

type Tab = "persona" | "copy" | "social" | "video" | "calendar" | "abtest";

interface SavedAsset {
  id: string;
  asset_type: string;
  content: string;
  created_at: string;
}

export default function MarketingPage() {
  const [tab, setTab] = useState<Tab>("persona");
  const [saved, setSaved] = useState<SavedAsset[]>([]);
  const [votes, setVotes] = useState<{ a: number; b: number }>({ a: 0, b: 0 });
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    loadAssets();
    loadVotes();
  }, []);

  async function loadAssets() {
    try {
      const res = await fetch("/api/marketing-assets");
      const data = await res.json();
      if (Array.isArray(data)) setSaved(data);
    } catch {}
  }

  async function loadVotes() {
    try {
      const res = await fetch("/api/ab-test");
      const data = await res.json();
      setVotes({ a: data.a || 0, b: data.b || 0 });
    } catch {}
  }

  async function saveAsset(asset_type: string, content: string) {
    await fetch("/api/marketing-assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asset_type, content }),
    });
    await loadAssets();
  }

  async function vote(headline_id: "a" | "b") {
    await fetch("/api/ab-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headline_id }),
    });
    setVoted(true);
    await loadVotes();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "persona", label: "Persona" },
    { id: "copy", label: "Landing Copy" },
    { id: "social", label: "Social Posts" },
    { id: "video", label: "Video Scripts" },
    { id: "calendar", label: "14-Day Calendar" },
    { id: "abtest", label: "A/B Test" },
  ];

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Marketing engine</h1>
      <p className="mt-2 text-slate-400">Brand system, content, and an A/B tested launch calendar for Race Fuel.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-orange-500 text-slate-950" : "border border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "persona" && (
        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold text-white">{persona.name}</h2>
          <p className="mt-1 text-sm text-slate-500">Age: {persona.age}</p>
          <p className="mt-3 text-sm text-slate-300">{persona.summary}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-orange-400">Goals</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-400">
                {persona.goals.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-orange-400">Frustrations</h3>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-400">
                {persona.frustrations.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
          <button
            onClick={() => saveAsset("persona", JSON.stringify(persona))}
            className="mt-5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            Save persona
          </button>
        </section>
      )}

      {tab === "copy" && (
        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-2xl font-bold text-white">{landingCopy.headline}</h2>
          <p className="mt-2 text-slate-400">{landingCopy.subheadline}</p>
          <div className="mt-4 flex gap-3 text-sm">
            <span className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-slate-950">{landingCopy.ctaPrimary}</span>
            <span className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200">{landingCopy.ctaSecondary}</span>
          </div>
          <button
            onClick={() => saveAsset("landing_copy", JSON.stringify(landingCopy))}
            className="mt-5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            Save landing copy
          </button>
        </section>
      )}

      {tab === "social" && (
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {socialPosts.map((post, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-400">{post.platform}</span>
              <p className="mt-2 text-sm text-slate-300">{post.text}</p>
              <button
                onClick={() => saveAsset("social_post", post.text)}
                className="mt-3 text-xs font-semibold text-orange-400 hover:text-orange-300"
              >
                Save post
              </button>
            </div>
          ))}
        </section>
      )}

      {tab === "video" && (
        <section className="mt-8 grid gap-4">
          {videoScripts.map((v, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-sm"><span className="text-orange-400">Hook: </span><span className="text-slate-300">{v.hook}</span></p>
              <p className="mt-1 text-sm"><span className="text-orange-400">Body: </span><span className="text-slate-300">{v.body}</span></p>
              <p className="mt-1 text-sm"><span className="text-orange-400">CTA: </span><span className="text-slate-300">{v.cta}</span></p>
              <button
                onClick={() => saveAsset("video_script", JSON.stringify(v))}
                className="mt-3 text-xs font-semibold text-orange-400 hover:text-orange-300"
              >
                Save script
              </button>
            </div>
          ))}
        </section>
      )}

      {tab === "calendar" && (
        <section className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-slate-500">
              <tr><th className="py-2">Day</th><th>Channel</th><th>Content</th></tr>
            </thead>
            <tbody className="text-slate-300">
              {campaignCalendar.map((d) => (
                <tr key={d.day} className="border-t border-slate-800">
                  <td className="py-2 font-medium text-white">Day {d.day}</td>
                  <td>{d.channel}</td>
                  <td>{d.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => saveAsset("campaign_calendar", JSON.stringify(campaignCalendar))}
            className="mt-5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            Save calendar
          </button>
        </section>
      )}

      {tab === "abtest" && (
        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold text-white">Headline A/B test</h2>
          <p className="mt-1 text-sm text-slate-400">Vote for the headline you'd keep for the homepage.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {abHeadlines.map((h) => (
              <div key={h.id} className="rounded-lg border border-slate-700 p-4 text-center">
                <p className="text-lg font-semibold text-white">&quot;{h.text}&quot;</p>
                <button
                  onClick={() => vote(h.id)}
                  className="mt-3 rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-semibold text-slate-950 hover:bg-orange-400"
                >
                  Vote ({votes[h.id]})
                </button>
              </div>
            ))}
          </div>
          {voted && <p className="mt-4 text-sm text-emerald-400">Thanks for voting! Counts update live.</p>}
        </section>
      )}

      {saved.length > 0 && (
        <section className="mt-12">
          <h2 className="font-semibold text-white">Saved marketing assets ({saved.length})</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-400">
            {saved.slice(0, 8).map((a) => (
              <li key={a.id}>
                <span className="text-orange-400">{a.asset_type}</span> — saved
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
