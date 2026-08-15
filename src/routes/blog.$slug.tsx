import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { getPost, registerView } from "@/lib/public.functions";
import { SiteLayout } from "@/components/site/layout";
import { AdSlot } from "@/components/site/AdSlot";
import { absoluteUrl, formatDate, postPath } from "@/lib/site";
import { Calendar, Clock, Facebook, Linkedin, MessageSquare, Twitter, Share2, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/$slug")({
  staleTime: 0,
  gcTime: 0,
  loader: async ({ params }) => {
    try {
      const res = await getPost({ data: { slug: params.slug } });
      
      if (res?.redirect) {
        throw redirect({
          href: res.redirect.new_path,
          statusCode: (res.redirect.status_code as any) || 301,
        });
      }

      if (!res?.post) {
        throw notFound();
      }

      return res;
    } catch (e: any) {
      if (e?.status === 301 || e?.status === 302 || e?.isRouteRedirect || e?.isNotFound) {
        throw e;
      }
      console.error("[blog.$slug loader error]:", e);
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return {};
    const post = loaderData.post;
    const siteTitle = `${post.seo_title || post.title} — MinderPay`;
    const canonical = post.canonical_url || absoluteUrl(postPath(post.slug));

    return {
      meta: [
        { title: siteTitle },
        { name: "description", content: post.seo_description || post.excerpt || "" },
        { name: "keywords", content: post.primary_keyword || "" },
        { property: "og:title", content: post.og_title || post.title },
        { property: "og:description", content: post.og_description || post.excerpt || "" },
        { property: "og:image", content: post.og_image || post.featured_image || "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { name: "twitter:title", content: post.og_title || post.title },
        { name: "twitter:description", content: post.og_description || post.excerpt || "" },
        { name: "twitter:image", content: post.og_image || post.featured_image || "" },
        { name: "robots", content: `${post.robots_index ? "index" : "noindex"}, ${post.robots_follow ? "follow" : "nofollow"}` },
      ],
      links: [
        { rel: "canonical", href: canonical },
      ],
      scripts: [
        // Schema.org BlogPosting structured data
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.subtitle || "",
            image: post.featured_image ? [post.featured_image] : [],
            datePublished: post.published_at,
            dateModified: post.updated_at || post.published_at,
            author: post.author
              ? {
                  "@type": "Person",
                  name: post.author.name,
                  url: absoluteUrl(`/autor/${post.author.slug}`),
                }
              : undefined,
            publisher: {
              "@type": "Organization",
              name: "MinderPay",
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/favicon.ico"),
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonical,
            },
          }),
        },
        // Schema.org BreadcrumbList structured data
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: post.category?.name || "Blog",
                item: post.category ? absoluteUrl(`/categoria/${post.category.slug}`) : absoluteUrl("/blog"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: canonical,
              },
            ],
          }),
        },
      ],
    };
  },
  component: PostView,
});

