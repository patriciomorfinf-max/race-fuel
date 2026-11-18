// Content for /demo: guided walkthrough, agent map, impact check and roadmap.

export const walkthrough = [
  { step: 1, href: "/", title: "Start at the homepage", what: "Read the headline and the promise: never bonk on race day again.", look: "Navigation shows every module in one place." },
  { step: 2, href: "/core", title: "Describe a race (Core agent)", what: "Type a race in your own words, e.g. 'Ironman, 10 hours, 65 kg'.", look: "Structured carb and sodium targets appear and are saved." },
  { step: 3, href: "/research", title: "See the evidence (Research)", what: "Read the competitor benchmark and answer the Yes/No question.", look: "The tally changes after you vote." },
  { step: 4, href: "/product", title: "Review tiers (Product)", what: "Compare Free, Plus and Coach features.", look: "Each feature sits in a tier." },
  { step: 5, href: "/pricing", title: "Run the revenue simulator (Pricing)", what: "Change the inputs or switch Conservative / Optimistic and save a scenario.", look: "Revenue updates instantly; the scenario appears in the saved list." },
  { step: 6, href: "/marketing", title: "Check the content system (Marketing)", what: "Open the tabs, vote on a headline, save an asset.", look: "Vote counts persist after a reload." },
  { step: 7, href: "/chat", title: "Ask the guided assistant (Chat)", what: "Answer 3 intake questions, ask about carbs or sodium, then ask a medical question.", look: "Fueling answers use your intake; the medical question is refused." },
  { step: 8, href: "/dashboard", title: "Check the records (Dashboard)", what: "See live counts from the database and the testing summary.", look: "Your actions from the steps above show up as records." },
];

export interface AgentNode {
  name: string;
  page: string;
  type: string;
  input: string;
  output: string;
  stores: string;
}

export const agents: AgentNode[] = [
  { name: "Core extraction agent", page: "/core", type: "Simulated, rule-based", input: "Free-text race description", output: "Carb and sodium targets", stores: "core_outputs" },
  { name: "Research signal collector", page: "/research", type: "Human survey + curated data", input: "Yes/No + short note", output: "Live tally", stores: "research_signals" },
  { name: "Pricing simulator", page: "/pricing", type: "Deterministic calculation", input: "Users, conversion, coaches", output: "Monthly and annual revenue", stores: "pricing_scenarios" },
  { name: "Marketing content system", page: "/marketing", type: "Pre-written sample content + A/B vote", input: "Asset to save, headline vote", output: "Content kit, vote counts", stores: "marketing_assets, ab_test_votes" },
  { name: "Guided assistant", page: "/chat", type: "Simulated, rule-based + guardrail", input: "Intake answers + questions", output: "Fueling guidance or refusal", stores: "chat_sessions, chat_feedback" },
];

export const impactChecks = [
  { risk: "Health advice", detail: "A fueling assistant sits close to medical advice.", mitigation: "Medical, injury and medication questions are refused. A notice that the assistant is simulated and not medical advice is always visible.", status: "Mitigated" },
  { risk: "Wrong numbers for an individual", detail: "Carb and sodium needs vary by person, heat and training.", mitigation: "Answers are labelled starting points, use the intake, and send people to /core. Not a substitute for a sports dietitian.", status: "Partly mitigated" },
  { risk: "Privacy", detail: "There is no login yet, and the database tables allow public reads and inserts.", mitigation: "The dashboard shows counts and non-personal fields only, never free text or chat messages. Version 2 adds login and restricts reads.", status: "Open — planned for V2" },
  { risk: "Fake or misleading content", detail: "Marketing posts and scripts could imply real customers or stories.", mitigation: "Content is labelled as sample content. The invented story and testimonial are replaced with true ones before anything is published.", status: "Mitigated" },
  { risk: "AI that is not AI", detail: "Users could believe the assistant is a real AI model.", mitigation: "Every simulated output is labelled as simulated and rule-based.", status: "Mitigated" },
  { risk: "Money claims", detail: "Revenue numbers could be read as forecasts.", mitigation: "The pricing page is a simulator using stated assumptions. No real payments exist.", status: "Mitigated" },
];

export const roadmap = [
  { phase: "Now (v1)", items: ["Five modules live on one site", "Dashboard with live records", "Chat uses intake for carb and sodium ranges"] },
  { phase: "Next (v2)", items: ["Login, and restrict database reads to each user's own records", "Run the guardrail on every message, including the intake answers", "Stop the chat repeating the same fallback answer", "Make clear in the chat that it also serves everyday athletes, not only high performance"] },
  { phase: "Later (v3)", items: ["Real AI model for extraction, with human review of outputs", "Real payments for Plus and Coach", "Coach dashboard to manage several athletes", "Validate numbers with a sports dietitian"] },
];
