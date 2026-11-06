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

export function generateResponse(message: string, intake: IntakeAnswers): string {
  if (needsGuardrail(message)) {
    return guardrailResponse;
  }

  const lower = message.toLowerCase();

  if (lower.includes("carb") || lower.includes("gel")) {
    return `For a ${intake.duration || "multi"}-hour ${intake.sport || "race"}, most athletes target around 60g of carbs per hour. Try our /core page to get a number tailored to your race.`;
  }
  if (lower.includes("sodium") || lower.includes("salt") || lower.includes("cramp")) {
    return "Sodium needs vary a lot by sweat rate, but 400-700mg/hour is a common starting range for most athletes. /core can give you a starting estimate based on your weight.";
  }
  if (lower.includes("water") || lower.includes("fluid") || lower.includes("drink")) {
    return "A common starting point is 500-800ml of fluid per hour, adjusted for heat and your own sweat rate. Check /core for a personalized number.";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("plan")) {
    return "Race Fuel has a Free tier to get started, a Plus tier for unlimited saved plans, and a Coach tier for managing multiple athletes. See /pricing for the full breakdown.";
  }

  return `Thanks! Since this is your ${intake.experience || "race"}, I'd recommend starting with our /core calculator to turn your race details into a fueling target. What would you like to know — carbs, sodium, fluids, or pricing?`;
}
