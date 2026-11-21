// Week 6 testing summary. Results come from real people who are not the builder.
// To add a tester, edit this file and commit it — nothing here is generated.

export interface ExternalTest {
  id: number;
  tester: string;
  task: string;
  whatHappened: string;
  rating: number | null; // 1-5, null while pending
  issue: string;
  status: "done" | "pending";
}

export const externalTests: ExternalTest[] = [
  {
    id: 1,
    tester: "Tester 1",
    task: "Check how many carbs to take during a marathon.",
    whatHappened: "It gave me exactly the amount I should take.",
    rating: 4,
    issue: "Sometimes it repeats answers.",
    status: "done",
  },
  {
    id: 2,
    tester: "Tester 2",
    task: "Check why my knee hurts.",
    whatHappened: "It didn't give me an answer, because the chat is not a doctor.",
    rating: 3,
    issue: "I thought it was a chat for high-performance athletes.",
    status: "done",
  },
  {
    id: 3,
    tester: "Tester 3",
    task: "See how much sodium to take during a 10-hour Ironman.",
    whatHappened: "It gave a great answer.",
    rating: 4,
    issue: "The sodium answer gives a wide range (400-700 mg/hour).",
    status: "done",
  },
  {
    id: 4,
    tester: "Tester 4 (triathlon coach)",
    task: "Describe a 70.3 Ironman and ask how many carbs to take per hour.",
    whatHappened: "It gave me the exact amount.",
    rating: 3,
    issue: "Sometimes it starts repeating answers and is not very personalized.",
    status: "done",
  },
  {
    id: 5,
    tester: "Tester 5 (half-marathon runner)",
    task: "Describe a half marathon and say that she sweats a lot; ask how much to take.",
    whatHappened: "It gave me the exact answer I wanted to know.",
    rating: 5,
    issue: "None found.",
    status: "done",
  },
];

export const changeFromFeedback = {
  feedback: "Tester 3: the sodium answer gives a wide range (400-700 mg/hour).",
  change:
    "The chat now uses the intake answers (duration and experience) to give a narrower, explained starting point for carbs and sodium instead of one generic range.",
};

// Full-site regression: every page and API route, checked on a production build.
export interface RegressionCheck {
  area: string;
  check: string;
  result: "PASS" | "FAIL";
}

export const regressionChecks: RegressionCheck[] = [
  { area: "/", check: "Homepage loads, Week 0 footer text removed", result: "PASS" },
  { area: "/core", check: "Page loads", result: "PASS" },
  { area: "/research", check: "Page loads", result: "PASS" },
  { area: "/product", check: "Page loads", result: "PASS" },
  { area: "/pricing", check: "Page loads", result: "PASS" },
  { area: "/marketing", check: "Page loads", result: "PASS" },
  { area: "/chat", check: "Page loads", result: "PASS" },
  { area: "/docs", check: "Page loads", result: "PASS" },
  { area: "/demo", check: "Page loads", result: "PASS" },
  { area: "/dashboard", check: "Page loads", result: "PASS" },
  { area: "/api/core", check: "Rejects an empty description (400)", result: "PASS" },
  { area: "Chat logic", check: "Medical question refused; carb and sodium answers use intake", result: "PASS" },
];
