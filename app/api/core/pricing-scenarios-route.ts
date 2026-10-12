import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("pricing_scenarios")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, free_users, conversion_pct, coach_accounts, monthly_revenue, annual_revenue } = body;

  if (!name) {
    return NextResponse.json({ error: "Scenario name is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("pricing_scenarios")
    .insert({
      name,
      free_users,
      conversion_pct,
      coach_accounts,
      monthly_revenue,
      annual_revenue,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
