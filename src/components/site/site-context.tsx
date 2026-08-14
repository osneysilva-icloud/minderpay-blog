import { createContext, useContext, type ReactNode } from "react";

export type SiteSettings = {
  site_name: string;
  site_description: string;
  site_url: string;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  ga_measurement_id: string | null;
  gsc_verification: string | null;
  adsense_publisher_id: string | null;
  ads_enabled: boolean;
  default_seo_title: string | null;
  default_seo_description: string | null;
  default_og_image: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
} | null;

export type SiteCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type SiteAdSlot = {
  key: string;
  enabled: boolean;
  ad_client: string | null;
  ad_unit_id: string | null;
};

export type SiteContextValue = {
  settings: SiteSettings;
  categories: SiteCategory[];
  adSlots: SiteAdSlot[];
};

const fallback: SiteContextValue = { settings: null, categories: [], adSlots: [] };

const SiteContext = createContext<SiteContextValue>(fallback);

export function SiteContextProvider({
  value,
  children,
}: {
  value: SiteContextValue | undefined;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={value ?? fallback}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  return useContext(SiteContext);
}
