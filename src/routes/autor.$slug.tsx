import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAuthorBySlug, listPosts } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { ArticleCard } from "@/components/site/ArticleCard";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Globe, Linkedin, Twitter } from "lucide-react";
import { absoluteUrl } from "@/lib/site";

const authorSearchSchema = z.object({
  page: z.number().int().min(1).catch(1).optional(),
});

export const Route = createFileRoute("/autor/$slug")({
  validateSearch: (search) => authorSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ params, deps }) => {
    try {
      const author = await getAuthorBySlug({ data: { slug: params.slug } });
      if (!author) {
        throw notFound();
      }
      const page = deps.page ?? 1;
      const perPage = 9;
      const posts = await listPosts({
        data: { page, perPage, authorSlug: params.slug },
      });
      return { author, posts, page, perPage };
    } catch (e: any) {
      if (e.isRouteRedirect) throw e;
      console.error(e);
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.author) return {};
    const author = loaderData.author;
    const siteTitle = `${author.name} — Redação MinderPay`;
    return {
      meta: [
        { title: siteTitle },
        { name: "description", content: author.bio || "" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: author.bio || "" },
        { property: "og:type", content: "profile" },
      ],
      links: [
        { rel: "canonical", href: absoluteUrl(`/autor/${author.slug}`) },
      ],
    };
  },
  component: AuthorView,
});

function AuthorView() {
  const { author, posts, page, perPage } = Route.useLoaderData();
  const totalPages = Math.ceil(posts.total / perPage);

  return (
    <SiteLayout>
      <div className="container-page py-10">
        {/* Author Header Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          {author.avatar_url ? (
            <img
              src={author.avatar_url}
              alt={author.name}
              className="size-24 rounded-full object-cover shrink-0 ring-4 ring-muted"
            />
          ) : (
            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-3xl shrink-0">
              {author.name[0]}
            </div>
          )}
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Perfil do Autor
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-700 tracking-tight text-foreground md:text-3xl">
              {author.name}
            </h1>
            <span className="inline-block text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded">
              {author.role_title || "Redator"}
            </span>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {author.bio || "Contribuidor do MinderPay, trazendo novidades sobre negócios, finanças e tecnologia."}
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-3 pt-3 text-muted-foreground">
              {author.website_url && (
                <a
                  href={author.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"
                >
                  <Globe className="size-4" /> Website
                </a>
              )}
              {author.twitter_url && (
                <a
                  href={author.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"
                >
                  <Twitter className="size-4" /> Twitter / X
                </a>
              )}
              {author.linkedin_url && (
                <a
                  href={author.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"
                >
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Author Posts Grid */}
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground border-b border-border pb-4">
            Artigos Publicados
          </h2>
          <div className="mt-8">
            {posts.items.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.items.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border py-12 text-center">
                <p className="text-sm text-muted-foreground">Nenhum artigo publicado por este autor.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-12 flex justify-center items-center gap-1.5">
            <Link
              to="/autor/$slug"
              params={{ slug: author.slug }}
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
                  to="/autor/$slug"
                  params={{ slug: author.slug }}
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
              to="/autor/$slug"
              params={{ slug: author.slug }}
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
