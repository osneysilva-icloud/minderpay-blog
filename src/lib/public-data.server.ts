/**
 * Camada de leitura pública (executada apenas no servidor).
 * Usa a chave publicável — as políticas de acesso da base de dados continuam a
 * ser aplicadas, pelo que só conteúdo publicado é devolvido.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type PostCard = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  reading_time: number;
  is_example: boolean;
  category: { name: string; slug: string } | null;
  author: { name: string; slug: string; avatar_url: string | null } | null;
};

export const POST_CARD_SELECT =
  "id,title,slug,subtitle,excerpt,featured_image,featured_image_alt,published_at,reading_time,is_example,category:categories(name,slug),author:authors(name,slug,avatar_url)";

let cached: ReturnType<typeof build> | undefined;

function build() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export function db() {
  if (!cached) cached = build();
  return cached;
}

function publishedFilter<T>(query: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (query as any)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString());
}

export async function fetchSiteContext() {
  const supabase = db();
  const [settings, categories, ads] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase.from("categories").select("id,name,slug,description").order("sort_order"),
    supabase.from("ad_slots").select("key,enabled,ad_client,ad_unit_id"),
  ]);
  return {
    settings: settings.data,
    categories: categories.data ?? [],
    adSlots: ads.data ?? [],
  };
}

export async function fetchHome() {
  const supabase = db();
  const recentQuery = publishedFilter(
    supabase.from("posts").select(POST_CARD_SELECT),
  )
    .order("published_at", { ascending: false })
    .limit(13);

  const popularQuery = publishedFilter(
    supabase.from("posts").select(POST_CARD_SELECT),
  )
    .order("view_count", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(5);

  const featuredQuery = publishedFilter(
    supabase.from("posts").select(POST_CARD_SELECT),
  )
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(4);

  const [recent, popular, featured] = await Promise.all([
    recentQuery,
    popularQuery,
    featuredQuery,
  ]);

  return {
    recent: (recent.data ?? []) as unknown as PostCard[],
    popular: (popular.data ?? []) as unknown as PostCard[],
    featured: (featured.data ?? []) as unknown as PostCard[],
  };
}

export type ListParams = {
  page?: number | undefined;
  perPage?: number | undefined;
  categorySlug?: string | undefined;
  tagSlug?: string | undefined;
  authorSlug?: string | undefined;
  q?: string | undefined;
};

export async function fetchPostList(params: ListParams) {
  const supabase = db();
  const page = Math.max(1, params.page ?? 1);
  const perPage = Math.min(24, params.perPage ?? 9);
  const from = (page - 1) * perPage;

  let categoryId: string | null = null;
  if (params.categorySlug) {
    const { data } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", params.categorySlug)
      .maybeSingle();
    if (!data) return { items: [] as PostCard[], total: 0, page, perPage };
    categoryId = data.id;
  }

  let authorId: string | null = null;
  if (params.authorSlug) {
    const { data } = await supabase
      .from("authors")
      .select("id")
      .eq("slug", params.authorSlug)
      .maybeSingle();
    if (!data) return { items: [] as PostCard[], total: 0, page, perPage };
    authorId = data.id;
  }

  let postIds: string[] | null = null;
  if (params.tagSlug) {
    const { data: tag } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", params.tagSlug)
      .maybeSingle();
    if (!tag) return { items: [] as PostCard[], total: 0, page, perPage };
    const { data: links } = await supabase
      .from("post_tags")
      .select("post_id")
      .eq("tag_id", tag.id);
    postIds = (links ?? []).map((l) => l.post_id);
    if (postIds.length === 0) return { items: [], total: 0, page, perPage };
  }

  let query = publishedFilter(
    supabase.from("posts").select(POST_CARD_SELECT, { count: "exact" }),
  );
  if (categoryId) query = query.eq("category_id", categoryId);
  if (authorId) query = query.eq("author_id", authorId);
  if (postIds) query = query.in("id", postIds);
  if (params.q) {
    const term = params.q.replace(/[%,()]/g, " ").trim();
    if (term) {
      query = query.or(
        `title.ilike.%${term}%,excerpt.ilike.%${term}%,subtitle.ilike.%${term}%,content.ilike.%${term}%`,
      );
    }
  }

  const { data, count } = await query
    .order("published_at", { ascending: false })
    .range(from, from + perPage - 1);

  return {
    items: (data ?? []) as unknown as PostCard[],
    total: count ?? 0,
    page,
    perPage,
  };
}

export async function fetchPost(slug: string) {
  const supabase = db();
  const { data } = await publishedFilter(
    supabase
      .from("posts")
      .select(
        "*,category:categories(id,name,slug),author:authors(id,name,slug,bio,avatar_url,role_title,website_url,twitter_url,linkedin_url)",
      ),
  )
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    const { data: redirect } = await supabase
      .from("redirects")
      .select("new_path,status_code")
      .eq("old_path", `/blog/${slug}`)
      .maybeSingle();
    return { post: null, tags: [], related: [], redirect: redirect ?? null };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = data as any;

  const [{ data: tagLinks }, relatedResult] = await Promise.all([
    supabase.from("post_tags").select("tag:tags(name,slug)").eq("post_id", post.id),
    post.category_id
      ? publishedFilter(supabase.from("posts").select(POST_CARD_SELECT))
          .eq("category_id", post.category_id)
          .neq("id", post.id)
          .order("published_at", { ascending: false })
          .limit(3)
      : Promise.resolve({ data: [] }),
  ]);

  let related = ((relatedResult as { data: unknown }).data ?? []) as unknown as PostCard[];
  if (related.length < 3) {
    const { data: fallback } = await publishedFilter(
      supabase.from("posts").select(POST_CARD_SELECT),
    )
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);
    const existing = new Set(related.map((r) => r.id));
    for (const item of (fallback ?? []) as unknown as PostCard[]) {
      if (related.length >= 3) break;
      if (!existing.has(item.id)) related.push(item);
    }
  }

  return {
    post,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: ((tagLinks ?? []) as any[]).map((t) => t.tag).filter(Boolean) as {
      name: string;
      slug: string;
    }[],
    related,
    redirect: null,
  };
}

export async function fetchCategory(slug: string) {
  const { data } = await db().from("categories").select("*").eq("slug", slug).maybeSingle();
  return data;
}

export async function fetchAuthor(slug: string) {
  const { data } = await db().from("authors").select("*").eq("slug", slug).maybeSingle();
  return data;
}

export async function fetchSitemapEntries() {
  const supabase = db();
  const [posts, categories, authors] = await Promise.all([
    publishedFilter(
      supabase.from("posts").select("slug,updated_at,published_at,robots_index"),
    ).order("published_at", { ascending: false }),
    supabase.from("categories").select("slug,updated_at,robots_index"),
    supabase.from("authors").select("slug,updated_at"),
  ]);
  return {
    posts: (posts.data ?? []).filter((p) => p.robots_index),
    categories: (categories.data ?? []).filter((c) => c.robots_index),
    authors: authors.data ?? [],
  };
}

export async function incrementView(slug: string) {
  const supabase = db();
  const { data } = await publishedFilter(supabase.from("posts").select("id,view_count"))
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin
    .from("posts")
    .update({ view_count: (data.view_count ?? 0) + 1 })
    .eq("id", data.id);
}

export async function insertContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await db().from("contact_messages").insert(input);
  if (error) throw new Error("Não foi possível enviar a mensagem.");
  return { ok: true };
}

export async function insertSubscriber(email: string, source: string) {
  const { error } = await db()
    .from("newsletter_subscribers")
    .insert({ email: email.toLowerCase(), source });
  if (error && !error.message.includes("duplicate")) {
    throw new Error("Não foi possível concluir a subscrição.");
  }
  return { ok: true };
}
