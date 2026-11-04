import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { tallyVotes } from "@/lib/abTest";

export async function GET() {
  const { data, error } = await supabase.from("ab_test_votes").select("headline_id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const counts = tallyVotes((data || []).map((row) => row.headline_id));
  return NextResponse.json(counts);
}

export async function POST(req: NextRequest) {
  const { headline_id } = await req.json();

  if (headline_id !== "a" && headline_id !== "b") {
    return NextResponse.json({ error: "headline_id must be 'a' or 'b'." }, { status: 400 });
  }

  const { error } = await supabase.from("ab_test_votes").insert({ headline_id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
