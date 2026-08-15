/**
 * usePageAnalytics – tracks page views to Supabase analytics_events table.
 *
 * Features:
 * - Generates a persistent session_id per browser session (sessionStorage)
 * - Detects device type (mobile/tablet/desktop)
 * - Fetches approximate geolocation via ip-api.com (free, no key needed)
 * - Sends a page_view event on every route change
 * - Gracefully fails silently if the table doesn't exist yet
 */

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Detect device type from user agent
function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return "mobile";
  if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) return "tablet";
  return "desktop";
}

// Persistent session ID (survives navigation within same tab)
function getSessionId(): string {
  const key = "mp_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, id);
  }
  return id;
}

// Cache for geo data so we only call the API once per session
let geoCache: { country: string; country_code: string; city: string; region: string; latitude: number; longitude: number } | null = null;
let geoPending: Promise<typeof geoCache> | null = null;

async function getGeoData() {
  if (geoCache) return geoCache;
  if (geoPending) return geoPending;

  geoPending = fetch("https://ip-api.com/json/?fields=country,countryCode,city,regionName,lat,lon&lang=pt")
    .then(r => r.json())
    .then(data => {
      if (data?.country) {
        geoCache = {
          country: data.country,
          country_code: data.countryCode,
          city: data.city,
          region: data.regionName,
          latitude: data.lat,
          longitude: data.lon,
        };
      }
      return geoCache;
    })
    .catch(() => null);

  return geoPending;
}

export function usePageAnalytics(pagePath?: string) {
  useEffect(() => {
    const path = pagePath || (typeof window !== "undefined" ? window.location.pathname : "/");

    // Don't track admin pages
    if (path.startsWith("/admin")) return;

    const trackView = async () => {
      try {
        const geo = await getGeoData();
        const sessionId = getSessionId();
        const deviceType = getDeviceType();
        const referrer = document.referrer || null;

        await supabase.from("analytics_events").insert({
          event_type: "page_view",
          page_path: path,
          session_id: sessionId,
          device_type: deviceType,
          referrer,
          user_agent: navigator.userAgent.slice(0, 200),
          ...(geo || {}),
        });
      } catch {
        // Silent fail — analytics should never break the site
      }
    };

    // Small delay to avoid impacting page load performance
    const timer = setTimeout(trackView, 1500);
    return () => clearTimeout(timer);
  }, [pagePath]);
}
