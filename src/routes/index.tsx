import { createFileRoute, Link } from "@tanstack/react-router";
import { getHomeData } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { useSite } from "@/components/site/site-context";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArticleCard, FeaturedArticle } from "@/components/site/ArticleCard";
import { AdSlot } from "@/components/site/AdSlot";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatDateShort } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await getHomeData();
    } catch (e) {
      console.error("Error loading home data:", e);
      return { recent: [], popular: [], featured: [] };
    }
  },
  component: Index,
});

function Index() {
  const { recent, popular, featured } = Route.useLoaderData();
  const { categories } = useSite();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.session.user.id)
          .eq("role", "admin")
          .maybeSingle()
          .then(({ data: roleData }) => {
            if (roleData) setIsAdmin(true);
          });
      }
    });
  }, []);

  // If there are featured posts, pick the first one as primary hero
  const primaryFeatured = featured.length > 0 ? featured[0] : null;
  const secondaryFeatured = featured.length > 1 ? featured.slice(1, 4) : [];

  // Exclude primary/secondary featured posts from recent posts to prevent duplication
  const featuredIds = new Set(featured.map((p) => p.id));
  const filteredRecent = recent.filter((p) => !featuredIds.has(p.id));

  return (
    <SiteLayout>
      <div className="container-page py-8">
        {/* Top Header Ad Slot */}
        <AdSlot slotKey="header" className="mx-auto max-w-4xl" />

        {/* HERO SECTION */}
        <section className="mt-6 border-b border-border pb-12">
          {primaryFeatured ? (
            <div className="space-y-12">
              <FeaturedArticle post={primaryFeatured} />
              
              {secondaryFeatured.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-border/60">
                  {secondaryFeatured.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : recent.length > 0 ? (
            <FeaturedArticle post={recent[0]} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <h2 className="text-xl font-medium text-foreground">Nenhum artigo publicado</h2>
              {isAdmin ? (
                <>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Inicie sessão no painel para criar e publicar os seus primeiros artigos.
                  </p>
                  <Link
                    to="/admin/login"
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Ir para o Painel
                  </Link>
                </>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  De momento, não existem artigos publicados no portal. Por favor, volte a visitar-nos mais tarde.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Ad below Hero */}
        {recent.length > 0 && <AdSlot slotKey="article_top" />}

        {/* MAIN BODY - RECENT & SIDEBAR POPULAR */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Recent Articles Column */}
          <section className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl">
                Mais Recentes
              </h2>
              <Link
                to="/blog"
                search={{ page: 1 }}
                className="group flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Ver todos <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {filteredRecent.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredRecent.slice(0, 8).map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum artigo recente encontrado.</p>
            )}

            {filteredRecent.length > 8 && (
              <div className="flex justify-center pt-4">
                <Link
                  to="/blog"
                  search={{ page: 1 }}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Carregar mais artigos
                </Link>
              </div>
            )}
          </section>

          {/* Sidebar Column */}
          <aside className="space-y-10">
            {/* Popular Section */}
            {popular.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-6">
                <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground border-b border-border pb-3">
                  <TrendingUp className="size-5 text-primary" /> Populares
                </h3>
                <div className="mt-4 divide-y divide-border">
                  {popular.map((post, idx) => (
                    <div key={post.id} className="group py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <span className="font-[family-name:var(--font-display)] text-3xl font-700 leading-none text-muted-foreground/30 group-hover:text-primary transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="space-y-1">
                          {post.category && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {post.category.name}
                            </span>
                          )}
                          <h4 className="font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            <Link to="/blog/$slug" params={{ slug: post.slug }}>
                              {post.title}
                            </Link>
                          </h4>
                          <span className="block text-[11px] text-muted-foreground">
                            {formatDateShort(post.published_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sidebar Ad Slot */}
            <AdSlot slotKey="sidebar" />

            {/* Categories Section */}
            {categories.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground border-b border-border pb-3">
                  Categorias
                </h3>
                <ul className="mt-4 space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to="/categoria/$slug"
                        params={{ slug: category.slug }}
                        search={{ page: 1 }}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <span>{category.name}</span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>

        {/* Ad before footer */}
        <AdSlot slotKey="article_bottom" />
      </div>
    </SiteLayout>
  );
}
