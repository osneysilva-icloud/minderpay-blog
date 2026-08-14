import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Share2, Compass, BadgePercent } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  loader: async () => {
    const [settingsRes, adSlotsRes] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase.from("ad_slots").select("*").order("key"),
    ]);

    return {
      settings: settingsRes.data || null,
      adSlots: adSlotsRes.data || [],
    };
  },
  component: SettingsManagementView,
});

function SettingsManagementView() {
  const navigate = useNavigate();
  const { settings, adSlots: initialAdSlots } = Route.useLoaderData();

  // General Settings States
  const [siteName, setSiteName] = useState(settings?.site_name || "MinderPay");
  const [siteDescription, setSiteDescription] = useState(settings?.site_description || "");
  const [siteUrl, setSiteUrl] = useState(settings?.site_url || "https://minderpay.com");
  const [logoUrl, setLogoUrl] = useState(settings?.logo_url || "");
  const [faviconUrl, setFaviconUrl] = useState(settings?.favicon_url || "");
  const [contactEmail, setContactEmail] = useState(settings?.contact_email || "");
  
  // SEO & Keys
  const [gaId, setGaId] = useState(settings?.ga_measurement_id || "");
  const [gscVer, setGscVer] = useState(settings?.gsc_verification || "");
  const [adsensePubId, setAdsensePubId] = useState(settings?.adsense_publisher_id || "");
  const [adsEnabled, setAdsEnabled] = useState(settings?.ads_enabled ?? false);
  const [defSeoTitle, setDefSeoTitle] = useState(settings?.default_seo_title || "");
  const [defSeoDesc, setDefSeoDesc] = useState(settings?.default_seo_description || "");
  const [defOgImage, setDefOgImage] = useState(settings?.default_og_image || "");

  // Social Links
  const [facebook, setFacebook] = useState(settings?.social_facebook || "");
  const [instagram, setInstagram] = useState(settings?.social_instagram || "");
  const [twitter, setTwitter] = useState(settings?.social_twitter || "");
  const [linkedin, setLinkedin] = useState(settings?.social_linkedin || "");
  const [youtube, setYoutube] = useState(settings?.social_youtube || "");

  // Ad Slots States
  const [adSlots, setAdSlots] = useState<any[]>(initialAdSlots);
  const [loading, setLoading] = useState(false);

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        site_name: siteName,
        site_description: siteDescription,
        site_url: siteUrl,
        logo_url: logoUrl || null,
        favicon_url: faviconUrl || null,
        contact_email: contactEmail || null,
        ga_measurement_id: gaId || null,
        gsc_verification: gscVer || null,
        adsense_publisher_id: adsensePubId || null,
        ads_enabled: adsEnabled,
        default_seo_title: defSeoTitle || null,
        default_seo_description: defSeoDesc || null,
        default_og_image: defOgImage || null,
        social_facebook: facebook || null,
        social_instagram: instagram || null,
        social_twitter: twitter || null,
        social_linkedin: linkedin || null,
        social_youtube: youtube || null,
      };

      if (settings?.id) {
        const { error } = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", settings.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert({ singleton: true, ...payload });
        if (error) throw error;
      }

      toast.success("Definições gerais guardadas com sucesso!");
      void navigate({ to: "/admin/settings" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao guardar configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdSlotChange = (key: string, field: string, value: any) => {
    setAdSlots((prev) =>
      prev.map((slot) => (slot.key === key ? { ...slot, [field]: value } : slot))
    );
  };

  const handleAdsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update global ads setting first
      const { error: settingsError } = await supabase
        .from("site_settings")
        .update({ ads_enabled: adsEnabled })
        .eq("id", settings?.id);

      if (settingsError) throw settingsError;

      // Update all ad slots
      const promises = adSlots.map((slot) =>
        supabase
          .from("ad_slots")
          .update({
            enabled: slot.enabled,
            ad_client: slot.ad_client || null,
            ad_unit_id: slot.ad_unit_id || null,
          })
          .eq("key", slot.key)
      );

      const results = await Promise.all(promises);
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;

      toast.success("Configuração de anúncios atualizada com sucesso!");
      void navigate({ to: "/admin/settings" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao guardar definições de publicidade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie a identidade visual, SEO global, chaves de Analytics e espaços de publicidade.
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="bg-muted w-full justify-start overflow-x-auto whitespace-nowrap p-1 flex">
          <TabsTrigger value="geral" className="flex items-center gap-1.5"><Settings className="size-4" /> Geral</TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1.5"><Compass className="size-4" /> SEO & Rastreamento</TabsTrigger>
          <TabsTrigger value="redes" className="flex items-center gap-1.5"><Share2 className="size-4" /> Redes Sociais</TabsTrigger>
          <TabsTrigger value="anuncios" className="flex items-center gap-1.5"><BadgePercent className="size-4" /> Publicidade</TabsTrigger>
        </TabsList>

        {/* GENERAL TAB */}
        <TabsContent value="geral" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Identidade do Site</CardTitle>
                <CardDescription>Configurações básicas de identidade e contactos do blog.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="set-name" className="text-xs font-semibold text-foreground">Nome do Site</label>
                    <Input id="set-name" required value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="set-url" className="text-xs font-semibold text-foreground">URL de Produção</label>
                    <Input id="set-url" required value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="set-desc" className="text-xs font-semibold text-foreground">Descrição do Site</label>
                  <Textarea id="set-desc" required value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={3} />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label htmlFor="set-logo" className="text-xs font-semibold text-foreground">URL do Logotipo</label>
                    <Input id="set-logo" placeholder="/favicon.ico" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="set-favicon" className="text-xs font-semibold text-foreground">URL do Favicon</label>
                    <Input id="set-favicon" placeholder="/favicon.ico" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="set-email" className="text-xs font-semibold text-foreground">Email de Contacto</label>
                    <Input id="set-email" type="email" placeholder="contacto@minderpay.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button type="submit" disabled={loading}>{loading ? "A guardar…" : "Guardar Geral"}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">SEO Global & Serviços</CardTitle>
                <CardDescription>Configure chaves do Google Search Console, Google Analytics e metatags globais.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="seo-gsc" className="text-xs font-semibold text-foreground">Código de Verificação do Google Search Console</label>
                    <Input id="seo-gsc" placeholder="google-site-verification-id" value={gscVer} onChange={(e) => setGscVer(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="seo-ga" className="text-xs font-semibold text-foreground">Google Analytics ID (G-XXXXXX)</label>
                    <Input id="seo-ga" placeholder="G-XXXXXXXX" value={gaId} onChange={(e) => setGaId(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="seo-deftitle" className="text-xs font-semibold text-foreground">Título SEO Padrão (Meta Title)</label>
                    <Input id="seo-deftitle" placeholder="MinderPay — Negócios e Finanças" value={defSeoTitle} onChange={(e) => setDefSeoTitle(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="seo-defdesc" className="text-xs font-semibold text-foreground">Descrição SEO Padrão (Meta Description)</label>
                    <Input id="seo-defdesc" placeholder="Resumo padrão do site..." value={defSeoDesc} onChange={(e) => setDefSeoDesc(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="seo-defog" className="text-xs font-semibold text-foreground">Imagem OG Padrão (Social Link Image)</label>
                  <Input id="seo-defog" placeholder="/og-image-default.png" value={defOgImage} onChange={(e) => setDefOgImage(e.target.value)} />
                </div>

                <div className="pt-4 border-t border-border">
                  <Button type="submit" disabled={loading}>{loading ? "A guardar…" : "Guardar SEO"}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* SOCIAL NETWORKS */}
        <TabsContent value="redes" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Redes Sociais</CardTitle>
                <CardDescription>Links para as redes sociais que serão exibidos no rodapé do portal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="social-fb" className="text-xs font-semibold text-foreground">Facebook URL</label>
                    <Input id="social-fb" placeholder="https://facebook.com/..." value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-ig" className="text-xs font-semibold text-foreground">Instagram URL</label>
                    <Input id="social-ig" placeholder="https://instagram.com/..." value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label htmlFor="social-tw" className="text-xs font-semibold text-foreground">Twitter / X URL</label>
                    <Input id="social-tw" placeholder="https://twitter.com/..." value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-li" className="text-xs font-semibold text-foreground">LinkedIn URL</label>
                    <Input id="social-li" placeholder="https://linkedin.com/in/..." value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-yt" className="text-xs font-semibold text-foreground">YouTube Channel URL</label>
                    <Input id="social-yt" placeholder="https://youtube.com/..." value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button type="submit" disabled={loading}>{loading ? "A guardar…" : "Guardar Redes"}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* PUBLICIDADE AD BLOCKS */}
        <TabsContent value="anuncios" className="mt-6 space-y-6">
          <form onSubmit={handleAdsSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Google AdSense & Anúncios</CardTitle>
                <CardDescription>Ative/desative espaços publicitários e forneça as chaves de integração do AdSense.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Master Switch */}
                <div className="flex items-center gap-3 bg-muted/20 p-4 rounded-xl border border-border">
                  <input
                    type="checkbox"
                    id="master-ads"
                    checked={adsEnabled}
                    onChange={(e) => setAdsEnabled(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary size-5 cursor-pointer"
                  />
                  <div>
                    <label htmlFor="master-ads" className="block text-sm font-semibold text-foreground cursor-pointer select-none">
                      Ativar Publicidade Globalmente
                    </label>
                    <span className="block text-xs text-muted-foreground">
                      Liga ou desliga todos os anúncios no portal com um único clique.
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <label htmlFor="ad-client-pub" className="text-xs font-semibold text-foreground">AdSense Publisher ID (ID do Editor)</label>
                  <Input id="ad-client-pub" placeholder="pub-XXXXXXXXXXXXXXXX" value={adsensePubId} onChange={(e) => setAdsensePubId(e.target.value)} />
                  <p className="text-[10px] text-muted-foreground">Exemplo: pub-1234567890123456</p>
                </div>

                {/* Slots List */}
                <div className="border-t border-border pt-4 space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Espaços Publicitários (Slots)</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {adSlots.map((slot) => (
                      <div key={slot.key} className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`slot-${slot.key}`} className="text-sm font-bold text-foreground capitalize select-none cursor-pointer">
                            {slot.label}
                          </label>
                          <input
                            type="checkbox"
                            id={`slot-${slot.key}`}
                            checked={slot.enabled}
                            onChange={(e) => handleAdSlotChange(slot.key, "enabled", e.target.checked)}
                            className="rounded border-border text-primary focus:ring-primary size-4.5 cursor-pointer"
                          />
                        </div>
                        <div className="grid gap-2 grid-cols-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground">Client ID (Opcional)</span>
                            <Input
                              placeholder="pub-..."
                              value={slot.ad_client || ""}
                              onChange={(e) => handleAdSlotChange(slot.key, "ad_client", e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground">Ad Unit ID (ID do Anúncio)</span>
                            <Input
                              placeholder="1234567890"
                              value={slot.ad_unit_id || ""}
                              onChange={(e) => handleAdSlotChange(slot.key, "ad_unit_id", e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button type="submit" disabled={loading}>{loading ? "A guardar…" : "Guardar Configuração de Publicidade"}</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
