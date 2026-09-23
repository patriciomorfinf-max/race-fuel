export type Competitor = {
  name: string;
  category: "Calculator" | "Coaching/Sweat Test" | "App" | "Substitute";
  region: "Global" | "Mexico/LatAm";
  whatItDoes: string;
  instant: boolean;
  free: boolean;
  noSignup: boolean;
  usesYourProducts: boolean;
  source: string;
};

// Hand-researched, cited — no invented products or capabilities.
// Every "what it does" line is drawn directly from the product's own site.
export const competitors: Competitor[] = [
  {
    name: "EnduranceOS",
    category: "Calculator",
    region: "Global",
    whatItDoes:
      "Free hour-by-hour carb, fluid, sodium and caffeine calculator for marathon, Ironman, ultras and gran fondos. No account required.",
    instant: true,
    free: true,
    noSignup: true,
    usesYourProducts: false,
    source: "enduranceos.app/calculator",
  },
  {
    name: "GW Endurance Fueling",
    category: "Calculator",
    region: "Global",
    whatItDoes:
      "Calculates carb/fluid/sodium targets and lets you search and combine your own commercial gels, chews and drinks to hit them, plus DIY mix recipes.",
    instant: false,
    free: false,
    noSignup: false,
    usesYourProducts: true,
    source: "gwendurancefueling.com",
  },
  {
    name: "Precision Fuel & Hydration",
    category: "Coaching/Sweat Test",
    region: "Global",
    whatItDoes:
      "In-person or algorithm-based sweat test (~$180) producing a personalized hydration/fueling plan, paired with the brand's own electrolyte and gel products.",
    instant: false,
    free: false,
    noSignup: false,
    usesYourProducts: false,
    source: "precisionhydration.com",
  },
  {
    name: "PODIUM (iOS app)",
    category: "App",
    region: "Global",
    whatItDoes:
      "Free iPad app that calculates carbohydrate and sodium requirements as a 'tactical fueling engine' tied to a training plan.",
    instant: true,
    free: true,
    noSignup: false,
    usesYourProducts: false,
    source: "apps.apple.com/us/app/podium/id6752230309",
  },
  {
    name: "42Cal Marathon Fueling Calculator",
    category: "Calculator",
    region: "Global",
    whatItDoes:
      "Free calculator producing a timed carb/fluid/sodium plan by race duration and gut-training level, with a printable result.",
    instant: true,
    free: true,
    noSignup: true,
    usesYourProducts: false,
    source: "42cal.com/tools/fuel-planner",
  },
  {
    name: "Go Finisher Lab",
    category: "Calculator",
    region: "Mexico/LatAm",
    whatItDoes:
      "Free Spanish-language planner (ACSM/ISSN/Jeukendrup-based) giving km-by-km carb/fluid/sodium timing for marathon, triathlon, cycling or ultra, with optional GPX upload.",
    instant: true,
    free: true,
    noSignup: true,
    usesYourProducts: false,
    source: "gofinisherlab.com",
  },
  {
    name: "Local triathlon nutrition coaches (e.g. Journey Sports, MX)",
    category: "Substitute",
    region: "Mexico/LatAm",
    whatItDoes:
      "One-on-one paid consulting with a sports nutritionist/triathlete coach based in Mexico, building a fully custom race-nutrition strategy.",
    instant: false,
    free: false,
    noSignup: false,
    usesYourProducts: true,
    source: "journey.app/blog/nutricion-en-el-triatlon-como-debe-ser",
  },
  {
    name: "General nutrition trackers (MyFitnessPal / Cronometer)",
    category: "Substitute",
    region: "Global",
    whatItDoes:
      "General-purpose food/macro logging apps some athletes repurpose to estimate carb intake — not built for race-day, hour-by-hour fueling.",
    instant: true,
    free: true,
    noSignup: false,
    usesYourProducts: false,
    source: "myfitnesspal.com / cronometer.com",
  },
];

export const gapAnalysis =
  "Every existing tool trades off one of the three things Race Fuel targets together: EnduranceOS, 42Cal and PODIUM are instant and free but ignore the athlete's own products; GW Endurance Fueling and Precision Fuel & Hydration match real products but require payment, signup, or a sweat test; local coaches personalize fully but are slow and expensive. No researched competitor is simultaneously instant, free, signup-free, AND built around the specific products the athlete already carries — that combination is Race Fuel's open niche.";
