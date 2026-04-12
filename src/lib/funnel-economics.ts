/**
 * Funnel unit economics: Meta ads in CAD, affiliate catalog & commissions in USD.
 * CAD→USD: multiply CAD amounts by cadUsdRate (USD per 1 CAD).
 */

/** From catalog (`products.ts`): list-price stats for planning (USD). */
export const CATALOG_USD = {
  avgItemList: 49.18,
  avgFullRoutineList: 221.3,
  minItem: 6,
  maxItem: 155,
} as const;

/** Default planning rate if you use a single blended commission (Amazon-heavy mixes vary). */
export const DEFAULT_COMMISSION_RATE = 0.1;

/** Reasonable default CAD→USD when not updated (check Bank of Canada / xe.com periodically). */
export const DEFAULT_CAD_USD = 0.71;

export function cadToUsd(cad: number, cadUsdRate: number): number {
  return cad * cadUsdRate;
}

export function usdToCad(usd: number, cadUsdRate: number): number {
  if (cadUsdRate <= 0) return 0;
  return usd / cadUsdRate;
}

/** CPA in CAD from spend and lead count. */
export function cpaCadFromSpend(spendCad: number, leads: number): number | null {
  if (leads <= 0 || !Number.isFinite(spendCad)) return null;
  return spendCad / leads;
}

export function breakevenPurchaseRate(
  cpaUsd: number,
  avgOrderUsd: number,
  commissionRate: number,
): number | null {
  const denom = avgOrderUsd * commissionRate;
  if (denom <= 0 || !Number.isFinite(cpaUsd)) return null;
  return cpaUsd / denom;
}

/** Expected gross commission per lead (USD) before ad cost. */
export function expectedCommissionPerLeadUsd(
  purchaseRate: number,
  avgOrderUsd: number,
  commissionRate: number,
): number {
  return purchaseRate * avgOrderUsd * commissionRate;
}

export function netUsdPerLead(
  purchaseRate: number,
  avgOrderUsd: number,
  commissionRate: number,
  cpaUsd: number,
): number {
  return expectedCommissionPerLeadUsd(purchaseRate, avgOrderUsd, commissionRate) - cpaUsd;
}
