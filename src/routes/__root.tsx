import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { getSiteContext } from "../lib/public.functions";
import { SiteContextProvider, type SiteContextValue } from "../components/site/site-context";
import { Toaster } from "../components/ui/sonner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-3 text-5xl font-semibold text-foreground md:text-6xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        O endereço que procura não existe ou foi movido. Pode voltar ao início ou explorar os
        artigos mais recentes.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Voltar ao início
        </Link>
        <Link
          to="/blog"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Ver todos os artigos
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Root boundary error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um problema do nosso lado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    try {
      return await getSiteContext();
    } catch {
      return { settings: null, categories: [], adSlots: [] } as SiteContextValue;
    }
  },
  head: ({ loaderData }) => {
    const settings = loaderData?.settings ?? null;
    const siteName = settings?.site_name || SITE_NAME;
    const description = settings?.default_seo_description || SITE_DESCRIPTION;
    const gsc = settings?.gsc_verification;
    const ga = settings?.ga_measurement_id;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${siteName} — ${SITE_TAGLINE}` },
        { name: "description", content: description },
        { name: "theme-color", content: "#0f1b24" },
        { property: "og:site_name", content: siteName },
        { property: "og:locale", content: "pt_PT" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(gsc ? [{ name: "google-site-verification", content: gsc }] : []),
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: settings?.favicon_url || "/favicon.svg" },
        { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
      ],
      scripts: [
        ...(ga
          ? [
              { src: `https://www.googletagmanager.com/gtag/js?id=${ga}`, async: true },
              {
                children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: SITE_URL,
            description,
            inLanguage: "pt-PT",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/pesquisa?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const data = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteContextProvider value={data as SiteContextValue}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster position="top-center" richColors />
      </SiteContextProvider>
    </QueryClientProvider>
  );
}
