import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategoryBySlug, listPosts } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { ArticleCard } from "@/components/site/ArticleCard";
import { AdSlot } from "@/components/site/AdSlot";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/site";

const categorySearchSchema = z.object({
  page: z.number().int().min(1).catch(1).optional(),
});

export const Route = createFileRoute("/categoria/$slug")({
  validateSearch: (search) => categorySearchSchema.parse(search),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ params, deps }) => {
    try {
      const category = await getCategoryBySlug({ slug: params.slug });
      if (!category) {
        throw notFound();
      }
      const page = deps.page ?? 1;
      const perPage = 9;
      const posts = await listPosts({
        page,
        perPage,
        categorySlug: params.slug,
      });

      return { category, posts, page, perPage };
    } catch (e: any) {
      if (e.isRouteRedirect) throw e;
      console.error(e);
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.category) return {};
    const category = loaderData.category;
    const siteTitle = `${category.seo_title || category.name} — MinderPay`;
    return {
      meta: [
        { title: siteTitle },
        { name: "description", content: category.seo_description || category.description || "" },
        { name: "robots", content: `${category.robots_index ? "index" : "noindex"}, follow` },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: category.seo_description || category.description || "" },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: absoluteUrl(`/categoria/${category.slug}`) },
      ],
    };
  },
  component: CategoryView,
});

function CategoryView() {
  const { category, posts, page, perPage } = Route.useLoaderData();
  const totalPages = Math.ceil(posts.total / perPage);

  return (
    <SiteLayout>
      <div className="container-page py-10">
        <div className="border-b border-border pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Categoria
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Top Ad */}
        <AdSlot slotKey="header" />

        {/* Posts Grid */}
        <div className="mt-10">
          {posts.items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.items.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-sm text-muted-foreground">Nenhum artigo encontrado nesta categoria.</p>
            </div>
          )}
        </div>

        {/* Ad below Content */}
        <AdSlot slotKey="article_bottom" />

        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-12 flex justify-center items-center gap-1.5">
            <Link
              to="/categoria/$slug"
              params={{ slug: category.slug }}
              search={{ page: Math.max(1, page - 1) }}
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
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  search={{ page: pageNum }}
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
              to="/categoria/$slug"
              params={{ slug: category.slug }}
              search={{ page: Math.min(totalPages, page + 1) }}
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
