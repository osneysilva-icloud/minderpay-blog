import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings, Share2, Compass, BadgePercent, User, Upload, Image as ImageIcon,
  CheckCircle2, AlertCircle, Loader2, Trash2, Mail, MessageSquare, ExternalLink,
  Sparkles, ShieldCheck
} from "lucide-react";
import { formatDateTime } from "@/lib/admin";

export const Route = createFileRoute("/admin/settings")({
  loader: async () => {
    const [settingsRes, adSlotsRes, authorRes, messagesRes] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase.from("ad_slots").select("*").order("key"),
      supabase.from("authors").select("*").limit(1).maybeSingle(),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(20),
    ]);

    return {
      settings: settingsRes.data || null,
      adSlots: adSlotsRes.data || [],
      author: authorRes.data || null,
      messages: messagesRes.data || [],
    };
  },
  component: SettingsManagementView,
});

function SettingsManagementView() {
  const navigate = useNavigate();
  const { settings, adSlots: initialAdSlots, author: initialAuthor, messages: initialMessages } = Route.useLoaderData();

  // ── General Settings State ──
  const [siteName, setSiteName] = useState(settings?.site_name || "MinderPay");
  const [siteDescription, setSiteDescription] = useState(settings?.site_description || "");
  const [siteUrl, setSiteUrl] = useState(settings?.site_url || "https://minderpay.com");
  const [logoUrl, setLogoUrl] = useState(settings?.logo_url || "");
  const [faviconUrl, setFaviconUrl] = useState(settings?.favicon_url || "/favicon.svg");
  const [contactEmail, setContactEmail] = useState(settings?.contact_email || "suporteminderpay@gmail.com");

  // ── SEO & Tracking State ──
  const [gaId, setGaId] = useState(settings?.ga_measurement_id || "");
  const [gscVer, setGscVer] = useState(settings?.gsc_verification || "");
  const [adsensePubId, setAdsensePubId] = useState(settings?.adsense_publisher_id || "");
  const [adsEnabled, setAdsEnabled] = useState(settings?.ads_enabled ?? false);
  const [defSeoTitle, setDefSeoTitle] = useState(settings?.default_seo_title || "");
  const [defSeoDesc, setDefSeoDesc] = useState(settings?.default_seo_description || "");
  const [defOgImage, setDefOgImage] = useState(settings?.default_og_image || "");

  // ── Social Links State ──
  const [whatsapp, setWhatsapp] = useState("+258864339593");
  const [facebook, setFacebook] = useState(settings?.social_facebook || "");
  const [instagram, setInstagram] = useState(settings?.social_instagram || "https://www.instagram.com/minderads/");
  const [twitter, setTwitter] = useState(settings?.social_twitter || "");
  const [linkedin, setLinkedin] = useState(settings?.social_linkedin || "");
  const [youtube, setYoutube] = useState(settings?.social_youtube || "https://www.youtube.com/@MinderAds");

  // ── Author Profile State ──
  const [authorName, setAuthorName] = useState(initialAuthor?.name || "Minder Ads");
  const [authorRole, setAuthorRole] = useState(initialAuthor?.role_title || "Expert em vendas de infoprodutos, produtos físicos, desenvolvedor e designer");
  const [authorBio, setAuthorBio] = useState(initialAuthor?.bio || "Expert em vendas de infoprodutos, produtos físicos, marketing digital, desenvolvimento web e design.");
  const [authorAvatar, setAuthorAvatar] = useState(initialAuthor?.avatar_url || "");
  const [authorWebsite, setAuthorWebsite] = useState(initialAuthor?.website_url || "https://minderpay.com");

  // ── Ad Slots State ──
  const [adSlots, setAdSlots] = useState<any[]>(initialAdSlots);

  // ── Messages State ──
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  // ── Loading States ──
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingAuthor, setSavingAuthor] = useState(false);
  const [savingAds, setSavingAds] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Helper file uploader to Supabase Storage
  const uploadImageToStorage = async (file: File, folder: string): Promise<string> => {
    const ext = file.name.split(".").pop();
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from("media").upload(filename, file, {
      upsert: false,
      contentType: file.type,
    });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
    return publicUrl;
  };

  // Upload Logo
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadImageToStorage(file, "site-branding");
      setLogoUrl(url);
      toast.success("Logotipo enviado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao enviar logotipo: " + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Upload Favicon
  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFavicon(true);
    try {
      const url = await uploadImageToStorage(file, "site-branding");
      setFaviconUrl(url);
      toast.success("Favicon enviado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao enviar favicon: " + err.message);
    } finally {
      setUploadingFavicon(false);
    }
  };

  // Upload OG Image
  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingOgImage(true);
    try {
      const url = await uploadImageToStorage(file, "site-branding");
      setDefOgImage(url);
      toast.success("Imagem social (OG) enviada!");
    } catch (err: any) {
      toast.error("Erro ao enviar imagem: " + err.message);
    } finally {
      setUploadingOgImage(false);
    }
  };

  // Upload Author Avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadImageToStorage(file, "avatars");
      setAuthorAvatar(url);
      toast.success("Foto de perfil enviada!");
    } catch (err: any) {
      toast.error("Erro ao enviar avatar: " + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Save General & SEO Settings
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGeneral(true);
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
        updated_at: new Date().toISOString(),
      };

      if (settings?.id) {
        const { error } = await supabase.from("site_settings").update(payload).eq("id", settings.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_settings").insert({ singleton: true, ...payload });
        if (error) throw error;
      }

      toast.success("Configurações do site guardadas com sucesso!");
      void navigate({ to: "/admin/settings" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao guardar configurações.");
    } finally {
      setSavingGeneral(false);
    }
  };

  // Save Author Profile
  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAuthor(true);
    try {
      const slug = authorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
      const payload = {
        name: authorName,
        slug,
        role_title: authorRole || null,
        bio: authorBio || null,
        avatar_url: authorAvatar || null,
        website_url: authorWebsite || null,
        updated_at: new Date().toISOString(),
      };

      if (initialAuthor?.id) {
        const { error } = await supabase.from("authors").update(payload).eq("id", initialAuthor.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("authors").insert(payload);
        if (error) throw error;
      }

      toast.success("Perfil do autor atualizado com sucesso!");
      void navigate({ to: "/admin/settings" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar perfil do autor.");
    } finally {
      setSavingAuthor(false);
    }
  };

  // Ad slot toggles
  const handleAdSlotChange = (key: string, field: string, value: any) => {
    setAdSlots((prev) =>
      prev.map((slot) => (slot.key === key ? { ...slot, [field]: value } : slot))
    );
  };

  const handleToggleAllAds = (enable: boolean) => {
    setAdsEnabled(enable);
    setAdSlots((prev) => prev.map((s) => ({ ...s, enabled: enable })));
  };

  // Save Ads Settings
  const handleAdsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAds(true);
    try {
      if (settings?.id) {
        const { error: settingsError } = await supabase
          .from("site_settings")
          .update({ ads_enabled: adsEnabled, adsense_publisher_id: adsensePubId || null })
          .eq("id", settings.id);
        if (settingsError) throw settingsError;
      }

      const promises = adSlots.map((slot) =>
        supabase.from("ad_slots").update({
          enabled: slot.enabled,
          ad_client: slot.ad_client || null,
          ad_unit_id: slot.ad_unit_id || null,
          updated_at: new Date().toISOString(),
        }).eq("key", slot.key)
      );

      const results = await Promise.all(promises);
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;

      toast.success("Configurações de publicidade atualizadas com sucesso!");
      void navigate({ to: "/admin/settings" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao guardar definições de anúncios.");
    } finally {
      setSavingAds(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao apagar mensagem.");
    } else {
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      toast.success("Mensagem eliminada.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Configurações do Site & Plataforma
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie a identidade visual, perfil do autor, SEO global, publicidade AdSense e caixa de entrada.
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="bg-muted w-full justify-start overflow-x-auto p-1 flex gap-1">
          <TabsTrigger value="geral" className="flex items-center gap-1.5"><Settings className="size-4" /> Geral</TabsTrigger>
          <TabsTrigger value="autor" className="flex items-center gap-1.5"><User className="size-4" /> Perfil do Autor</TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-1.5"><Compass className="size-4" /> SEO & Analytics</TabsTrigger>
          <TabsTrigger value="redes" className="flex items-center gap-1.5"><Share2 className="size-4" /> Redes & Contactos</TabsTrigger>
          <TabsTrigger value="anuncios" className="flex items-center gap-1.5"><BadgePercent className="size-4" /> Publicidade</TabsTrigger>
          <TabsTrigger value="mensagens" className="flex items-center gap-1.5 relative">
            <Mail className="size-4" /> Mensagens
            {messages.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] font-bold text-primary-foreground">
                {messages.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── 1. GERAL TAB ── */}
        <TabsContent value="geral" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Identidade do Portal</CardTitle>
                <CardDescription>Defina o nome, URL, logotipo e favicon oficial do MinderPay.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="set-name" className="text-xs font-semibold text-foreground">Nome do Blog / Portal</label>
                    <Input id="set-name" required value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="set-url" className="text-xs font-semibold text-foreground">URL Oficial de Produção</label>
                    <Input id="set-url" required value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="set-desc" className="text-xs font-semibold text-foreground">Descrição do Site (Tagline Global)</label>
                  <Textarea id="set-desc" required value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={3} />
                </div>

                {/* Logo & Favicon Upload Cards */}
                <div className="grid gap-6 sm:grid-cols-2 pt-2">
                  {/* Logotipo Card */}
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Logotipo Oficial</span>
                      {logoUrl && (
                        <button type="button" onClick={() => setLogoUrl("")} className="text-xs text-destructive hover:underline">
                          Remover
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-xl border border-border bg-muted/40 flex items-center justify-center overflow-hidden shrink-0">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo Preview" className="h-full w-full object-contain p-1" />
                        ) : (
                          <ImageIcon className="size-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors">
                          {uploadingLogo ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                          {uploadingLogo ? "A enviar…" : "Enviar Logotipo"}
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                        </label>
                        <p className="text-[10px] text-muted-foreground">PNG, SVG ou WebP (recomendado 200x50px)</p>
                      </div>
                    </div>
                  </div>

                  {/* Favicon Card */}
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Favicon (Ícone da Aba)</span>
                      {faviconUrl && faviconUrl !== "/favicon.svg" && (
                        <button type="button" onClick={() => setFaviconUrl("/favicon.svg")} className="text-xs text-destructive hover:underline">
                          Restaurar Padrão
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-xl border border-border bg-muted/40 flex items-center justify-center overflow-hidden shrink-0">
                        <img src={faviconUrl || "/favicon.svg"} alt="Favicon Preview" className="size-8 object-contain" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors">
                          {uploadingFavicon ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                          {uploadingFavicon ? "A enviar…" : "Enviar Favicon"}
                          <input type="file" accept="image/*,.ico" className="hidden" onChange={handleFaviconUpload} disabled={uploadingFavicon} />
                        </label>
                        <p className="text-[10px] text-muted-foreground">SVG, ICO ou PNG (32x32px)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md pt-2">
                  <label htmlFor="set-email" className="text-xs font-semibold text-foreground">Email de Suporte / Contacto Oficial</label>
                  <Input id="set-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button type="submit" disabled={savingGeneral} className="min-w-[140px]">
                    {savingGeneral ? <><Loader2 className="size-4 animate-spin mr-2" /> A guardar…</> : "Guardar Geral"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── 2. PERFIL DO AUTOR TAB ── */}
        <TabsContent value="autor" className="mt-6 space-y-6">
          <form onSubmit={handleAuthorSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Perfil de Autor (Minder Ads)</CardTitle>
                <CardDescription>Edite a sua foto, cargo, biografia e informações apresentadas nas páginas dos artigos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Author Avatar Upload */}
                <div className="flex items-center gap-6 p-4 rounded-xl border border-border bg-muted/20">
                  <div className="relative size-20 rounded-full border-2 border-primary/20 overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    {authorAvatar ? (
                      <img src={authorAvatar} alt="Foto do Autor" className="h-full w-full object-cover" />
                    ) : (
                      <User className="size-8 text-primary/40" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:opacity-90 transition-opacity">
                      {uploadingAvatar ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                      {uploadingAvatar ? "A enviar foto…" : "Alterar Foto de Perfil"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                    </label>
                    <p className="text-[11px] text-muted-foreground">Recomendado formato quadrado (ex: 400x400px JPG/PNG)</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="auth-name" className="text-xs font-semibold text-foreground">Nome do Autor / Marca</label>
                    <Input id="auth-name" required value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="auth-role" className="text-xs font-semibold text-foreground">Título / Especialidade</label>
                    <Input id="auth-role" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="auth-bio" className="text-xs font-semibold text-foreground">Biografia / Sobre o Autor</label>
                  <Textarea id="auth-bio" value={authorBio} onChange={(e) => setAuthorBio(e.target.value)} rows={3} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="auth-web" className="text-xs font-semibold text-foreground">Website Pessoal / Canal</label>
                    <Input id="auth-web" value={authorWebsite} onChange={(e) => setAuthorWebsite(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="auth-wa" className="text-xs font-semibold text-foreground">WhatsApp Profissional</label>
                    <Input id="auth-wa" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button type="submit" disabled={savingAuthor} className="min-w-[140px]">
                    {savingAuthor ? <><Loader2 className="size-4 animate-spin mr-2" /> A guardar…</> : "Guardar Perfil"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── 3. SEO & ANALYTICS TAB ── */}
        <TabsContent value="seo" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">SEO Global & Serviços Google</CardTitle>
                <CardDescription>Configure as chaves do Google Search Console, Google Analytics e metatags para redes sociais.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="seo-gsc" className="text-xs font-semibold text-foreground">Google Search Console Verification Tag</label>
                    <Input id="seo-gsc" placeholder="ex: google-site-verification=..." value={gscVer} onChange={(e) => setGscVer(e.target.value)} />
                    <p className="text-[10px] text-muted-foreground">Insira o valor da meta tag de verificação do Google.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="seo-ga" className="text-xs font-semibold text-foreground">Google Analytics 4 Measurement ID</label>
                    <Input id="seo-ga" placeholder="G-XXXXXXXXXX" value={gaId} onChange={(e) => setGaId(e.target.value)} />
                    <p className="text-[10px] text-muted-foreground">Identificador no formato G-XXXXXXXXXX.</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="seo-deftitle" className="text-xs font-semibold text-foreground">Meta Title Padrão</label>
                    <Input id="seo-deftitle" placeholder="MinderPay — Negócios, Marketing e Tecnologia" value={defSeoTitle} onChange={(e) => setDefSeoTitle(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="seo-defdesc" className="text-xs font-semibold text-foreground">Meta Description Padrão</label>
                    <Input id="seo-defdesc" placeholder="Resumo padrão do site..." value={defSeoDesc} onChange={(e) => setDefSeoDesc(e.target.value)} />
                  </div>
                </div>

                {/* Default OG Image Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Imagem de Partilha Social (OG Image Padrão)</label>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card">
                    <div className="h-16 w-28 rounded-lg border border-border bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                      {defOgImage ? (
                        <img src={defOgImage} alt="OG Preview" className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors">
                        {uploadingOgImage ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                        {uploadingOgImage ? "A enviar…" : "Enviar Imagem OG (1200x630px)"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleOgImageUpload} disabled={uploadingOgImage} />
                      </label>
                      <Input placeholder="ou cole o URL direto da imagem..." value={defOgImage} onChange={(e) => setDefOgImage(e.target.value)} className="h-8 text-xs" />
                    </div>
                  </div>
                </div>

                {/* Live Google Preview Box */}
                <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-primary" /> Pré-visualização nos Resultados do Google
                  </span>
                  <div className="rounded-lg bg-card border border-border p-4 space-y-1">
                    <span className="block text-xs text-muted-foreground">https://minderpay.com</span>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate">
                      {defSeoTitle || siteName}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {defSeoDesc || siteDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button type="submit" disabled={savingGeneral} className="min-w-[140px]">
                    {savingGeneral ? <><Loader2 className="size-4 animate-spin mr-2" /> A guardar…</> : "Guardar SEO"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── 4. REDES SOCIAIS & CONTACTOS TAB ── */}
        <TabsContent value="redes" className="mt-6 space-y-6">
          <form onSubmit={handleGeneralSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">Canais & Redes Sociais</CardTitle>
                <CardDescription>Configure os canais oficiais do Minder Ads apresentados no cabeçalho e rodapé.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="social-yt" className="text-xs font-semibold text-foreground">Canal do YouTube</label>
                    <Input id="social-yt" placeholder="https://www.youtube.com/@MinderAds" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-ig" className="text-xs font-semibold text-foreground">Perfil do Instagram</label>
                    <Input id="social-ig" placeholder="https://www.instagram.com/minderads/" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label htmlFor="social-wa" className="text-xs font-semibold text-foreground">WhatsApp (wa.me)</label>
                    <Input id="social-wa" placeholder="https://wa.me/258864339593" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-fb" className="text-xs font-semibold text-foreground">Página do Facebook</label>
                    <Input id="social-fb" placeholder="https://facebook.com/..." value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="social-tw" className="text-xs font-semibold text-foreground">Twitter / X</label>
                    <Input id="social-tw" placeholder="https://twitter.com/..." value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button type="submit" disabled={savingGeneral} className="min-w-[140px]">
                    {savingGeneral ? <><Loader2 className="size-4 animate-spin mr-2" /> A guardar…</> : "Guardar Redes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── 5. PUBLICIDADE TAB ── */}
        <TabsContent value="anuncios" className="mt-6 space-y-6">
          <form onSubmit={handleAdsSubmit}>
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2">
                  <BadgePercent className="size-5 text-primary" /> Google AdSense & Bloco de Anúncios
                </CardTitle>
                <CardDescription>Gerencie a ativação global e a configuração individual dos 6 blocos publicitários do portal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Master Switch Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 p-5 rounded-2xl border border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`size-5 ${adsEnabled ? "text-green-600" : "text-muted-foreground"}`} />
                      <h4 className="font-bold text-foreground">Publicidade Global no Portal</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {adsEnabled ? "Os blocos de anúncios estão ATIVOS no portal." : "Todos os anúncios estão DESATIVADOS."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => handleToggleAllAds(true)} className="text-xs">
                      Ativar Todos
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => handleToggleAllAds(false)} className="text-xs text-destructive">
                      Desativar Todos
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <label htmlFor="ad-client-pub" className="text-xs font-semibold text-foreground">Google AdSense Publisher ID</label>
                  <Input id="ad-client-pub" placeholder="pub-XXXXXXXXXXXXXXXX" value={adsensePubId} onChange={(e) => setAdsensePubId(e.target.value)} />
                  <p className="text-[10px] text-muted-foreground">O seu ID de editor do AdSense (ex: pub-1234567890123456).</p>
                </div>

                {/* Slots Grid */}
                <div className="border-t border-border pt-4 space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Espaços Publicitários (6 Slots Disponíveis)</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {adSlots.map((slot) => (
                      <div key={slot.key} className={`p-4 rounded-xl border transition-all ${slot.enabled ? "border-primary/40 bg-card shadow-sm" : "border-border bg-muted/10 opacity-70"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <label htmlFor={`slot-${slot.key}`} className="text-sm font-bold text-foreground cursor-pointer select-none">
                            {slot.label}
                          </label>
                          <input
                            type="checkbox"
                            id={`slot-${slot.key}`}
                            checked={slot.enabled}
                            onChange={(e) => handleAdSlotChange(slot.key, "enabled", e.target.checked)}
                            className="rounded border-border text-primary focus:ring-primary size-5 cursor-pointer"
                          />
                        </div>
                        <div className="grid gap-2 grid-cols-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground">Client ID (opcional)</span>
                            <Input
                              placeholder="pub-..."
                              value={slot.ad_client || ""}
                              onChange={(e) => handleAdSlotChange(slot.key, "ad_client", e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-muted-foreground">Ad Unit ID</span>
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

                <div className="pt-4 border-t border-border flex justify-end">
                  <Button type="submit" disabled={savingAds} className="min-w-[160px]">
                    {savingAds ? <><Loader2 className="size-4 animate-spin mr-2" /> A guardar…</> : "Guardar Publicidade"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ── 6. MENSAGENS DE CONTACTO TAB ── */}
        <TabsContent value="mensagens" className="mt-6 space-y-6">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2">
                <MessageSquare className="size-5 text-primary" /> Caixa de Entrada de Contactos
              </CardTitle>
              <CardDescription>Mensagens enviadas por leitores através da página de contacto do portal.</CardDescription>
            </CardHeader>
            <CardContent>
              {messages.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {/* List */}
                  <div className="md:col-span-1 border-r border-border pr-4 space-y-2 max-h-[450px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          selectedMessage?.id === msg.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-foreground">
                          <span className="truncate max-w-[120px]">{msg.name || "Sem Nome"}</span>
                          <span className="text-[10px] text-muted-foreground">{formatDateTime(msg.created_at)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">{msg.subject || "Sem Assunto"}</p>
                        <p className="text-[11px] text-muted-foreground/80 line-clamp-1 mt-1">{msg.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Detail */}
                  <div className="md:col-span-2 pl-2">
                    {selectedMessage ? (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between border-b border-border pb-4">
                          <div>
                            <h3 className="font-bold text-foreground text-base">{selectedMessage.subject || "Mensagem de Contacto"}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              De: <strong className="text-foreground">{selectedMessage.name}</strong> (&lt;{selectedMessage.email}&gt;)
                            </p>
                            <p className="text-[10px] text-muted-foreground">{formatDateTime(selectedMessage.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Contacto MinderPay")}`}
                              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                            >
                              <Mail className="size-3.5" /> Responder
                            </a>
                            <button
                              onClick={() => handleDeleteMessage(selectedMessage.id)}
                              className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                              title="Apagar mensagem"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/20 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                          {selectedMessage.message}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 text-sm text-muted-foreground flex-col gap-2">
                        <Mail className="size-8 opacity-30" />
                        <span>Selecione uma mensagem à esquerda para ler os detalhes.</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 text-sm text-muted-foreground flex-col gap-2">
                  <Mail className="size-8 opacity-30" />
                  <span>Ainda não foram recebidas mensagens através do formulário de contacto.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
