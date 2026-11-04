export const persona = {
  name: "Ana, the first-time Olympic-distance triathlete",
  age: "28–40",
  summary:
    "Trains 5-7 hours/week, has finished 1-2 shorter races, and is terrified of bonking mid-race because she has never had a real fueling plan — just guesses and copies what other people post online.",
  goals: [
    "Finish her first Olympic-distance triathlon without running out of energy",
    "Stop guessing how many gels/bottles to carry",
    "Feel like she has a plan, not just vibes",
  ],
  frustrations: [
    "Generic nutrition advice doesn't account for her race duration or body weight",
    "Spreadsheets and PDFs from coaches feel overwhelming",
    "She doesn't want to pay for a nutritionist for one race",
  ],
};

export const landingCopy = {
  headline: "Never bonk on race day again.",
  subheadline:
    "Race Fuel turns your weight, race duration and nutrition targets into a precise, hour-by-hour fueling plan — built from the products you already carry.",
  ctaPrimary: "Describe your race",
  ctaSecondary: "See plans & pricing",
};

export interface SocialPost {
  platform: "Instagram" | "TikTok" | "X";
  text: string;
}

// 10 social posts (simulated content, clearly for a student project).
export const socialPosts: SocialPost[] = [
  { platform: "Instagram", text: "Ever bonk at mile 18? Your fueling plan probably wasn't a plan at all. Race Fuel builds you one in 2 minutes. 🏃‍♀️⚡" },
  { platform: "Instagram", text: "You trained for 16 weeks. Don't let your nutrition plan be a guess. Try Race Fuel free today." },
  { platform: "TikTok", text: "POV: you finally stop googling \"how many gels for a half marathon\" and just let Race Fuel tell you. 🎥" },
  { platform: "TikTok", text: "3 signs you're about to bonk on race day (and how Race Fuel fixes all 3). 🎥" },
  { platform: "X", text: "Carb math shouldn't be harder than your taper. Race Fuel does it for you — free." },
  { platform: "X", text: "New: a pricing/revenue simulator for Race Fuel's freemium model. Building this in public, week by week. 🧵" },
  { platform: "Instagram", text: "Coaches: manage your whole roster's fueling plans from one dashboard. Race Fuel Coach tier is here." },
  { platform: "Instagram", text: "Triathlon nutrition, explained in plain language — not a 40-page PDF. Swipe to see how it works ➡️" },
  { platform: "TikTok", text: "I asked an app to plan my Olympic-distance fueling and here's what it said... 🎥" },
  { platform: "X", text: "Shipping Race Fuel one feature a week: core extraction, research, pricing, now marketing. Full build log live." },
];

export interface VideoScript {
  title: string;
  hook: string;
  body: string;
  cta: string;
}

export const videoScripts: VideoScript[] = [
  {
    title: "The bonk nobody warns you about",
    hook: "I bonked at mile 20 of my first marathon and didn't understand why.",
    body: "Turns out I was guessing my carb intake instead of planning it. Race Fuel takes your race duration and weight and gives you an actual hour-by-hour plan — no spreadsheet required.",
    cta: "Try it free at race-fuel.vercel.app",
  },
  {
    title: "What actually goes into a fueling plan",
    hook: "Carbs, sodium, fluids — most athletes track zero of these on race day.",
    body: "Race Fuel calculates your targets from your body weight and race length, then matches them to the products you already carry. It's the plan a coach would give you, without the cost.",
    cta: "Describe your race in 30 seconds.",
  },
  {
    title: "Why we built a pricing simulator for a student project",
    hook: "Most class projects stop at 'it works.' We wanted to prove it could be a real business.",
    body: "This week we mapped out Free, Plus and Coach tiers, and built a live revenue calculator so anyone can see what the business could look like at scale.",
    cta: "See the breakdown at /pricing.",
  },
];

export interface CalendarDay {
  day: number;
  content: string;
  channel: string;
}

// 14-day campaign calendar.
export const campaignCalendar: CalendarDay[] = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1;
  const items = [
    "Launch post: \"Never bonk again\"",
    "TikTok: bonk story hook",
    "Persona spotlight: Ana's story",
    "Carousel: how the calculator works",
    "X thread: build-in-public update",
    "Instagram reel: video script #1",
    "Community poll: have you bonked?",
    "Coach-tier feature highlight",
    "TikTok: video script #2",
    "Customer-style testimonial (sample)",
    "Pricing tiers explainer post",
    "X: video script #3 teaser",
    "Recap: what shipped this week",
    "CTA push: \"Plan your next race free\"",
  ];
  return { day, content: items[i], channel: i % 3 === 0 ? "Instagram" : i % 3 === 1 ? "TikTok" : "X" };
});

export interface Headline {
  id: "a" | "b";
  text: string;
}

export const abHeadlines: Headline[] = [
  { id: "a", text: "Never bonk on race day again." },
  { id: "b", text: "Your fueling plan, built in 2 minutes." },
];
