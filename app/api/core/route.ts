import { NextRequest, NextResponse } from "next/server";
import { extractCore } from "@/lib/extractCore";

export async function POST(req: NextRequest) {
  try {
    const { description } = (await req.json()) as { description?: string };

    if (!description?.trim()) {
      return NextResponse.json(
        { error: "Describe your race first." },
        { status: 400 }
      );
    }

    const extraction = extractCore(description);
    return NextResponse.json({ extraction });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