function PostView() {
  const { post, tags, related } = Route.useLoaderData();

  // Register page view on mount
  useEffect(() => {
    if (post?.slug) {
      registerView({ data: { slug: post.slug } }).catch((err) =>
        console.error("Failed to register page view:", err)
      );
    }
  }, [post?.slug]);

  if (!post) return null;

  const pageUrl = typeof window !== "undefined" ? window.location.href : absoluteUrl(postPath(post.slug));

  const handleShare = (platform: "fb" | "tw" | "in" | "wa" | "copy") => {
    let url = "";
    switch (platform) {
      case "fb":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        break;
      case "tw":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;
        break;
      case "in":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
        break;
      case "wa":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + pageUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(pageUrl);
        toast.success("Link copiado para a área de transferência!");
        return;
    }
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <SiteLayout>
      <article className="container-page py-8">
        {/* Top Ad */}
        <AdSlot slotKey="article_top" className="max-w-4xl mx-auto" />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
            </li>
            <span>/</span>
            {post.category && (
              <>
                <li>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: post.category.slug }}
                    search={{ page: 1 }}
                    className="hover:text-primary transition-colors"
                  >
                    {post.category.name}
                  </Link>
                </li>
                <span>/</span>
              </>
            )}
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mx-auto max-w-3xl mt-6 text-center md:text-left">
          {post.category && (
            <Link
              to="/categoria/$slug"
              params={{ slug: post.category.slug }}
              search={{ page: 1 }}
              className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              {post.category.name}
            </Link>
          )}

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Author and Date Meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 border-b border-t border-border/60 py-4 text-xs text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar_url ? (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {post.author.name[0]}
                  </div>
                )}
                <div>
                  <Link
                    to="/autor/$slug"
                    params={{ slug: post.author.slug }}
                    className="font-semibold text-foreground hover:underline"
                  >
                    {post.author.name}
                  </Link>
                  <span className="block text-[10px] text-muted-foreground">
                    {post.author.role_title || "Autor"}
                  </span>
                </div>
              </div>
            )}

            <span className="hidden sm:inline text-border">|</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>Publicado a {formatDate(post.published_at)}</span>
            </div>

            {post.updated_at && post.updated_at !== post.published_at && (
              <>
                <span className="hidden sm:inline text-border">|</span>
                <span className="italic">Atualizado a {formatDate(post.updated_at)}</span>
              </>
            )}

            <span className="hidden sm:inline text-border">|</span>

            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{post.reading_time} min de leitura</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mx-auto max-w-4xl mt-8 overflow-hidden rounded-2xl border border-border bg-muted aspect-video">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-muted text-primary/30 font-bold uppercase tracking-widest text-3xl">
              MinderPay
            </div>
          )}
        </div>

        {/* MAIN LAYOUT: Text Content & Sidebar Share */}
        <div className="mx-auto max-w-4xl mt-10 grid gap-10 md:grid-cols-4">
          {/* Social Share Sidebar (Desktop Only) */}
          <aside className="hidden md:block col-span-1 space-y-4 sticky top-24 self-start">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Partilhar
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleShare("fb")}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
                aria-label="Partilhar no Facebook"
              >
                <Facebook className="size-4 text-[#1877F2]" /> Facebook
              </button>
              <button
                onClick={() => handleShare("tw")}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
                aria-label="Partilhar no X / Twitter"
              >
                <Twitter className="size-4 text-foreground" /> Twitter / X
              </button>
              <button
                onClick={() => handleShare("in")}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
                aria-label="Partilhar no LinkedIn"
              >
                <Linkedin className="size-4 text-[#0A66C2]" /> LinkedIn
              </button>
              <button
                onClick={() => handleShare("wa")}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
                aria-label="Partilhar no WhatsApp"
              >
                <Share2 className="size-4 text-[#25D366]" /> WhatsApp
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted"
                aria-label="Copiar link do artigo"
              >
                <Share2 className="size-4 text-muted-foreground" /> Copiar Link
              </button>
            </div>
          </aside>

          {/* Article Text Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Rich Text Editor Content */}
            <div
              className="prose prose-article max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags list */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-1.5">
                  Tags:
                </span>
                {tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile Share block */}
            <div className="md:hidden border-t border-border pt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Partilhar este Artigo
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleShare("fb")}
                  className="rounded-full border border-border p-2.5 transition-colors hover:bg-muted"
                  aria-label="Facebook"
                >
                  <Facebook className="size-4 text-[#1877F2]" />
                </button>
                <button
                  onClick={() => handleShare("tw")}
                  className="rounded-full border border-border p-2.5 transition-colors hover:bg-muted"
                  aria-label="Twitter"
                >
                  <Twitter className="size-4 text-foreground" />
                </button>
                <button
                  onClick={() => handleShare("in")}
                  className="rounded-full border border-border p-2.5 transition-colors hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4 text-[#0A66C2]" />
                </button>
                <button
                  onClick={() => handleShare("wa")}
                  className="rounded-full border border-border p-2.5 transition-colors hover:bg-muted"
                  aria-label="WhatsApp"
                >
                  <Share2 className="size-4 text-[#25D366]" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="rounded-full border border-border p-2.5 transition-colors hover:bg-muted"
                  aria-label="Copiar link"
                >
                  <Share2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Middle Content/Article Bottom Ad Slot */}
            <AdSlot slotKey="in_content" />

            {/* Author Box */}
            {post.author && (
              <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8">
                {post.author.avatar_url ? (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    className="size-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl shrink-0">
                    {post.author.name[0]}
                  </div>
                )}
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Escrito Por
                  </span>
                  <h4 className="font-bold text-foreground hover:underline text-lg">
                    <Link to="/autor/$slug" params={{ slug: post.author.slug }}>
                      {post.author.name}
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.author.bio || "Membro da equipa de redação do MinderPay."}
                  </p>
                  <div className="flex justify-center sm:justify-start gap-3 pt-2 text-xs text-muted-foreground">
                    {post.author.website_url && (
                      <a href={post.author.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Website
                      </a>
                    )}
                    {post.author.twitter_url && (
                      <a href={post.author.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Twitter / X
                      </a>
                    )}
                    {post.author.linkedin_url && (
                      <a href={post.author.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ad before Related Articles */}
        <AdSlot slotKey="article_bottom" />

        {/* RELATED ARTICLES SECTION */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl text-center sm:text-left">
              Leia Também
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                  <Link to="/blog/$slug" params={{ slug: item.slug }} className="block overflow-hidden aspect-video relative bg-muted">
                    {item.featured_image ? (
                      <img
                        src={item.featured_image}
                        alt={item.featured_image_alt || item.title}
                        className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-muted text-primary/30 font-bold uppercase tracking-widest text-xs">
                        MinderPay
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-col p-4 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {item.category?.name}
                    </span>
                    <h4 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      <Link to="/blog/$slug" params={{ slug: item.slug }}>
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </SiteLayout>
  );
}
