import type { Metadata } from "next";
import FunnelMetricsTracker from "@/components/funnel-metrics/FunnelMetricsTracker";

export const metadata: Metadata = {
  title: "Funnel economics — GlowGuide",
  description:
    "Internal funnel unit economics: CAD ad spend vs USD affiliate revenue. Not indexed.",
  robots: { index: false, follow: false },
};

export default function FunnelMetricsPage() {
  return <FunnelMetricsTracker />;
}
