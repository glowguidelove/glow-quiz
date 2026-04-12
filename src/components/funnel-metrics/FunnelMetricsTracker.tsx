"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CATALOG_USD,
  DEFAULT_CAD_USD,
  DEFAULT_COMMISSION_RATE,
  breakevenPurchaseRate,
  cadToUsd,
  cpaCadFromSpend,
  expectedCommissionPerLeadUsd,
  netUsdPerLead,
  usdToCad,
} from "@/lib/funnel-economics";

const STORAGE_KEY = "glowguide-funnel-metrics-v1";

export type FunnelSnapshot = {
  id: string;
  savedAt: string;
  periodLabel: string;
  notes: string;
  cadUsdRate: number;
  spendCad: number;
  leads: number;
  useManualCpa: boolean;
  manualCpaCad: number;
  avgOrderUsd: number;
  commissionRate: number;
  purchaseRate: number;
  ordersCount: number | null;
};

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadSnapshots(): FunnelSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as FunnelSnapshot[];
  } catch {
    return [];
  }
}

function saveSnapshots(list: FunnelSnapshot[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function formatMoney(n: number, currency: "CAD" | "USD"): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatPct(n: number): string {
  return `${(n * 100).toFixed(2)}%`;
}

export default function FunnelMetricsTracker() {
  const [mounted, setMounted] = useState(false);
  const [snapshots, setSnapshots] = useState<FunnelSnapshot[]>([]);

  const [cadUsdRate, setCadUsdRate] = useState(DEFAULT_CAD_USD);
  const [spendCad, setSpendCad] = useState("");
  const [leads, setLeads] = useState("");
  const [useManualCpa, setUseManualCpa] = useState(false);
  const [manualCpaCad, setManualCpaCad] = useState("");
  const [avgOrderUsd, setAvgOrderUsd] = useState(String(CATALOG_USD.avgItemList));
  const [commissionRatePct, setCommissionRatePct] = useState(
    String(DEFAULT_COMMISSION_RATE * 100),
  );
  const [purchaseRatePct, setPurchaseRatePct] = useState("5");
  const [ordersCount, setOrdersCount] = useState("");
  const [periodLabel, setPeriodLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [importText, setImportText] = useState("");

  useEffect(() => {
    setMounted(true);
    setSnapshots(loadSnapshots());
  }, []);

  const persist = useCallback((list: FunnelSnapshot[]) => {
    setSnapshots(list);
    saveSnapshots(list);
  }, []);

  const spendNum = parseFloat(spendCad) || 0;
  const leadsNum = parseInt(leads, 10) || 0;
  const manualCpaNum = parseFloat(manualCpaCad) || 0;
  const avgOrderNum = parseFloat(avgOrderUsd) || 0;
  const commissionRate = (parseFloat(commissionRatePct) || 0) / 100;
  const purchaseRate = (parseFloat(purchaseRatePct) || 0) / 100;
  const ordersNum = ordersCount.trim() === "" ? null : parseInt(ordersCount, 10);

  const cpaCad = useMemo(() => {
    if (useManualCpa && manualCpaNum > 0) return manualCpaNum;
    return cpaCadFromSpend(spendNum, leadsNum);
  }, [useManualCpa, manualCpaNum, spendNum, leadsNum]);

  const cpaUsd = cpaCad != null ? cadToUsd(cpaCad, cadUsdRate) : null;

  const effectivePurchaseRate =
    ordersNum != null && leadsNum > 0 ? ordersNum / leadsNum : purchaseRate;

  const expectedUsd =
    avgOrderNum > 0 && commissionRate > 0
      ? expectedCommissionPerLeadUsd(effectivePurchaseRate, avgOrderNum, commissionRate)
      : 0;

  const netUsd =
    cpaUsd != null
      ? netUsdPerLead(effectivePurchaseRate, avgOrderNum, commissionRate, cpaUsd)
      : null;

  const breakeven =
    cpaUsd != null
      ? breakevenPurchaseRate(cpaUsd, avgOrderNum, commissionRate)
      : null;

  const handleSaveSnapshot = () => {
    const snap: FunnelSnapshot = {
      id: newId(),
      savedAt: new Date().toISOString(),
      periodLabel: periodLabel.trim() || new Date().toLocaleDateString("en-CA"),
      notes: notes.trim(),
      cadUsdRate,
      spendCad: spendNum,
      leads: leadsNum,
      useManualCpa,
      manualCpaCad: manualCpaNum,
      avgOrderUsd: avgOrderNum,
      commissionRate,
      purchaseRate: effectivePurchaseRate,
      ordersCount: ordersNum,
    };
    persist([snap, ...snapshots]);
  };

  const handleDelete = (id: string) => {
    persist(snapshots.filter((s) => s.id !== id));
  };

  const exportJson = () => JSON.stringify(snapshots, null, 2);

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText) as unknown;
      if (!Array.isArray(parsed)) throw new Error("Expected an array");
      persist(parsed as FunnelSnapshot[]);
      setImportText("");
    } catch {
      alert("Invalid JSON. Paste an array exported from this page.");
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-muted text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Funnel economics
        </h1>
        <p className="text-foreground/75 leading-relaxed max-w-2xl">
          Meta Ads spend is in <strong>CAD</strong>; affiliate list prices and commissions
          are tracked in <strong>USD</strong>. Set the CAD→USD rate, then compare{" "}
          <strong>CPA (USD)</strong> to expected commission per lead. Snapshots are stored
          in this browser only — export JSON periodically for backup.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Exchange rate</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">USD per 1 CAD (e.g. 0.71)</span>
            <input
              type="number"
              step="0.0001"
              min="0.0001"
              value={cadUsdRate}
              onChange={(e) => setCadUsdRate(parseFloat(e.target.value) || DEFAULT_CAD_USD)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground"
            />
          </label>
          <div className="text-sm text-muted flex items-end pb-2">
            Example: {formatMoney(1, "CAD")} spend ≈{" "}
            {formatMoney(cadToUsd(1, cadUsdRate), "USD")} for comparison to USD revenue.
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Ad performance (CAD)</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={useManualCpa}
            onChange={(e) => setUseManualCpa(e.target.checked)}
          />
          Enter CPA directly (CAD) instead of spend ÷ leads
        </label>
        {useManualCpa ? (
          <label className="block space-y-1.5 max-w-xs">
            <span className="text-sm text-muted">Cost per lead (CAD)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={manualCpaCad}
              onChange={(e) => setManualCpaCad(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              placeholder="2.91"
            />
          </label>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-sm text-muted">Amount spent (CAD)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={spendCad}
                onChange={(e) => setSpendCad(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm text-muted">Website leads (count)</span>
              <input
                type="number"
                step="1"
                min="0"
                value={leads}
                onChange={(e) => setLeads(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              />
            </label>
          </div>
        )}
        <div className="rounded-xl bg-primary-light/40 border border-primary-light px-4 py-3 text-sm space-y-1">
          <p>
            <strong>CPA (CAD):</strong>{" "}
            {cpaCad != null ? formatMoney(cpaCad, "CAD") : "—"}
          </p>
          <p>
            <strong>CPA (USD):</strong>{" "}
            {cpaUsd != null ? formatMoney(cpaUsd, "USD") : "—"}{" "}
            <span className="text-muted">
              (Meta shows CAD; this is the number to compare to USD commission.)
            </span>
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Revenue model (USD)</h2>
        <p className="text-sm text-muted">
          Catalog reference: typical item list ~{formatMoney(CATALOG_USD.avgItemList, "USD")} ·
          full routine list ~{formatMoney(CATALOG_USD.avgFullRoutineList, "USD")} (not everyone
          buys the full routine).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">Assumed average order value (USD)</span>
            <input
              type="number"
              step="1"
              min="0"
              value={avgOrderUsd}
              onChange={(e) => setAvgOrderUsd(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">Commission (% of order)</span>
            <input
              type="number"
              step="0.5"
              min="0"
              max="100"
              value={commissionRatePct}
              onChange={(e) => setCommissionRatePct(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">
              Modeled purchase rate (% of leads who order)
            </span>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={purchaseRatePct}
              onChange={(e) => setPurchaseRatePct(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              disabled={ordersNum != null && leadsNum > 0}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">
              Optional: attributed orders (overrides modeled rate if you have leads)
            </span>
            <input
              type="number"
              step="1"
              min="0"
              value={ordersCount}
              onChange={(e) => setOrdersCount(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              placeholder="Leave empty to use modeled %"
            />
          </label>
        </div>
        {ordersNum != null && leadsNum > 0 && (
          <p className="text-sm text-foreground">
            <strong>Observed purchase rate:</strong> {formatPct(ordersNum / leadsNum)} (
            {ordersNum} / {leads} leads)
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-sage-light/30 p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Results</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          <li>
            <strong>Expected commission / lead (USD):</strong>{" "}
            {formatMoney(expectedUsd, "USD")}
          </li>
          <li>
            <strong>Net / lead (USD):</strong>{" "}
            {netUsd != null ? (
              <span className={netUsd >= 0 ? "text-sage" : "text-primary-dark"}>
                {formatMoney(netUsd, "USD")}
              </span>
            ) : (
              "—"
            )}
          </li>
          <li>
            <strong>Breakeven purchase rate</strong> (at this CPA USD, AOV, commission):{" "}
            {breakeven != null && breakeven <= 1 ? formatPct(breakeven) : "—"}
            {breakeven != null && breakeven > 1 && (
              <span className="text-primary-dark"> (unreachable — lower CPA or raise AOV/%)</span>
            )}
          </li>
          {cpaUsd != null && avgOrderNum > 0 && commissionRate > 0 && (
            <li className="text-muted text-sm pt-2">
              Max CPA (USD) to hit {formatPct(purchaseRate)} purchase rate:{" "}
              {formatMoney(
                purchaseRate * avgOrderNum * commissionRate,
                "USD",
              )}{" "}
              ≈ {formatMoney(usdToCad(purchaseRate * avgOrderNum * commissionRate, cadUsdRate), "CAD")}{" "}
              CAD at this FX.
            </li>
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Save snapshot</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-sm text-muted">Label (e.g. April W1)</span>
            <input
              value={periodLabel}
              onChange={(e) => setPeriodLabel(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5"
              placeholder="Week of Apr 7"
            />
          </label>
          <label className="block space-y-1.5 sm:col-span-2">
            <span className="text-sm text-muted">Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 resize-y"
              placeholder="Creative test, audience change…"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleSaveSnapshot}
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          Save snapshot to history
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4 overflow-x-auto">
        <h2 className="text-lg font-semibold text-foreground">History</h2>
        {snapshots.length === 0 ? (
          <p className="text-sm text-muted">No snapshots yet.</p>
        ) : (
          <table className="w-full text-sm text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-3 font-medium">Date</th>
                <th className="py-2 pr-3 font-medium">Label</th>
                <th className="py-2 pr-3 font-medium">FX</th>
                <th className="py-2 pr-3 font-medium">CPA CAD</th>
                <th className="py-2 pr-3 font-medium">CPA USD</th>
                <th className="py-2 pr-3 font-medium">Net USD/lead</th>
                <th className="py-2 pr-3 font-medium">Breakeven %</th>
                <th className="py-2 font-medium w-10" />
              </tr>
            </thead>
            <tbody>
              {snapshots.map((s) => {
                const cpaC =
                  s.useManualCpa && s.manualCpaCad > 0
                    ? s.manualCpaCad
                    : s.leads > 0
                      ? s.spendCad / s.leads
                      : null;
                const cpaU =
                  cpaC != null ? cadToUsd(cpaC, s.cadUsdRate) : null;
                const net =
                  cpaU != null
                    ? netUsdPerLead(
                        s.purchaseRate,
                        s.avgOrderUsd,
                        s.commissionRate,
                        cpaU,
                      )
                    : null;
                const be = cpaU != null
                  ? breakevenPurchaseRate(
                      cpaU,
                      s.avgOrderUsd,
                      s.commissionRate,
                    )
                  : null;
                return (
                  <tr key={s.id} className="border-b border-border/80">
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {new Date(s.savedAt).toLocaleString("en-CA", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 pr-3 max-w-[140px] truncate" title={s.periodLabel}>
                      {s.periodLabel}
                    </td>
                    <td className="py-2 pr-3">{s.cadUsdRate.toFixed(4)}</td>
                    <td className="py-2 pr-3">
                      {cpaC != null ? formatMoney(cpaC, "CAD") : "—"}
                    </td>
                    <td className="py-2 pr-3">
                      {cpaU != null ? formatMoney(cpaU, "USD") : "—"}
                    </td>
                    <td className="py-2 pr-3">
                      {net != null ? formatMoney(net, "USD") : "—"}
                    </td>
                    <td className="py-2 pr-3">
                      {be != null && be <= 1 ? formatPct(be) : "—"}
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="text-muted hover:text-primary-dark text-xs underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Backup</h2>
        <p className="text-sm text-muted">
          Copy this JSON into a file or note. Paste a previously exported array to restore.
        </p>
        <textarea
          readOnly
          value={exportJson()}
          rows={6}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-xs"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={3}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-xs"
            placeholder="Paste JSON array to import…"
          />
          <button
            type="button"
            onClick={handleImport}
            className="shrink-0 h-fit px-5 py-2.5 rounded-xl border border-border font-semibold hover:bg-card-hover"
          >
            Import
          </button>
        </div>
      </section>
    </div>
  );
}
