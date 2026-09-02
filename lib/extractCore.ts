// The "generative core" for Week 1: turns a loose, free-text description of
// an athlete's race into structured nutrition-planning fields.
//
// SIMULATED: this is a rule-based (keyword/regex) extractor, not a real AI
// model call. Labeled clearly per course rule ("if AI output is simulated,
// label it clearly"). No paid API required.

export type CoreExtraction = {
  sport: "run" | "bike" | "triathlon" | null;
  duration_min: number | null;
  weight_kg: number | null;
  carb_target_g_h: number | null;
  sodium_target_mg_h: number | null;
  context_note: string;
  simulated: true;
};

const SPORT_KEYWORDS: { pattern: RegExp; sport: CoreExtraction["sport"] }[] = [
  { pattern: /triathlon|ironman|70\.3|half\s*iron/i, sport: "triathlon" },
  { pattern: /\bbike\b|cycling|cyclist/i, sport: "bike" },
  { pattern: /\brun\b|running|marathon|\b5k\b|\b10k\b/i, sport: "run" },
];

// Rough default durations (minutes) used only when the athlete doesn't
// state their own duration -- clearly a fallback, never presented as exact.
const DEFAULT_DURATION_MIN: Record<string, number> = {
  triathlon: 330,
  bike: 180,
  run: 150,
};

function extractSport(text: string): CoreExtraction["sport"] {
  for (const { pattern, sport } of SPORT_KEYWORDS) {
    if (pattern.test(text)) return sport;
  }
  return null;
}

function extractWeightKg(text: string): number | null {
  const kgMatch = text.match(/(\d{2,3})\s*kg/i);
  if (kgMatch) return Number(kgMatch[1]);
  const lbMatch = text.match(/(\d{2,3})\s*(lbs|pounds)/i);
  if (lbMatch) return Math.round(Number(lbMatch[1]) / 2.2046);
  return null;
}

function extractDurationMin(text: string, sport: CoreExtraction["sport"]): number | null {
  const hourMinMatch = text.match(/(\d{1,2}):(\d{2})\s*h?/);
  if (hourMinMatch) {
    return Number(hourMinMatch[1]) * 60 + Number(hourMinMatch[2]);
  }
  const hoursMatch = text.match(/(\d{1,2}(?:\.\d)?)\s*hours?|(\d{1,2})\s*h\b/i);
  if (hoursMatch) {
    const val = hoursMatch[1] ?? hoursMatch[2];
    return Math.round(Number(val) * 60);
  }
  const minMatch = text.match(/(\d{2,3})\s*min(ute)?s?/i);
  if (minMatch) return Number(minMatch[1]);

  return sport ? DEFAULT_DURATION_MIN[sport] : null;
}

function hasHighSweatSignals(text: string): boolean {
  return /cramp|heavy sweat|sweat a lot|hot weather|heat|humid/i.test(text);
}

export function extractCore(description: string): CoreExtraction {
  const text = description.trim();
  const sport = extractSport(text);
  const weight_kg = extractWeightKg(text);
  const duration_min = extractDurationMin(text, sport);
  const highSweat = hasHighSweatSignals(text);

  const carb_target_g_h = sport ? (highSweat ? 75 : 60) : null;
  const sodium_target_mg_h = sport ? (highSweat ? 800 : 500) : null;

  const notes: string[] = [];
  if (!sport) notes.push("sport not detected");
  if (!weight_kg) notes.push("weight not mentioned");
  if (
    duration_min &&
    !/(\d{1,2}):(\d{2})/.test(text) &&
    !/\d{1,2}(\.\d)?\s*h(ours?)?\b/i.test(text) &&
    !/\d{2,3}\s*min/i.test(text)
  ) {
    notes.push(`duration estimated from typical ${sport} race length, not stated`);
  }
  if (highSweat) notes.push("carb/sodium targets raised due to sweat/cramping mention");

  const context_note =
    "Simulated extraction (rule-based, no AI model call)." +
    (notes.length ? " " + notes.join("; ") + "." : " All fields inferred directly from text.");

  return {
    sport,
    duration_min,
    weight_kg,
    carb_target_g_h,
    sodium_target_mg_h,
    context_note,
    simulated: true,
  };
}
