import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getSiteContext = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchSiteContext } = await import("./public-data.server");
  return fetchSiteContext();
});

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchHome } = await import("./public-data.server");
  return fetchHome();
});

export const listPosts = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    const parsed = z
      .object({
        page: z.number().int().min(1).optional(),
        perPage: z.number().int().min(1).max(24).optional(),
        categorySlug: z.string().optional(),
        tagSlug: z.string().optional(),
        authorSlug: z.string().optional(),
        q: z.string().max(120).optional(),
      })
      .parse(input ?? {});
    return parsed;
  })
  .handler(async ({ data }) => {
    const { fetchPostList } = await import("./public-data.server");
    return fetchPostList(data);
  });

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    if (typeof input === "string") return { slug: input };
    if (input && typeof (input as any).slug === "string") return { slug: (input as any).slug };
    return z.object({ slug: z.string().min(1) }).parse(input);
  })
  .handler(async ({ data }) => {
    const { fetchPost } = await import("./public-data.server");
    return fetchPost(data.slug);
  });

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    if (typeof input === "string") return { slug: input };
    if (input && typeof (input as any).slug === "string") return { slug: (input as any).slug };
    return z.object({ slug: z.string().min(1) }).parse(input);
  })
  .handler(async ({ data }) => {
    const { fetchCategory } = await import("./public-data.server");
    return fetchCategory(data.slug);
  });

export const getAuthorBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    if (typeof input === "string") return { slug: input };
    if (input && typeof (input as any).slug === "string") return { slug: (input as any).slug };
    return z.object({ slug: z.string().min(1) }).parse(input);
  })
  .handler(async ({ data }) => {
    const { fetchAuthor } = await import("./public-data.server");
    return fetchAuthor(data.slug);
  });

export const registerView = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (typeof input === "string") return { slug: input };
    if (input && typeof (input as any).slug === "string") return { slug: (input as any).slug };
    return z.object({ slug: z.string().min(1) }).parse(input);
  })
  .handler(async ({ data }) => {
    const { incrementView } = await import("./public-data.server");
    await incrementView(data.slug);
    return { ok: true };
  });

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().min(2).max(120),
        email: z.string().email().max(160),
        subject: z.string().min(3).max(160),
        message: z.string().min(10).max(4000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { insertContactMessage } = await import("./public-data.server");
    return insertContactMessage(data);
  });

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({ email: z.string().email().max(160), source: z.string().max(60).optional() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { insertSubscriber } = await import("./public-data.server");
    return insertSubscriber(data.email, data.source ?? "site");
  });

export const getDashboardAnalytics = createServerFn({ method: "GET" })
  .handler(async () => {
    const { fetchDashboardAnalyticsData } = await import("./public-data.server");
    return fetchDashboardAnalyticsData();
  });
