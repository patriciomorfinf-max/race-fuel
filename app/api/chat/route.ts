import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sport, duration, experience, messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "messages array is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({
      sport,
      duration,
      experience,
      messages,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
