import { createFileRoute, Link } from "@tanstack/react-router";
import { listPosts } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { ArticleCard } from "@/components/site/ArticleCard";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { absoluteUrl } from "@/lib/site";

const searchParamsSchema = z.object({
  q: z.string().catch("").optional(),
  page: z.number().int().min(1).catch(1).optional(),
});

export const Route = createFileRoute("/pesquisa")({
  validateSearch: (search) => searchParamsSchema.parse(search),
  loaderDeps: ({ search }) => ({ q: search.q, page: search.page }),
  loader: async ({ deps }) => {
    const queryTerm = deps.q || "";
    const pageNum = deps.page || 1;
    const perPage = 9;

    if (!queryTerm) {
      return { items: [], total: 0, page: pageNum, perPage };
    }

    try {
      const posts = await listPosts({
        data: { q: queryTerm, page: pageNum, perPage },
      });
      return { posts, page: pageNum, perPage };
    } catch (e) {
      console.error("Failed to fetch search results:", e);
      return { posts: { items: [], total: 0 }, page: pageNum, perPage };
    }
  },
  head: ({ loaderData, search }) => {
    const query = search.q || "";
    const siteTitle = `Pesquisa: "${query}" — MinderPay`;
    return {
      meta: [
        { title: siteTitle },
        // SEO optimization: block search query results from being crawled
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: siteTitle },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: absoluteUrl(`/pesquisa?q=${encodeURIComponent(query)}`) },
      ],
    };
  },
  component: SearchView,
});

function SearchView() {
  const { posts, page, perPage } = Route.useLoaderData() as any;
  const search = Route.useSearch();
  const query = search.q || "";

  const total = posts?.total || 0;
  const items = posts?.items || [];
  const totalPages = Math.ceil(total / perPage);

  return (
    <SiteLayout>
      <div className="container-page py-10">
        <div className="border-b border-border pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Resultados de Pesquisa
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl flex items-center gap-2">
            <Search className="size-8 text-muted-foreground" />
            {query ? `Resultados para "${query}"` : "Pesquisar no site"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {query
              ? `Foram encontrados ${total} artigo(s) correspondente(s) à sua pesquisa.`
              : "Escreva algo na pesquisa acima para encontrar artigos."}
          </p>
        </div>

        {/* Results Grid */}
        <div className="mt-10">
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((post: any) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-20 text-center">
              <Search className="mx-auto size-10 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground font-medium">
                Nenhum artigo correspondente encontrado.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/75">
                Tente pesquisar por termos diferentes ou palavras-chave mais genéricas.
              </p>
            </div>
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-12 flex justify-center items-center gap-1.5">
            <Link
              to="/pesquisa"
              search={{ q: query, page: Math.max(1, page - 1) }}
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
                  to="/pesquisa"
                  search={{ q: query, page: pageNum }}
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
              to="/pesquisa"
              search={{ q: query, page: Math.min(totalPages, page + 1) }}
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
