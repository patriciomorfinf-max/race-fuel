import { createClient } from "@supabase/supabase-js";

// Week 0 scope: this only establishes the connection as infrastructure
// evidence. No tables, auth flows, or data models are wired up yet —
// those belong to a future week's Build Discipline Packet.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
