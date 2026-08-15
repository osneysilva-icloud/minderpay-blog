import { createFileRoute, Link } from "@tanstack/react-router";
import { listPosts } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { useSite } from "@/components/site/site-context";
import { ArticleCard } from "@/components/site/ArticleCard";
import { AdSlot } from "@/components/site/AdSlot";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogSearchSchema = z.object({
  page: z.number().int().min(1).catch(1).optional(),
  categoria: z.string().optional(),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => blogSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({ page: search.page, categoria: search.categoria }),
  loader: async ({ deps }) => {
    try {
      const perPage = 9;
      const res = await listPosts({
        data: { page: deps.page ?? 1, perPage, categorySlug: deps.categoria },
      });
      return res;
    } catch (e) {
      console.error(e);
      return { items: [], total: 0, page: deps.page ?? 1, perPage: 9 };
    }
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { items, total, page, perPage } = Route.useLoaderData();
  const search = Route.useSearch();
  const { categories } = useSite();

  const totalPages = Math.ceil(total / perPage);

  return (
    <SiteLayout>
      <div className="container-page py-10">
        <div className="border-b border-border pb-6">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl">
            Todos os Artigos
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore publicações organizadas por temas práticos e relevantes.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            to="/blog"
            search={{ page: 1, categoria: undefined }}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
              !search.categoria
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border text-foreground hover:bg-muted"
            }`}
          >
            Todos
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/blog"
              search={{ page: 1, categoria: category.slug }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                search.categoria === category.slug
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Top Ad */}
        <AdSlot slotKey="header" />

        {/* Articles Grid */}
        <div className="mt-10">
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-sm text-muted-foreground">Nenhum artigo encontrado nesta seleção.</p>
            </div>
          )}
        </div>

        {/* Ad below Content */}
        <AdSlot slotKey="article_bottom" />

        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-12 flex justify-center items-center gap-1.5">
            <Link
              to="/blog"
              search={{ page: Math.max(1, page - 1), categoria: search.categoria }}
              disabled={page <= 1}
              className={`inline-flex size-9 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${
                page <= 1 ? "opacity-40 pointer-events-none" : ""
              }`}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft className="size-4" />
            </Link>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Link
                  key={pageNum}
                  to="/blog"
                  search={{ page: pageNum, categoria: search.categoria }}
                  className={`inline-flex size-9 items-center justify-center rounded border font-semibold text-xs transition-all ${
                    page === pageNum
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            <Link
              to="/blog"
              search={{ page: Math.min(totalPages, page + 1), categoria: search.categoria }}
              disabled={page >= totalPages}
              className={`inline-flex size-9 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${
                page >= totalPages ? "opacity-40 pointer-events-none" : ""
              }`}
            >
              <span className="sr-only">Próxima página</span>
              <ChevronRight className="size-4" />
            </Link>
          </nav>
        )}
      </div>
    </SiteLayout>
  );
}
