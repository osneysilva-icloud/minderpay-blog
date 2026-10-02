import { useEffect } from "react";
import { useSite } from "./site-context";

interface AdSlotProps {
  slotKey: "header" | "article_top" | "in_content" | "sidebar" | "article_bottom" | "related";
  className?: string;
}

export function AdSlot({ slotKey, className = "" }: AdSlotProps) {
  const { settings, adSlots } = useSite();

  const slot = adSlots.find((s) => s.key === slotKey);
  const rawAdClient = slot?.ad_client || settings?.adsense_publisher_id || "pub-4050091800984606";
  const pubMatch = rawAdClient.match(/(?:ca-)?pub-(\d+)/i) || rawAdClient.match(/(\d{10,})/);
  const adClient = pubMatch ? `ca-pub-${pubMatch[1]}` : rawAdClient;
  const adSlotId = slot?.ad_unit_id || "";

  useEffect(() => {
    if (settings?.ads_enabled && slot?.enabled && adClient && adSlotId) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // ignore adsbygoogle error
      }
    }
  }, [settings?.ads_enabled, slot?.enabled, adClient, adSlotId]);

  if (!settings?.ads_enabled) return null;
  if (!slot || !slot.enabled) return null;

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center border border-dashed border-border bg-muted/30 p-4 text-center transition-colors hover:bg-muted/50 ${className}`}
      style={{ minHeight: "100px" }}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
        Publicidade
      </span>
      {adClient && adSlotId ? (
        // Real Google AdSense element slot
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        // Placeholder indicating Ad Slot is configured but not connected to a live unit yet
        <div className="mt-1 text-xs text-muted-foreground font-medium">
          Espaço Reservado para Anúncio ({slotKey})
          <div className="text-[10px] text-muted-foreground/70 font-normal">
            Configure {slot.ad_unit_id ? "AdSense Publisher ID" : "Ad Unit ID no Painel"}
          </div>
        </div>
      )}
    </div>
  );
}
