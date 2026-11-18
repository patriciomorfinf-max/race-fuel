import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { tallyVotes } from "@/lib/abTest";

// Dashboard data. Only counts and non-personal fields are returned:
// never raw race descriptions, notes or chat messages.
export const dynamic = "force-dynamic";

const TABLES = [
  "core_outputs",
  "research_signals",
  "pricing_scenarios",
  "marketing_assets",
  "ab_test_votes",
  "chat_sessions",
  "chat_feedback",
] as const;

export async function GET() {
  const errors: string[] = [];

  const counts: Record<string, number> = {};
  await Promise.all(
    TABLES.map(async (t) => {
      const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
      if (error) errors.push(`${t}: ${error.message}`);
      counts[t] = count ?? 0;
    })
  );

  const [core, pricing, assets, votes, sessions, feedback] = await Promise.all([
    supabase.from("core_outputs").select("sport, duration_min, carb_target_g_h, sodium_target_mg_h, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("pricing_scenarios").select("name, monthly_revenue, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("marketing_assets").select("asset_type, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("ab_test_votes").select("headline_id"),
    supabase.from("chat_sessions").select("sport, duration, experience, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("chat_feedback").select("rating"),
  ]);

  for (const [label, r] of [["core_outputs", core], ["pricing_scenarios", pricing], ["marketing_assets", assets], ["ab_test_votes", votes], ["chat_sessions", sessions], ["chat_feedback", feedback]] as const) {
    if (r.error) errors.push(`${label}: ${r.error.message}`);
  }

  const fb = feedback.data ?? [];
  return NextResponse.json({
    counts,
    recent: {
      core_outputs: core.data ?? [],
      pricing_scenarios: pricing.data ?? [],
      marketing_assets: assets.data ?? [],
      chat_sessions: sessions.data ?? [],
    },
    ab: tallyVotes((votes.data ?? []).map((v) => v.headline_id)),
    feedback: {
      up: fb.filter((f) => f.rating === "up").length,
      down: fb.filter((f) => f.rating === "down").length,
    },
    errors,
  });
}
