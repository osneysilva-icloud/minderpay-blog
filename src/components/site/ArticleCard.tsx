import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/site";
import type { PostCard } from "@/lib/public-data.server";

interface ArticleCardProps {
  post: PostCard;
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden aspect-video relative bg-muted">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || post.title}
            width={400}
            height={225}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted text-primary/40 font-bold uppercase tracking-widest text-lg">
            MinderPay
          </div>
        )}
        {post.category && (
          <span className="absolute left-3 top-3 rounded bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {post.category.name}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {post.reading_time} min
          </span>
        </div>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          <Link to="/blog/$slug" params={{ slug: post.slug }}>
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt || post.subtitle || "Sem descrição disponível."}
        </p>
        {post.author && (
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            {post.author.avatar_url ? (
              <img
                src={post.author.avatar_url}
                alt={post.author.name}
                className="size-7 rounded-full object-cover"
              />
            ) : (
              <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                {post.author.name[0]}
              </div>
            )}
            <Link to="/autor/$slug" params={{ slug: post.author.slug }} className="text-xs font-medium text-foreground hover:underline">
              {post.author.name}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

export function FeaturedArticle({ post }: ArticleCardProps) {
  return (
    <article className="group grid gap-6 md:grid-cols-2 lg:gap-10">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden rounded-2xl border border-border aspect-video md:aspect-auto md:h-full min-h-[250px] relative bg-muted">
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.featured_image_alt || post.title}
            width={800}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted text-primary/40 font-bold uppercase tracking-widest text-2xl">
            MinderPay
          </div>
        )}
        {post.category && (
          <span className="absolute left-4 top-4 rounded bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
            {post.category.name}
          </span>
        )}
      </Link>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {post.reading_time} min
          </span>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-700 leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl group-hover:text-primary transition-colors">
          <Link to="/blog/$slug" params={{ slug: post.slug }}>
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {post.excerpt || post.subtitle || "Sem descrição disponível."}
        </p>
        {post.author && (
          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            {post.author.avatar_url ? (
              <img
                src={post.author.avatar_url}
                alt={post.author.name}
                className="size-9 rounded-full object-cover"
              />
            ) : (
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {post.author.name[0]}
              </div>
            )}
            <div>
              <Link to="/autor/$slug" params={{ slug: post.author.slug }} className="block text-sm font-semibold text-foreground hover:underline">
                {post.author.name}
              </Link>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Autor</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
