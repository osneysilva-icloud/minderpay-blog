import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, Tag as TagIcon, Eye, PlusCircle, Settings, Image as ImageIcon, Calendar, CheckCircle, Edit3 } from "lucide-react";
import { formatDateTime } from "@/lib/admin";

export const Route = createFileRoute("/admin/dashboard")({
  loader: async () => {
    // Run counts and fetches in parallel
    const [
      postsRes,
      categoriesRes,
      tagsRes,
      recentPostsRes,
      recentEditedRes
    ] = await Promise.all([
      supabase.from("posts").select("id,status,view_count"),
      supabase.from("categories").select("id", { count: "exact" }),
      supabase.from("tags").select("id", { count: "exact" }),
      supabase
        .from("posts")
        .select("id,title,status,published_at,view_count")
        .order("published_at", { ascending: false })
        .limit(5),
      supabase
        .from("posts")
        .select("id,title,status,updated_at,view_count")
        .order("updated_at", { ascending: false })
        .limit(5)
    ]);

    const posts = postsRes.data || [];
    const totalPosts = posts.length;
    const publishedCount = posts.filter(p => p.status === "published").length;
    const draftCount = posts.filter(p => p.status === "draft").length;
    const scheduledCount = posts.filter(p => p.status === "scheduled").length;
    const totalViews = posts.reduce((sum, p) => sum + (p.view_count || 0), 0);

    return {
      stats: {
        totalPosts,
        publishedCount,
        draftCount,
        scheduledCount,
        totalViews,
        categoriesCount: categoriesRes.count || 0,
        tagsCount: tagsRes.count || 0,
      },
      recentPosts: recentPostsRes.data || [],
      recentEdited: recentEditedRes.data || [],
    };
  },
  component: DashboardView,
});

function DashboardView() {
  const { stats, recentPosts, recentEdited } = Route.useLoaderData();

  const statCards = [
    { title: "Total de Artigos", value: stats.totalPosts, icon: FileText, color: "text-blue-600 bg-blue-50" },
    { title: "Publicados", value: stats.publishedCount, icon: CheckCircle, color: "text-green-600 bg-green-50" },
    { title: "Rascunhos", value: stats.draftCount, icon: Edit3, color: "text-amber-600 bg-amber-50" },
    { title: "Agendados", value: stats.scheduledCount, icon: Calendar, color: "text-purple-600 bg-purple-50" },
    { title: "Visualizações Globais", value: stats.totalViews.toLocaleString(), icon: Eye, color: "text-indigo-600 bg-indigo-50" },
    { title: "Categorias", value: stats.categoriesCount, icon: FolderOpen, color: "text-teal-600 bg-teal-50" },
    { title: "Tags", value: stats.tagsCount, icon: TagIcon, color: "text-pink-600 bg-pink-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Painel de Controlo
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Bem-vindo ao gestor de conteúdos do MinderPay.
        </p>
      </div>

      {/* Action Shortcuts */}
      <section className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Ações Rápidas
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:opacity-90"
          >
            <PlusCircle className="size-4" /> Novo Artigo
          </Link>
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <FolderOpen className="size-4" /> Categorias
          </Link>
          <Link
            to="/admin/tags"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <TagIcon className="size-4" /> Tags
          </Link>
          <Link
            to="/admin/media"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <ImageIcon className="size-4" /> Biblioteca de Mídia
          </Link>
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Settings className="size-4" /> Configurações do Site
          </Link>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="border border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {card.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${card.color}`}>
                  <Icon className="size-4.5" />
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  {card.value}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Recent Activity Tables */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Recent Published */}
        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">
              Últimos Artigos Publicados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <th className="py-2.5">Título</th>
                      <th className="py-2.5 text-center">Visualizações</th>
                      <th className="py-2.5 text-right">Publicação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-muted/30">
                        <td className="py-3 font-semibold text-foreground max-w-[200px] truncate">
                          <Link to="/admin/posts" className="hover:underline">
                            {post.title}
                          </Link>
                        </td>
                        <td className="py-3 text-center text-muted-foreground">
                          {post.view_count || 0}
                        </td>
                        <td className="py-3 text-right text-muted-foreground text-xs">
                          {formatDateTime(post.published_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Nenhum artigo publicado recentemente.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Edited */}
        <Card className="border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">
              Editados Recentemente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEdited.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <th className="py-2.5">Título</th>
                      <th className="py-2.5 text-center">Status</th>
                      <th className="py-2.5 text-right">Modificado em</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentEdited.map((post) => (
                      <tr key={post.id} className="hover:bg-muted/30">
                        <td className="py-3 font-semibold text-foreground max-w-[200px] truncate">
                          <Link to="/admin/posts" className="hover:underline">
                            {post.title}
                          </Link>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                            post.status === "published"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : post.status === "draft"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : "bg-purple-50 border-purple-200 text-purple-700"
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-muted-foreground text-xs">
                          {formatDateTime(post.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Nenhuma edição efetuada.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
