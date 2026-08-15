import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Compass, Save, Sparkles, Upload, CheckCircle2, Clock, AlertCircle, Wifi } from "lucide-react";
import { RichEditor } from "@/components/admin/RichEditor";
import { useAutosave } from "@/hooks/useAutosave";
import { slugify } from "@/lib/admin";

interface PostEditorFormProps {
  postId?: string;
  initialData?: any;
  onSave: (data: any) => Promise<void>;
  loading: boolean;
}

export function PostEditorForm({ postId, initialData, onSave, loading }: PostEditorFormProps) {
  const isEdit = !!postId;
  const storageKey = `minderpay_autosave_${postId || "new"}`;

  // Form Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featured_image_alt || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [authorId, setAuthorId] = useState(initialData?.author_id || "");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled" | "archived">(initialData?.status || "draft");
  const [publishedAt, setPublishedAt] = useState(initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : "");

  // Tags
  const [allTags, setAllTags] = useState<any[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (initialData?.post_tags ?? []).map((pt: any) => pt.tag_id ?? pt.id ?? pt)
  );
  const [newTagName, setNewTagName] = useState("");

  // SEO fields
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seo_description || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonical_url || "");
  const [robotsIndex, setRobotsIndex] = useState(initialData?.robots_index ?? true);
  const [robotsFollow, setRobotsFollow] = useState(initialData?.robots_follow ?? true);
  const [ogTitle, setOgTitle] = useState(initialData?.og_title || "");
  const [ogDescription, setOgDescription] = useState(initialData?.og_description || "");
  const [ogImage, setOgImage] = useState(initialData?.og_image || "");
  const [primaryKeyword, setPrimaryKeyword] = useState(initialData?.primary_keyword || "");

  // UI state
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [showSeo, setShowSeo] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  // Real-time autosave to Supabase DB (+ localStorage fallback)
  const autosavePayload = useMemo(() => ({
    title, slug, subtitle, excerpt, content,
    featuredImage, featuredImageAlt,
    categoryId, authorId, status,
    seoTitle, seoDescription, primaryKeyword,
  }), [title, slug, subtitle, excerpt, content, featuredImage, featuredImageAlt, categoryId, authorId, status, seoTitle, seoDescription, primaryKeyword]);

  const { status: autosaveStatus, lastSavedAt } = useAutosave({
    postId,
    storageKey,
    payload: autosavePayload,
    enabled: !!(title || content),
  });

  // Load categories, authors, tags
  useEffect(() => {
    supabase.from("categories").select("id,name").order("name").then(({ data }) => {
      setCategories(data || []);
      if (!categoryId && data?.length) setCategoryId(data[0].id);
    });
    supabase.from("authors").select("id,name").order("name").then(({ data }) => {
      setAuthors(data || []);
      if (!authorId && data?.length) setAuthorId(data[0].id);
    });
    supabase.from("tags").select("id,name").order("name").then(({ data }) => {
      setAllTags(data || []);
    });
  }, []);

  // Restore from localStorage if there is a newer autosave than the DB version
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const autosavedAt = parsed.autosavedAt || 0;
      const initialUpdatedAt = initialData?.updated_at ? new Date(initialData.updated_at).getTime() : 0;
      if (autosavedAt > initialUpdatedAt && (parsed.title || parsed.content)) {
        toast("Encontrámos um rascunho local não guardado.", {
          duration: 10000,
          action: {
            label: "Recuperar",
            onClick: () => {
              setTitle(parsed.title || ""); setSlug(parsed.slug || ""); setSubtitle(parsed.subtitle || "");
              setExcerpt(parsed.excerpt || ""); setContent(parsed.content || "");
              setFeaturedImage(parsed.featuredImage || ""); setFeaturedImageAlt(parsed.featuredImageAlt || "");
              setCategoryId(parsed.categoryId || ""); setAuthorId(parsed.authorId || "");
              setStatus(parsed.status || "draft"); setSeoTitle(parsed.seoTitle || "");
              setSeoDescription(parsed.seoDescription || ""); setPrimaryKeyword(parsed.primaryKeyword || "");
              toast.success("Rascunho recuperado.");
            },
          },
        });
      }
    } catch { /* ignore */ }
  }, [initialData]);

  // Automatic slug generation from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  // Explicit slug generation button
  const generateSlug = () => {
    if (!title) return;
    const generated = slugify(title);
    setSlug(generated);
    setSlugManuallyEdited(false);
  };

  // Upload featured image
  const handleFeaturedImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingFeatured(true);
    try {
      const ext = file.name.split(".").pop();
      const filename = `featured/${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from("media").upload(filename, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
      setFeaturedImage(publicUrl);
      toast.success("Imagem destacada enviada!");
    } catch (err: any) {
      toast.error("Erro ao enviar: " + err.message);
    } finally {
      setUploadingFeatured(false);
    }
  };

  // Toggle tag
  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]);
  };

  // Create new tag inline
  const createTag = async () => {
    if (!newTagName.trim()) return;
    const slugTag = slugify(newTagName);
    const { data, error } = await supabase.from("tags").insert({ name: newTagName.trim(), slug: slugTag }).select("id,name").single();
    if (error) { toast.error("Erro ao criar tag: " + error.message); return; }
    setAllTags(prev => [...prev, data]);
    setSelectedTagIds(prev => [...prev, data.id]);
    setNewTagName("");
    toast.success(`Tag "${data.name}" criada!`);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) { toast.error("O título é obrigatório."); return; }
    const finalSlug = slugify(slug || title);
    if (!finalSlug) { toast.error("O slug (URL) é obrigatório."); return; }

    const payload = {
      title,
      slug: finalSlug,
      subtitle: subtitle || null,
      excerpt: excerpt || null,
      content,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      category_id: categoryId || null,
      author_id: authorId || null,
      status,
      reading_time: Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)),
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      canonical_url: canonicalUrl || null,
      robots_index: robotsIndex,
      robots_follow: robotsFollow,
      og_title: ogTitle || null,
      og_description: ogDescription || null,
      og_image: ogImage || null,
      primary_keyword: primaryKeyword || null,
      published_at:
        status === "published"
          ? (initialData?.published_at || new Date().toISOString())
          : status === "scheduled" && publishedAt
          ? new Date(publishedAt).toISOString()
          : null,
      _tag_ids: selectedTagIds,
    };

    onSave(payload).then(() => {
      localStorage.removeItem(storageKey);
    });
  };

  // Computed SEO preview
  const previewTitle = seoTitle || title || "Título do Artigo";
  const previewDesc = seoDescription || excerpt || "Descrição do artigo aparece aqui para o utilizador que pesquisa no Google...";
  const previewSlug = slug ? `minderpay.com/blog/${slug}` : "minderpay.com/blog/slug-do-artigo";

  return (
    <form onSubmit={handleSaveSubmit} className="space-y-6">
      {/* ── Top action bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
            {isEdit ? "Editar Artigo" : "Novo Artigo"}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-xs">
            {autosaveStatus === "pending" && (
              <span className="flex items-center gap-1.5 text-amber-500">
                <Clock className="size-3 animate-pulse" /> A preparar guardamento automático…
              </span>
            )}
            {autosaveStatus === "saving" && (
              <span className="flex items-center gap-1.5 text-blue-500">
                <div className="size-3 animate-spin rounded-full border border-blue-400 border-t-transparent" />
                {postId ? "A guardar na base de dados…" : "A guardar rascunho local…"}
              </span>
            )}
            {autosaveStatus === "saved" && (
              <span className="flex items-center gap-1.5 text-green-600">
                <CheckCircle2 className="size-3" />
                {postId ? (
                  <>Guardado na BD {lastSavedAt ? `às ${lastSavedAt.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}` : ""}</>
                ) : "Rascunho local guardado"}
              </span>
            )}
            {autosaveStatus === "error" && (
              <span className="flex items-center gap-1.5 text-red-500">
                <AlertCircle className="size-3" /> Falha no guardamento — guardado localmente como backup
              </span>
            )}
            {autosaveStatus === "idle" && (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Wifi className="size-3" /> {postId ? "Guardamento automático ativo (a cada 15s)" : "Novo artigo — será guardado automaticamente"}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicar agora</option>
            <option value="scheduled">Agendar</option>
            <option value="archived">Arquivado</option>
          </select>
          <Button type="submit" disabled={loading} className="gap-2 h-10">
            <Save className="size-4" /> {loading ? "A guardar…" : "Guardar"}
          </Button>
        </div>
      </div>

      {status === "scheduled" && (
        <div className="rounded-xl border border-border bg-card px-6 py-4">
          <label className="text-xs font-semibold text-foreground">Data e hora de publicação</label>
          <Input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="mt-2 max-w-xs" />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title + slug + subtitle + excerpt */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Título do Artigo *</label>
                <Input
                  required
                  placeholder="Escreva um título apelativo…"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-base font-semibold h-12"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Slug (URL)</label>
                <div className="flex gap-2">
                  <span className="flex items-center text-xs text-muted-foreground bg-muted border border-border px-3 rounded-lg select-none shrink-0">
                    minderpay.com/blog/
                  </span>
                  <Input
                    required
                    placeholder="como-ganhar-dinheiro-online"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    className="flex-1 font-mono text-sm"
                  />
                  <Button type="button" variant="outline" onClick={generateSlug} title="Gerar slug a partir do título">
                    <Sparkles className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Subtítulo</label>
                <Input placeholder="Subtítulo ou lead da notícia…" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Excerto (resumo curto para listagens)</label>
                <Textarea
                  placeholder="Breve resumo exibido nos cards do blog e nas meta tags de redes sociais…"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Rich Editor ── */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Conteúdo do Artigo *</label>
            <RichEditor
              content={content}
              onChange={setContent}
              placeholder="Comece a escrever ou escolha um modelo acima…"
            />
          </div>

          {/* ── SEO Card ── */}
          <Card className="border border-border shadow-sm">
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="w-full flex items-center justify-between p-6 font-semibold text-foreground text-left"
            >
              <span className="flex items-center gap-2 font-[family-name:var(--font-display)]">
                <Compass className="size-5 text-primary" /> SEO & Open Graph
              </span>
              <ChevronDown className={`size-5 text-muted-foreground transition-transform ${showSeo ? "rotate-180" : ""}`} />
            </button>
            {showSeo && (
              <CardContent className="px-6 pb-6 space-y-5 border-t border-border pt-4">
                {/* Google Preview */}
                <div className="rounded-xl border border-border bg-white dark:bg-gray-900 p-4 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pré-visualização Google</p>
                  <p className="text-xs text-green-700 dark:text-green-400 truncate">{previewSlug}</p>
                  <p className="text-base text-blue-700 dark:text-blue-400 font-medium truncate leading-snug">{previewTitle.slice(0, 60)}{previewTitle.length > 60 ? "…" : ""}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">{previewDesc.slice(0, 160)}{previewDesc.length > 160 ? "…" : ""}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">Meta Title</label>
                      <span className={`text-xs ${seoTitle.length > 60 ? "text-red-500" : "text-muted-foreground"}`}>{seoTitle.length}/60</span>
                    </div>
                    <Input placeholder="Deixe em branco para usar o título" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
                    <div className="h-1 rounded-full bg-border overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${seoTitle.length > 60 ? "bg-red-500" : seoTitle.length > 45 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(100, (seoTitle.length / 60) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">Meta Description</label>
                      <span className={`text-xs ${seoDescription.length > 160 ? "text-red-500" : "text-muted-foreground"}`}>{seoDescription.length}/160</span>
                    </div>
                    <Input placeholder="Deixe em branco para usar o excerto" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
                    <div className="h-1 rounded-full bg-border overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${seoDescription.length > 160 ? "bg-red-500" : seoDescription.length > 130 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(100, (seoDescription.length / 160) * 100)}%` }} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Palavra-chave Principal</label>
                    <Input placeholder="ex: marketing digital" value={primaryKeyword} onChange={(e) => setPrimaryKeyword(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Canonical URL</label>
                    <Input placeholder="https://minderpay.com/blog/..." value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} />
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                    <input type="checkbox" checked={robotsIndex} onChange={(e) => setRobotsIndex(e.target.checked)} className="size-4 rounded border-border text-primary" />
                    Permitir indexação
                  </label>
                  <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                    <input type="checkbox" checked={robotsFollow} onChange={(e) => setRobotsFollow(e.target.checked)} className="size-4 rounded border-border text-primary" />
                    Seguir links
                  </label>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Open Graph (Redes Sociais)</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Título OG</label>
                      <Input placeholder="Título para Facebook/Instagram…" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Descrição OG</label>
                      <Input placeholder="Descrição para redes sociais…" value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">URL da Imagem OG</label>
                    <Input placeholder="https://..." value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          {/* Publication */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="font-[family-name:var(--font-display)] text-base font-bold">Publicação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Categoria</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Sem categoria</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Autor</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Sem autor</option>
                  {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="font-[family-name:var(--font-display)] text-base font-bold">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                      selectedTagIds.includes(tag.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {selectedTagIds.includes(tag.id) && <span className="mr-1">✓</span>}
                    {tag.name}
                  </button>
                ))}
                {allTags.length === 0 && <p className="text-xs text-muted-foreground">Nenhuma tag criada ainda.</p>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); createTag(); } }}
                  placeholder="Nova tag…"
                  className="h-8 flex-1 rounded-lg border border-border bg-background px-3 text-xs focus:border-primary focus:outline-none"
                />
                <button type="button" onClick={createTag} disabled={!newTagName.trim()} className="h-8 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                  + Criar
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="font-[family-name:var(--font-display)] text-base font-bold">Imagem Destacada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Drag & drop upload */}
              <label
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:border-primary hover:bg-primary/5"
                onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file?.type.startsWith("image/")) handleFeaturedImageUpload(file); }}
                onDragOver={(e) => e.preventDefault()}
              >
                {uploadingFeatured ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                    A enviar…
                  </div>
                ) : (
                  <>
                    <Upload className="size-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">Clique ou arraste uma imagem<br />JPG, PNG, WebP — máx. 10 MB</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFeaturedImageUpload(file); }} />
              </label>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Ou cole a URL</label>
                <Input placeholder="https://..." value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Texto alternativo (Alt)</label>
                <Input placeholder="Descrição acessível da imagem…" value={featuredImageAlt} onChange={(e) => setFeaturedImageAlt(e.target.value)} />
              </div>

              {featuredImage && (
                <div className="relative rounded-xl overflow-hidden border border-border aspect-video bg-muted">
                  <img src={featuredImage} alt="Pré-visualização" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage("")}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
