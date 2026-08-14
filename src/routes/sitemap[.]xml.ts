import { createFileRoute } from "@tanstack/react-router";
import { fetchSitemapEntries } from "@/lib/public-data.server";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { posts, categories, authors } = await fetchSitemapEntries();

          const urls = [
            // Core pages
            { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "daily" },
            { loc: `${SITE_URL}/blog`, priority: "0.8", changefreq: "daily" },
            { loc: `${SITE_URL}/sobre`, priority: "0.5", changefreq: "monthly" },
            { loc: `${SITE_URL}/contacto`, priority: "0.5", changefreq: "monthly" },
            { loc: `${SITE_URL}/politica-de-privacidade`, priority: "0.3", changefreq: "monthly" },
            { loc: `${SITE_URL}/politica-de-cookies`, priority: "0.3", changefreq: "monthly" },
            { loc: `${SITE_URL}/termos-de-uso`, priority: "0.3", changefreq: "monthly" },
          ];

          // Dynamic Category Archives
          categories.forEach((cat) => {
            urls.push({
              loc: `${SITE_URL}/categoria/${cat.slug}`,
              priority: "0.6",
              changefreq: "weekly",
            });
          });

          // Dynamic Author Archives
          authors.forEach((aut) => {
            urls.push({
              loc: `${SITE_URL}/autor/${aut.slug}`,
              priority: "0.4",
              changefreq: "weekly",
            });
          });

          // Dynamic Blog Posts
          posts.forEach((post) => {
            const lastModDate = post.updated_at || post.published_at || new Date().toISOString();
            urls.push({
              loc: `${SITE_URL}/blog/${post.slug}`,
              priority: "0.8",
              changefreq: "weekly",
              // Optional lastmod
              ...(lastModDate && { lastmod: new Date(lastModDate).toISOString().split("T")[0] }),
            } as any);
          });

          const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url: any) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

          return new Response(xml, {
            status: 200,
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=3600, s-maxage=18000",
            },
          });
        } catch (err) {
          console.error("Failed to generate sitemap:", err);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
