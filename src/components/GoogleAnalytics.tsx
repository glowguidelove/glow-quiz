"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_ACCEPT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/**
 * Loads GA4 only after the user accepts the cookie banner (or already accepted).
 * Sends page_view on client-side navigations.
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted") {
        setEnabled(true);
      }
    } catch {
      /* private mode */
    }
    const onAccept = () => setEnabled(true);
    document.addEventListener(COOKIE_CONSENT_ACCEPT_EVENT, onAccept);
    return () => document.removeEventListener(COOKIE_CONSENT_ACCEPT_EVENT, onAccept);
  }, []);

  if (!GA_ID.startsWith("G-") || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga-inline" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <GaPageViews />
    </>
  );
}

function GaPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 50;

    const tick = () => {
      if (cancelled) return;
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        window.setTimeout(tick, 50);
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
