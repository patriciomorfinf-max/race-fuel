import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const { session_id, message_index, rating } = await req.json();

  if (rating !== "up" && rating !== "down") {
    return NextResponse.json({ error: "rating must be 'up' or 'down'." }, { status: 400 });
  }

  const { error } = await supabase.from("chat_feedback").insert({
    session_id: session_id || null,
    message_index,
    rating,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
