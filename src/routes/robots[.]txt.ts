import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /pesquisa
Disallow: /pesquisa*
Disallow: /checkout
Disallow: /checkout/*
Disallow: /carrinho
Disallow: /carrinho/*
Disallow: /produto
Disallow: /produto/*
Disallow: /registro
Disallow: /registro*
Disallow: /login
Disallow: /login*
Disallow: /api/
Disallow: /api/*

Sitemap: ${SITE_URL}/sitemap.xml
`;

        return new Response(content, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
