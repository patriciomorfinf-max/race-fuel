// Simulated, rule-based response logic (NOT a paid AI API).
// Handles the 3-question intake flow, basic Q&A, and a guardrail
// for anything resembling a medical / diagnostic question.

export interface IntakeAnswers {
  sport: string;
  duration: string;
  experience: string;
}

export const intakeQuestions = [
  { key: "sport", text: "What's your race — run, bike, or triathlon?" },
  { key: "duration", text: "About how long will it take you (in hours)?" },
  { key: "experience", text: "Is this your first race of this distance, or have you done one before?" },
];

const GUARDRAIL_KEYWORDS = [
  "diagnos", "prescri", "medication", "medicamento", "dosage", "dosis",
  "injur", "lesión", "chest pain", "dolor de pecho", "symptom", "síntoma",
  "disease", "enfermedad", "treat my", "cure", "cura",
];

// Match keywords only at the start of a word, so "cure" does not fire on "secure"
// and "cura" does not fire on "accurate". Prefixes like "diagnos" still match "diagnose".
const GUARDRAIL_REGEX = new RegExp(
  `(?<![\\p{L}])(?:${GUARDRAIL_KEYWORDS.join("|")})`,
  "iu"
);

export function needsGuardrail(message: string): boolean {
  return GUARDRAIL_REGEX.test(message);
}

export const guardrailResponse =
  "I can't give medical advice, diagnoses, or guidance on injuries or medication — that needs a real doctor or sports physician. I can help with general race-fueling questions (carbs, sodium, fluids, pacing your intake) instead.";

export const humanCheckpoint =
  "Simulated assistant — rule-based responses, not a real AI model. This is not medical advice; always consult a professional for health or injury questions.";

// Week 6 change (from tester feedback): carb and sodium answers used to be one
// generic number / a very wide range for everyone. They now use the intake answers
// (duration and experience) to give a narrower, explained starting point.
export function parseHours(duration: string): number | null {
  const m = duration.match(/\d+(?:[.,]\d+)?/);
  if (!m) return null;
  const h = parseFloat(m[0].replace(",", "."));
  return Number.isFinite(h) && h > 0 ? h : null;
}

export function isFirstTimer(experience: string): boolean {
  return /first/i.test(experience) && !/\b(not|isn't|n't|never)\b/i.test(experience);
}

export function carbAdvice(intake: IntakeAnswers): string {
  const hours = parseHours(intake.duration);
  const label = `${intake.duration || "multi"}-hour ${intake.sport || "race"}`;
  const tail = " This is a general starting point, not a prescription — /core can tailor it to your race.";

  if (hours === null) {
    return `Most endurance athletes start around 30-60g of carbs per hour for long efforts.${tail}`;
  }
  if (hours < 1) {
    return `For a ${label}, you usually don't need to fuel during the effort. Water, and at most 0-30g of carbs per hour, is enough.${tail}`;
  }
  if (hours <= 2.5) {
    return `For a ${label}, aim for about 30-60g of carbs per hour.${tail}`;
  }
  if (isFirstTimer(intake.experience)) {
    return `For a ${label} and your first time at this distance, start near 60g of carbs per hour. Higher intakes (up to 90g) need gut training, so don't try them for the first time on race day.${tail}`;
  }
  return `For a ${label}, a trained athlete can aim for 60-90g of carbs per hour. Use the lower end if you have never practiced that intake in training.${tail}`;
}

export function sodiumAdvice(intake: IntakeAnswers): string {
  const hours = parseHours(intake.duration);
  const base =
    "A good starting point is about 500mg of sodium per hour. Go toward 600-700mg if it is hot or you sweat heavily (salt marks on your clothes), and toward 300-400mg if it is cool or you sweat lightly.";
  const total =
    hours !== null && hours >= 3
      ? ` Over ${hours} hours that is roughly ${Math.round(hours * 500)}mg in total, and sodium from your drinks and food counts toward it.`
      : "";
  return `${base}${total} Sweat rates differ a lot between people, so treat it as a starting point and adjust in training.`;
}

export function generateResponse(message: string, intake: IntakeAnswers): string {
  if (needsGuardrail(message)) {
    return guardrailResponse;
  }

  const lower = message.toLowerCase();

  if (lower.includes("carb") || lower.includes("gel")) {
    return carbAdvice(intake);
  }
  if (lower.includes("sodium") || lower.includes("salt") || lower.includes("cramp")) {
    return sodiumAdvice(intake);
  }
  if (lower.includes("water") || lower.includes("fluid") || lower.includes("drink")) {
    return "A common starting point is 500-800ml of fluid per hour, adjusted for heat and your own sweat rate. Check /core for a personalized number.";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("plan")) {
    return "Race Fuel has a Free tier to get started, a Plus tier for unlimited saved plans, and a Coach tier for managing multiple athletes. See /pricing for the full breakdown.";
  }

  return `Thanks! Since this is your ${intake.experience || "race"}, I'd recommend starting with our /core calculator to turn your race details into a fueling target. What would you like to know — carbs, sodium, fluids, or pricing?`;
}
