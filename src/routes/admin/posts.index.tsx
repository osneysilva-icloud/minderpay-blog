import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  ArrowUpDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Archive,
  Globe,
} from "lucide-react";
import { formatDateShort } from "@/lib/site";

const postsSearchSchema = z.object({
  page: z.number().int().min(1).catch(1).optional(),
  q: z.string().catch("").optional(),
  category: z.string().catch("").optional(),
  status: z.string().catch("").optional(),
  sort: z.enum(["newest", "oldest", "views"]).catch("newest").optional(),
});

export const Route = createFileRoute("/admin/posts/")({
  validateSearch: (search) => postsSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    q: search.q,
    category: search.category,
    status: search.status,
    sort: search.sort,
  }),
  loader: async ({ deps }) => {
    const pageNum = deps.page || 1;
    const perPage = 10;
    const from = (pageNum - 1) * perPage;
    const to = from + perPage - 1;

    // Load filters metadata
    const categoriesRes = await supabase.from("categories").select("id,name").order("name");

    let query = supabase
      .from("posts")
      .select("id,title,slug,status,published_at,updated_at,view_count,category:categories(id,name),author:authors(id,name)", { count: "exact" });

    if (deps.q) {
      query = query.ilike("title", `%${deps.q}%`);
    }
    if (deps.category) {
      query = query.eq("category_id", deps.category);
    }
    if (deps.status) {
      query = query.eq("status", deps.status);
    }

    if (deps.sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    } else if (deps.sort === "views") {
      query = query.order("view_count", { ascending: false });
    } else {
      // newest
      query = query.order("created_at", { ascending: false });
    }

    const postsRes = await query.range(from, to);

    return {
      posts: postsRes.data || [],
      total: postsRes.count || 0,
      categories: categoriesRes.data || [],
      page: pageNum,
      perPage,
    };
  },
  component: PostsManagementView,
});

