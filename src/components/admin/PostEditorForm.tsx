import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Compass, Eye, Image as ImageIcon, Link as LinkIcon, RefreshCw, Save, Sparkles } from "lucide-react";

interface PostEditorFormProps {
  postId?: string; // If provided, we are editing
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
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featured_image_alt || "");
  
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [authorId, setAuthorId] = useState(initialData?.author_id || "");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled" | "archived">(initialData?.status || "draft");
  const [publishedAt, setPublishedAt] = useState(initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : "");
  
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
  const [readingTime, setReadingTime] = useState(initialData?.reading_time || 5);

  // Metadata arrays
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [showSeo, setShowSeo] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Load categories and authors
  useEffect(() => {
    supabase.from("categories").select("id,name").order("name").then(({ data }) => {
      setCategories(data || []);
      if (!categoryId && data && data.length > 0) setCategoryId(data[0].id);
    });
    supabase.from("authors").select("id,name").order("name").then(({ data }) => {
      setAuthors(data || []);
      if (!authorId && data && data.length > 0) setAuthorId(data[0].id);
    });
  }, []);

  // Autosave check on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load autosave if it's newer than initialData
        const autosavedAt = parsed.autosavedAt || 0;
        const initialUpdatedAt = initialData?.updated_at ? new Date(initialData.updated_at).getTime() : 0;
        
        if (autosavedAt > initialUpdatedAt) {
          toast("Encontrámos um rascunho automático mais recente para este artigo.", {
            action: {
              label: "Recuperar",
              onClick: () => {
                setTitle(parsed.title || "");
                setSlug(parsed.slug || "");
                setSubtitle(parsed.subtitle || "");
                setExcerpt(parsed.excerpt || "");
                setContent(parsed.content || "");
                setFeaturedImage(parsed.featuredImage || "");
                setFeaturedImageAlt(parsed.featuredImageAlt || "");
                setCategoryId(parsed.categoryId || "");
                setAuthorId(parsed.authorId || "");
                setStatus(parsed.status || "draft");
                setReadingTime(parsed.readingTime || 5);
                setSeoTitle(parsed.seoTitle || "");
                setSeoDescription(parsed.seoDescription || "");
                setPrimaryKeyword(parsed.primaryKeyword || "");
                toast.success("Rascunho recuperado.");
              }
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialData]);

  // Periodic autosave to localstorage
  useEffect(() => {
    if (!title && !content) return;
    const timer = setTimeout(() => {
      const payload = {
        title,
        slug,
        subtitle,
        excerpt,
        content,
        featuredImage,
        featuredImageAlt,
        categoryId,
        authorId,
        status,
        readingTime,
        seoTitle,
        seoDescription,
        primaryKeyword,
        autosavedAt: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, slug, subtitle, excerpt, content, featuredImage, featuredImageAlt, categoryId, authorId, status, readingTime, seoTitle, seoDescription, primaryKeyword]);

  // Generate slug
  const generateSlug = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generated);
  };

  // Inject helper tag at textarea cursor
  const insertFormatting = (tagStart: string, tagEnd = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagStart + (selected || "texto") + tagEnd;

    setContent(text.substring(0, start) + replacement + text.substring(end));
    
    // Reset focus & cursor selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + tagStart.length + (selected || "texto").length);
    }, 50);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("O título é obrigatório.");
      return;
    }
    if (!slug) {
      toast.error("O slug é obrigatório.");
      return;
    }

    const payload = {
      title,
      slug,
      subtitle: subtitle || null,
      excerpt: excerpt || null,
      content,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      category_id: categoryId || null,
      author_id: authorId || null,
      status,
      reading_time: Number(readingTime) || 5,
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      canonical_url: canonicalUrl || null,
      robots_index: robotsIndex,
      robots_follow: robotsFollow,
      og_title: ogTitle || null,
      og_description: ogDescription || null,
      og_image: ogImage || null,
      primary_keyword: primaryKeyword || null,
      published_at: status === "published" 
        ? (initialData?.published_at || new Date().toISOString()) 
        : status === "scheduled" && publishedAt 
        ? new Date(publishedAt).toISOString() 
        : null,
    };

    onSave(payload).then(() => {
      // Clear autosave buffer
      localStorage.removeItem(storageKey);
    });
  };

  return (
    <form onSubmit={handleSaveSubmit} className="space-y-6">
      {/* Save panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-700 tracking-tight text-foreground">
            {isEdit ? "Editar Artigo" : "Novo Artigo"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Os rascunhos são salvos automaticamente no seu navegador.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={loading} className="gap-2">
            <Save className="size-4" /> {loading ? "A guardar…" : "Guardar Artigo"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Fields */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6 space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Título do Artigo</label>
                <Input
                  required
                  placeholder="Escreva um título apelativo…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Slug (URL amigável)</label>
                <div className="flex gap-2">
                  <span className="flex items-center text-xs text-muted-foreground bg-muted border border-border px-3 rounded-lg select-none">
                    minderpay.com/blog/
                  </span>
                  <Input
                    required
                    placeholder="como-ganhar-dinheiro-online"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                    title="Gerar slug a partir do título"
                  >
                    <Sparkles className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Subtítulo / Resumo Curto</label>
                <Input
                  placeholder="Subtítulo ou descrição secundária…"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Excerpt (Excerto para listagens)</label>
                <Textarea
                  placeholder="Breve resumo para meta tags e cards de artigos…"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Editor & Preview Tabs */}
          <Card className="border border-border shadow-sm overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-border bg-muted/20 px-6 py-2 flex items-center justify-between">
                <TabsList className="bg-muted">
                  <TabsTrigger value="editor">Editor HTML</TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-1">
                    <Eye className="size-3.5" /> Pré-visualizar
                  </TabsTrigger>
                </TabsList>

                {activeTab === "editor" && (
                  <div className="flex flex-wrap gap-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("<h2>", "</h2>")} className="h-8 text-xs font-bold">H2</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("<h3>", "</h3>")} className="h-8 text-xs font-bold">H3</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("<strong>", "</strong>")} className="h-8 text-xs font-bold">B</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("<em>", "</em>")} className="h-8 text-xs italic">I</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting("<blockquote>", "</blockquote>")} className="h-8 text-xs">Citação</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting('<a href="https://">', "</a>")} className="h-8 text-xs"><LinkIcon className="size-3" /></Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting('<ul>\n  <li>', "</li>\n</ul>")} className="h-8 text-xs">Lista</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => insertFormatting('<img src="https://" alt="descrição" />')} className="h-8 text-xs"><ImageIcon className="size-3" /></Button>
                  </div>
                )}
              </div>

              <TabsContent value="editor" className="p-0 border-none m-0">
                <textarea
                  ref={contentRef}
                  required
                  placeholder="Escreva o conteúdo estruturado em HTML..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="w-full border-none p-6 font-mono text-sm leading-relaxed text-foreground bg-background focus:outline-none focus:ring-0 min-h-[400px]"
                />
              </TabsContent>

              <TabsContent value="preview" className="p-6 prose prose-stone dark:prose-invert max-w-none min-h-[400px] bg-background">
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-20">
                    Escreva algum conteúdo no editor para ver a pré-visualização.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          {/* SEO Accordion */}
          <Card className="border border-border shadow-sm">
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="w-full flex items-center justify-between p-6 font-semibold text-foreground text-left"
            >
              <span className="flex items-center gap-2 font-[family-name:var(--font-display)]">
                <Compass className="size-5 text-primary" /> SEO & Open Graph Avançado
              </span>
              <ChevronDown className={`size-5 text-muted-foreground transition-transform ${showSeo ? "rotate-180" : ""}`} />
            </button>
            {showSeo && (
              <CardContent className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Palavra-passe Principal (Target Keyword)</label>
                    <Input
                      placeholder="finanças pessoais"
                      value={primaryKeyword}
                      onChange={(e) => setPrimaryKeyword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Tempo de Leitura (minutos)</label>
                    <Input
                      type="number"
                      value={readingTime}
                      onChange={(e) => setReadingTime(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Meta Title (SEO Title)</label>
                    <Input
                      placeholder="Deixe em branco para usar o título"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">Meta Description (SEO Description)</label>
                    <Input
                      placeholder="Deixe em branco para usar o resumo"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Canonical URL</label>
                  <Input
                    placeholder="https://minderpay.com/blog/como-gerir-dinheiro"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                  />
                </div>

                <div className="border-t border-border/60 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Metatags de Robôs (Indexação)</h4>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-foreground select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={robotsIndex}
                        onChange={(e) => setRobotsIndex(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary size-4"
                      />
                      Permitir indexação (index)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-foreground select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={robotsFollow}
                        onChange={(e) => setRobotsFollow(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary size-4"
                      />
                      Permitir seguir links (follow)
                    </label>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-4">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Definições Open Graph (Redes Sociais)</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">Título Open Graph</label>
                      <Input
                        placeholder="Título para Facebook/Twitter…"
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground">Descrição Open Graph</label>
                      <Input
                        placeholder="Descrição para Facebook/Twitter…"
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground">URL da Imagem Open Graph</label>
                    <Input
                      placeholder="/api/public/media/..."
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Sidebar Settings Panel */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-base font-700">
                Publicação & Metadados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Estado do Artigo</label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                  <option value="scheduled">Agendado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </div>

              {/* Published At Date (if scheduled) */}
              {status === "scheduled" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Data/Hora de Agendamento</label>
                  <Input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </div>
              )}

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Categoria Principal</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Autor</label>
                <select
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Selecione um autor</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-base font-700">
                Imagem Destacada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">URL da Imagem</label>
                <Input
                  placeholder="https:// ou URL pública de média…"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">Texto Alternativo (Alt Text - Acessibilidade)</label>
                <Input
                  placeholder="Descreva a imagem para leitores de ecrã…"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                />
              </div>

              {/* Preview image box */}
              {featuredImage && (
                <div className="border border-border rounded-lg overflow-hidden aspect-video bg-muted relative">
                  <img
                    src={featuredImage}
                    alt="Pré-visualização da imagem destacada"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
