import { tiers } from "./pricingData";

export interface PricingInputs {
  freeUsers: number;
  conversionPct: number; // % of freeUsers that become Plus subscribers
  coachAccounts: number;
}

export interface PricingResult {
  plusSubscribers: number;
  monthlyRevenue: number;
  annualRevenue: number;
}

const plusPrice = tiers.find((t) => t.id === "plus")!.monthlyPrice;
const coachPrice = tiers.find((t) => t.id === "coach")!.monthlyPrice;

export function calculatePricing(inputs: PricingInputs): PricingResult {
  const freeUsers = Math.max(0, inputs.freeUsers || 0);
  const conversionPct = Math.max(0, inputs.conversionPct || 0);
  const coachAccounts = Math.max(0, inputs.coachAccounts || 0);

  const plusSubscribers = Math.round(freeUsers * (conversionPct / 100));
  const monthlyRevenue =
    plusSubscribers * plusPrice + coachAccounts * coachPrice;
  const annualRevenue = monthlyRevenue * 12;

  return {
    plusSubscribers,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    annualRevenue: Math.round(annualRevenue * 100) / 100,
  };
}
