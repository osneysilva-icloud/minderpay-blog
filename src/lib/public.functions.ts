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
    if (input && typeof (input as any).slug === "string") {
      return {
        slug: (input as any).slug,
        city: (input as any).city,
        region: (input as any).region,
        country: (input as any).country,
        countryCode: (input as any).countryCode,
        deviceType: (input as any).deviceType,
      };
    }
    return z
      .object({
        slug: z.string().min(1),
        city: z.string().optional(),
        region: z.string().optional(),
        country: z.string().optional(),
        countryCode: z.string().optional(),
        deviceType: z.string().optional(),
      })
      .parse(input);
  })
  .handler(async ({ data }) => {
    let reqMeta: { country?: string; countryCode?: string; city?: string; region?: string; deviceType?: string } = {
      city: data.city,
      region: data.region,
      country: data.country,
      countryCode: data.countryCode,
      deviceType: data.deviceType,
    };

    try {
      const { getWebRequest } = await import("@tanstack/react-start/server");
      const req = getWebRequest();
      if (req) {
        const headers = req.headers;
        const rawCountry = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
        const rawRegion = headers.get("x-vercel-ip-country-region") || headers.get("cf-region");
        const rawCity = headers.get("x-vercel-ip-city") || headers.get("cf-ipcity");
        const clientIp = headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip");

        if (rawCountry && !reqMeta.country) {
          reqMeta.country = rawCountry === "MZ" ? "Moçambique" : rawCountry;
          reqMeta.countryCode = rawCountry;
        }

        if (rawCity && !reqMeta.city) {
          try { reqMeta.city = decodeURIComponent(rawCity); } catch { reqMeta.city = rawCity; }
        }

        if (rawRegion && !reqMeta.region) {
          try { reqMeta.region = decodeURIComponent(rawRegion); } catch { reqMeta.region = rawRegion; }
        }

        // If IP is valid and city/region still missing, query ipapi.co as server fallback
        if ((!reqMeta.city || !reqMeta.region) && clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1") {
          try {
            const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, { signal: AbortSignal.timeout(2000) });
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData.country_name) reqMeta.country = geoData.country_name;
              if (geoData.country_code) reqMeta.countryCode = geoData.country_code;
              if (geoData.city) reqMeta.city = geoData.city;
              if (geoData.region) reqMeta.region = geoData.region;
            }
          } catch {
            /* ignore timeout */
          }
        }
      }
    } catch {
      /* ignore server request parsing errors */
    }

    const { incrementView } = await import("./public-data.server");
    await incrementView(data.slug, reqMeta);
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