function PostsManagementView() {
  const navigate = useNavigate();
  const { posts, total, categories, page, perPage } = Route.useLoaderData();
  const search = Route.useSearch();

  const [searchVal, setSearchVal] = useState(search.q || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Sync search input with state
  useEffect(() => {
    setSearchVal(search.q || "");
  }, [search.q]);

  const updateSearch = (newParams: Record<string, any>) => {
    void navigate({
      to: "/admin/posts",
      search: {
        ...search,
        ...newParams,
        page: 1, // reset page
      },
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({ q: searchVal });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.from("posts").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("Artigo excluído com sucesso.");
      setConfirmOpen(false);
      setDeleteId(null);
      // Reload route data
      void navigate({ to: "/admin/posts", search });
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir o artigo.");
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const { error } = await supabase
        .from("posts")
        .update({
          status: newStatus as any,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;
      toast.success(newStatus === "published" ? "Artigo publicado!" : "Artigo despublicado.");
      void navigate({ to: "/admin/posts", search });
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar o artigo.");
    }
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
            Artigos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie todas as publicações de conteúdo do seu blog.
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:opacity-90 self-start"
        >
          <Plus className="size-4" /> Novo Artigo
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar por título…"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="pl-9"
          />
        </form>

        <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Categoria:</span>
            <select
              value={search.category || ""}
              onChange={(e) => updateSearch({ category: e.target.value || undefined })}
              className="h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
            >
              <option value="">Todas</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Status:</span>
            <select
              value={search.status || ""}
              onChange={(e) => updateSearch({ status: e.target.value || undefined })}
              className="h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
            >
              <option value="">Todos</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="scheduled">Agendado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Ordenação:</span>
            <select
              value={search.sort || "newest"}
              onChange={(e) => updateSearch({ sort: e.target.value || undefined })}
              className="h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="views">Mais visualizados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Listing Container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {/* Mobile View: Cards Layout (sm:hidden) */}
        <div className="block sm:hidden divide-y divide-border">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-4 space-y-3 bg-card hover:bg-muted/10 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm leading-snug break-words">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                        {post.category?.name || "Sem categoria"}
                      </span>
                      <span>·</span>
                      <span>{post.view_count || 0} leituras</span>
                    </div>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <StatusBadge status={post.status} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                  <span>Autor: {post.author?.name || "Sem autor"}</span>
                  <span>{formatDateShort(post.published_at)}</span>
                </div>

                {/* Mobile Action Bar with High-Contrast Text Labels */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <Link
                    to={`/admin/posts/${post.id}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 dark:bg-blue-700 text-white px-2.5 py-2 text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Editar</span>
                  </Link>

                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-2.5 py-2 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="size-3.5 text-gray-600 dark:text-gray-400" />
                    <span>Ver</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => togglePublishStatus(post.id, post.status)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-2.5 py-2 text-xs font-semibold hover:bg-amber-200 transition-colors"
                  >
                    {post.status === "published" ? <Archive className="size-3.5" /> : <Globe className="size-3.5" />}
                    <span>{post.status === "published" ? "Arquivar" : "Publicar"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteId(post.id);
                      setConfirmOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 px-2.5 py-2 text-xs font-bold hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="size-3.5 text-red-600 dark:text-red-400" />
                    <span>Apagar</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Nenhum artigo encontrado para a seleção atual.
            </div>
          )}
        </div>

        {/* Desktop View: Table Layout (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-3.5">Título</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5 text-center">Status</th>
                <th className="px-6 py-3.5">Autor</th>
                <th className="px-6 py-3.5 text-center">Leituras</th>
                <th className="px-6 py-3.5 text-right">Datas</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/10">
                    <td className="px-6 py-4 font-semibold text-foreground max-w-[280px] truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {post.category?.name || "Sem categoria"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {post.author?.name || "Sem autor"}
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">
                      {post.view_count || 0}
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-muted-foreground space-y-1">
                      <span className="block">Criado: {formatDateShort(post.published_at)}</span>
                      {post.updated_at && (
                        <span className="block italic text-[10px]">Atu: {formatDateShort(post.updated_at)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublishStatus(post.id, post.status)}
                          className="rounded-lg p-2 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
                          title={post.status === "published" ? "Despublicar Artigo" : "Publicar Artigo"}
                        >
                          {post.status === "published" ? <Archive className="size-4" /> : <Globe className="size-4" />}
                        </button>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          target="_blank"
                          className="rounded-lg p-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 transition-colors"
                          title="Visualizar Artigo Público"
                        >
                          <Eye className="size-4" />
                        </Link>
                        <Link
                          to={`/admin/posts/${post.id}`}
                          className="rounded-lg p-2 bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-colors"
                          title="Editar Artigo"
                        >
                          <Edit2 className="size-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteId(post.id);
                            setConfirmOpen(true);
                          }}
                          className="rounded-lg p-2 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 transition-colors"
                          title="Excluir Artigo"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Nenhum artigo encontrado para a seleção atual.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-border px-6 py-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              A mostrar {posts.length} de {total} artigos
            </span>
            <nav aria-label="Paginação" className="flex items-center gap-1.5">
              <Link
                to="/admin/posts"
                search={{ ...search, page: Math.max(1, page - 1) }}
                disabled={page <= 1}
                className={`inline-flex size-8 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${
                  page <= 1 ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <ChevronLeft className="size-4" />
              </Link>
              <span className="font-semibold text-xs px-2">
                Página {page} de {totalPages}
              </span>
              <Link
                to="/admin/posts"
                search={{ ...search, page: Math.min(totalPages, page + 1) }}
                disabled={page >= totalPages}
                className={`inline-flex size-8 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${
                  page >= totalPages ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <ChevronRight className="size-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deseja excluir este artigo?"
        description="Esta ação é permanente e excluirá o artigo do banco de dados definitivamente. Não poderá recuperá-lo."
        confirmText="Excluir Permanente"
        onConfirm={handleDelete}
      />
    </div>
  );
}
