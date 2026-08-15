import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { t as supabase } from "./client-CRIS042E.mjs";
import { n as fetchSitemapEntries, t as __exportAll$1 } from "./public-data.server-qVmVgxa_.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { F as notFound, M as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-C1p7zOu_.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/public.functions-EtJepgPz.js
var getSiteContext = createServerFn({ method: "GET" }).handler(createSsrRpc("238caf384fbea7f2c70fbc04c0ab9e63de01c9b2c39503b8c18b0def2a7d8f63"));
var getHomeData = createServerFn({ method: "GET" }).handler(createSsrRpc("514c825cd0bfcd882160370a17467d767e38a3a4176769246907d1f2960bad74"));
var listPosts = createServerFn({ method: "GET" }).validator((input) => {
	return objectType({
		page: numberType().int().min(1).optional(),
		perPage: numberType().int().min(1).max(24).optional(),
		categorySlug: stringType().optional(),
		tagSlug: stringType().optional(),
		authorSlug: stringType().optional(),
		q: stringType().max(120).optional()
	}).parse(input ?? {});
}).handler(createSsrRpc("8e87d4f69c5599eafdc0b76c641747b554e920e29938ae6d0c2edf663cfeff63"));
var getPost = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(createSsrRpc("c39bb73307252949bed66af97c75688ba18dab4b13a8242caceacf710cbcda99"));
var getCategoryBySlug = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(createSsrRpc("0705329e7ae4f1d943cb9a99cfe623e3982f8e29afd38928f13a7b2128d45479"));
var getAuthorBySlug = createServerFn({ method: "GET" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(createSsrRpc("da3c6b693581cf7d65681a0c5047efde8ebba2ac29baf90102eee10ea6e3bb42"));
var registerView = createServerFn({ method: "POST" }).validator((input) => {
	if (typeof input === "string") return { slug: input };
	if (input && typeof input.slug === "string") return { slug: input.slug };
	return objectType({ slug: stringType().min(1) }).parse(input);
}).handler(createSsrRpc("8e0176378f941a66ac5054145260780cec508cf904481ac6b002af04212e552f"));
createServerFn({ method: "POST" }).validator((input) => objectType({
	name: stringType().min(2).max(120),
	email: stringType().email().max(160),
	subject: stringType().min(3).max(160),
	message: stringType().min(10).max(4e3)
}).parse(input)).handler(createSsrRpc("2e4a76912fc069de7d2d51aee3304225a1aff3e002f26cb4b5ec8d0b04bb48a9"));
var subscribeToNewsletter = createServerFn({ method: "POST" }).validator((input) => objectType({
	email: stringType().email().max(160),
	source: stringType().max(60).optional()
}).parse(input)).handler(createSsrRpc("8ada39be3dac045365f8c096a56d27dd6b6108c705a1a969165f455db307ce47"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/site-R68xvOsM.js
/**
* Configuração central do site.
* O URL de produção é definido pela variável de ambiente VITE_SITE_URL
* (valor de produção: https://minderpay.com).
*/
var SITE_URL = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "cuasomzpfrpnbnnumkma",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YXNvbXpwZnJwbmJubnVta21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2OTg1MDMsImV4cCI6MjEwMjI3NDUwM30.ta-YIbR7ZHRxl-j7nPnhZ5qnMAPrKUCIH4kGKGWz2aU",
	"VITE_SUPABASE_URL": "https://cuasomzpfrpnbnnumkma.supabase.co"
}["VITE_SITE_URL"] || "https://minderpay.com").replace(/\/$/, "");
var SITE_TAGLINE = "Dinheiro, negócios e tecnologia, sem ruído.";
/** Constrói um URL absoluto a partir de um caminho relativo. */
function absoluteUrl(path) {
	if (!path) return SITE_URL;
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function postPath(slug) {
	return `/blog/${slug}`;
}
var DATE_FORMATTER = new Intl.DateTimeFormat("pt-PT", {
	day: "2-digit",
	month: "long",
	year: "numeric"
});
function formatDate(value) {
	if (!value) return "";
	return DATE_FORMATTER.format(new Date(value));
}
function formatDateShort(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat("pt-PT", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}).format(new Date(value));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BK-OawKa.js
var router_BK_OawKa_exports = /* @__PURE__ */ __exportAll({
	_: () => useSite,
	a: () => Route$4,
	c: () => Route$7,
	d: () => Route$11,
	f: () => Route$13,
	g: () => Route$25,
	getRouter: () => getRouter,
	h: () => Route$24,
	i: () => Route$3,
	l: () => Route$8,
	m: () => Route$22,
	n: () => Route$1,
	o: () => Route$5,
	p: () => Route$14,
	r: () => Route$2,
	s: () => Route$6,
	t: () => router_exports,
	u: () => Route$9
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BM2yhc_v.css";
var fallback = {
	settings: null,
	categories: [],
	adSlots: []
};
var SiteContext = (0, import_react.createContext)(fallback);
function SiteContextProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteContext.Provider, {
		value: value ?? fallback,
		children
	});
}
function useSite() {
	return (0, import_react.useContext)(SiteContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Erro 404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-5xl font-semibold text-foreground md:text-6xl",
				children: "Página não encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-muted-foreground",
				children: "O endereço que procura não existe ou foi movido. Pode voltar ao início ou explorar os artigos mais recentes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90",
					children: "Voltar ao início"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
					children: "Ver todos os artigos"
				})]
			})
		]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("Root boundary error:", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight text-foreground",
					children: "Esta página não carregou"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Ocorreu um problema do nosso lado. Tente novamente ou volte ao início."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Tentar novamente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Ir para o início"
					})]
				})
			]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	loader: async () => {
		try {
			return await getSiteContext();
		} catch {
			return {
				settings: null,
				categories: [],
				adSlots: []
			};
		}
	},
	head: ({ loaderData }) => {
		const settings = loaderData?.settings ?? null;
		const siteName = settings?.site_name || "MinderPay";
		const description = settings?.default_seo_description || "Artigos práticos sobre dinheiro, negócios, marketing, tecnologia, finanças e empreendedorismo.";
		const gsc = settings?.gsc_verification;
		const ga = settings?.ga_measurement_id;
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: `${siteName} — ${SITE_TAGLINE}` },
				{
					name: "description",
					content: description
				},
				{
					name: "theme-color",
					content: "#0f1b24"
				},
				{
					property: "og:site_name",
					content: siteName
				},
				{
					property: "og:locale",
					content: "pt_PT"
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				...gsc ? [{
					name: "google-site-verification",
					content: gsc
				}] : []
			],
			links: [
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap"
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					href: settings?.favicon_url || "/favicon.svg"
				},
				{
					rel: "alternate icon",
					type: "image/x-icon",
					href: "/favicon.ico"
				},
				{
					rel: "apple-touch-icon",
					href: "/favicon.svg"
				}
			],
			scripts: [...ga ? [{
				src: `https://www.googletagmanager.com/gtag/js?id=${ga}`,
				async: true
			}, { children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');` }] : [], {
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
						"query-input": "required name=search_term_string"
					}
				})
			}]
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	const data = Route$26.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteContextProvider, {
			value: data,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})]
		})
	});
}
var $$splitComponentImporter$23 = () => import("./routes-BolAGb1i.mjs");
var Route$25 = createFileRoute("/")({
	loader: async () => {
		try {
			return await getHomeData();
		} catch (e) {
			console.error("Error loading home data:", e);
			return {
				recent: [],
				popular: [],
				featured: []
			};
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin-DckDVIRx.mjs");
var Route$24 = createFileRoute("/admin")({
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/admin/login") return;
		if (typeof window === "undefined") return;
		const { data } = await supabase.auth.getSession();
		if (!data.session) throw redirect({ to: "/admin/login" });
		const { data: userRole } = await supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).eq("role", "admin").maybeSingle();
		if (!userRole) {
			console.warn("User authenticated but lacks admin role. Logging out.");
			await supabase.auth.signOut();
			toast.error("Acesso negado: Apenas administradores podem aceder a esta área.");
			throw redirect({ to: "/admin/login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./contacto-Do0pGoi5.mjs");
var Route$23 = createFileRoute("/contacto")({
	head: () => ({
		meta: [
			{ title: "Contacto — MinderPay | Minder Ads" },
			{
				name: "description",
				content: "Entre em contacto com Minder Ads pelo WhatsApp, Instagram, YouTube ou pelo formulário. Resposta rápida garantida."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/contacto")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./pesquisa-7Oh8WjTD.mjs");
var searchParamsSchema = objectType({
	q: stringType().catch("").optional(),
	page: numberType().int().min(1).catch(1).optional()
});
var Route$22 = createFileRoute("/pesquisa")({
	validateSearch: (search) => searchParamsSchema.parse(search),
	loaderDeps: ({ search }) => ({
		q: search.q,
		page: search.page
	}),
	loader: async ({ deps }) => {
		const queryTerm = deps.q || "";
		const pageNum = deps.page || 1;
		const perPage = 9;
		if (!queryTerm) return {
			items: [],
			total: 0,
			page: pageNum,
			perPage
		};
		try {
			return {
				posts: await listPosts({
					q: queryTerm,
					page: pageNum,
					perPage
				}),
				page: pageNum,
				perPage
			};
		} catch (e) {
			console.error("Failed to fetch search results:", e);
			return {
				posts: {
					items: [],
					total: 0
				},
				page: pageNum,
				perPage
			};
		}
	},
	head: ({ loaderData, search }) => {
		const query = search.q || "";
		const siteTitle = `Pesquisa: "${query}" — MinderPay`;
		return {
			meta: [
				{ title: siteTitle },
				{
					name: "robots",
					content: "noindex, nofollow"
				},
				{
					property: "og:title",
					content: siteTitle
				},
				{
					property: "og:type",
					content: "website"
				}
			],
			links: [{
				rel: "canonical",
				href: absoluteUrl(`/pesquisa?q=${encodeURIComponent(query)}`)
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./politica-de-cookies-BUTsfwrV.mjs");
var Route$21 = createFileRoute("/politica-de-cookies")({
	head: () => ({
		meta: [
			{ title: "Política de Cookies — MinderPay" },
			{
				name: "description",
				content: "Saiba como o MinderPay utiliza cookies essenciais, de análise (Google Analytics) e de publicidade (Google AdSense) e como as pode gerir."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/politica-de-cookies")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./politica-de-privacidade-CCFuwrcI.mjs");
var Route$20 = createFileRoute("/politica-de-privacidade")({
	head: () => ({
		meta: [
			{ title: "Política de Privacidade — MinderPay" },
			{
				name: "description",
				content: "Conheça a política de privacidade e proteção de dados pessoais do MinderPay."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/politica-de-privacidade")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var Route$19 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async () => {
	const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /pesquisa
Disallow: /pesquisa*
Disallow: /api/
Disallow: /api/*

Sitemap: ${SITE_URL}/sitemap.xml
`;
	return new Response(content, {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=86400"
		}
	});
} } } });
var Route$18 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	try {
		const { posts, categories, authors } = await fetchSitemapEntries();
		const urls = [
			{
				loc: `${SITE_URL}/`,
				priority: "1.0",
				changefreq: "daily"
			},
			{
				loc: `${SITE_URL}/blog`,
				priority: "0.8",
				changefreq: "daily"
			},
			{
				loc: `${SITE_URL}/sobre`,
				priority: "0.5",
				changefreq: "monthly"
			},
			{
				loc: `${SITE_URL}/contacto`,
				priority: "0.5",
				changefreq: "monthly"
			},
			{
				loc: `${SITE_URL}/politica-de-privacidade`,
				priority: "0.3",
				changefreq: "monthly"
			},
			{
				loc: `${SITE_URL}/politica-de-cookies`,
				priority: "0.3",
				changefreq: "monthly"
			},
			{
				loc: `${SITE_URL}/termos-de-uso`,
				priority: "0.3",
				changefreq: "monthly"
			}
		];
		categories.forEach((cat) => {
			urls.push({
				loc: `${SITE_URL}/categoria/${cat.slug}`,
				priority: "0.6",
				changefreq: "weekly"
			});
		});
		authors.forEach((aut) => {
			urls.push({
				loc: `${SITE_URL}/autor/${aut.slug}`,
				priority: "0.4",
				changefreq: "weekly"
			});
		});
		posts.forEach((post) => {
			const lastModDate = post.updated_at || post.published_at || (/* @__PURE__ */ new Date()).toISOString();
			urls.push({
				loc: `${SITE_URL}/blog/${post.slug}`,
				priority: "0.8",
				changefreq: "weekly",
				...lastModDate && { lastmod: new Date(lastModDate).toISOString().split("T")[0] }
			});
		});
		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>`;
		return new Response(xml, {
			status: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600, s-maxage=18000"
			}
		});
	} catch (err) {
		console.error("Failed to generate sitemap:", err);
		return new Response("Internal Server Error", { status: 500 });
	}
} } } });
var $$splitComponentImporter$17 = () => import("./sobre-B-fKBcyr.mjs");
var Route$17 = createFileRoute("/sobre")({
	head: () => ({
		meta: [
			{ title: "Sobre — Minder Ads | MinderPay" },
			{
				name: "description",
				content: "Conheça Minder Ads — expert em vendas de infoprodutos, produtos físicos, marketing digital, desenvolvimento e design."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/sobre")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./termos-de-uso-m3k-2sgJ.mjs");
var Route$16 = createFileRoute("/termos-de-uso")({
	head: () => ({
		meta: [
			{ title: "Termos de Uso — MinderPay" },
			{
				name: "description",
				content: "Leia as regras e diretrizes de utilização do portal MinderPay."
			},
			{
				name: "robots",
				content: "index, follow"
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/termos-de-uso")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin-DICXuC2o.mjs");
var Route$15 = createFileRoute("/admin/")({
	beforeLoad: () => {
		throw redirect({ to: "/admin/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./categories-BECYTaPe.mjs");
var Route$14 = createFileRoute("/admin/categories")({
	loader: async () => {
		const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
		if (error) {
			console.error(error);
			return [];
		}
		return data || [];
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./dashboard-Y16GYb0K.mjs");
var Route$13 = createFileRoute("/admin/dashboard")({
	loader: async () => {
		const [postsRes, categoriesRes, tagsRes, recentPostsRes, recentEditedRes, topPostsRes, analyticsRes] = await Promise.all([
			supabase.from("posts").select("id,status,view_count"),
			supabase.from("categories").select("id", { count: "exact" }),
			supabase.from("tags").select("id", { count: "exact" }),
			supabase.from("posts").select("id,title,slug,status,published_at,view_count").order("published_at", { ascending: false }).limit(5),
			supabase.from("posts").select("id,title,slug,status,updated_at,view_count").order("updated_at", { ascending: false }).limit(5),
			supabase.from("posts").select("id,title,slug,view_count").order("view_count", { ascending: false }).limit(5),
			supabase.from("analytics_events").select("id,created_at,country,country_code,city,page_path,device_type,session_id").gte("created_at", (/* @__PURE__ */ new Date(Date.now() - 6048e5)).toISOString()).order("created_at", { ascending: false }).limit(500)
		]);
		const posts = postsRes.data || [];
		const totalPosts = posts.length;
		const publishedCount = posts.filter((p) => p.status === "published").length;
		const draftCount = posts.filter((p) => p.status === "draft").length;
		const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
		const totalViews = posts.reduce((sum, p) => sum + (p.view_count || 0), 0);
		const analyticsData = analyticsRes.data || [];
		const last7Days = {};
		for (let i = 6; i >= 0; i--) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - i);
			const key = d.toLocaleDateString("pt-PT", {
				weekday: "short",
				day: "numeric"
			});
			last7Days[key] = {
				views: 0,
				visitors: /* @__PURE__ */ new Set()
			};
		}
		analyticsData.forEach((ev) => {
			const key = new Date(ev.created_at).toLocaleDateString("pt-PT", {
				weekday: "short",
				day: "numeric"
			});
			if (last7Days[key]) {
				last7Days[key].views++;
				if (ev.session_id) last7Days[key].visitors.add(ev.session_id);
			}
		});
		const viewsChart = Object.entries(last7Days).map(([date, v]) => ({
			date,
			views: v.views,
			visitors: v.visitors.size
		}));
		const countryMap = {};
		analyticsData.forEach((ev) => {
			if (ev.country) {
				if (!countryMap[ev.country]) countryMap[ev.country] = {
					name: ev.country,
					code: ev.country_code || "?",
					count: 0
				};
				countryMap[ev.country].count++;
			}
		});
		const topCountries = Object.values(countryMap).sort((a, b) => b.count - a.count).slice(0, 6);
		const recentViews = analyticsData.slice(0, 20);
		return {
			stats: {
				totalPosts,
				publishedCount,
				draftCount,
				scheduledCount,
				totalViews,
				categoriesCount: categoriesRes.count || 0,
				tagsCount: tagsRes.count || 0,
				totalAnalyticsViews: analyticsData.length,
				uniqueVisitors: new Set(analyticsData.map((e) => e.session_id).filter(Boolean)).size
			},
			recentPosts: recentPostsRes.data || [],
			recentEdited: recentEditedRes.data || [],
			topPosts: topPostsRes.data || [],
			viewsChart,
			topCountries,
			recentViews,
			hasAnalytics: !analyticsRes.error
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./login-k_sK7InU.mjs");
var Route$12 = createFileRoute("/admin/login")({
	beforeLoad: async () => {
		if (typeof window === "undefined") return;
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/admin/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./media-Ciqrty1e.mjs");
var Route$11 = createFileRoute("/admin/media")({
	loader: async () => {
		const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
		if (error) {
			console.error(error);
			return [];
		}
		return data || [];
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./posts-m3izgXWf.mjs");
var Route$10 = createFileRoute("/admin/posts")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./settings-D0wIpgHO.mjs");
var Route$9 = createFileRoute("/admin/settings")({
	loader: async () => {
		const [settingsRes, adSlotsRes, authorRes, messagesRes] = await Promise.all([
			supabase.from("site_settings").select("*").limit(1).maybeSingle(),
			supabase.from("ad_slots").select("*").order("key"),
			supabase.from("authors").select("*").limit(1).maybeSingle(),
			supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(20)
		]);
		return {
			settings: settingsRes.data || null,
			adSlots: adSlotsRes.data || [],
			author: authorRes.data || null,
			messages: messagesRes.data || []
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./setup-CWarfBOU.mjs");
var runSetup = createServerFn({ method: "POST" }).handler(createSsrRpc("e1d0013d67168edbf8f36441d0678aee9959ea1a17653a02e81d2b55cb354656"));
var Route$8 = createFileRoute("/admin/setup")({
	loader: async () => {
		return runSetup();
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./tags-DDQTlVKa.mjs");
var Route$7 = createFileRoute("/admin/tags")({
	loader: async () => {
		const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true });
		if (error) {
			console.error(error);
			return [];
		}
		return data || [];
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./autor._slug-CJ_8V5Yn.mjs");
var authorSearchSchema = objectType({ page: numberType().int().min(1).catch(1).optional() });
var Route$6 = createFileRoute("/autor/$slug")({
	validateSearch: (search) => authorSearchSchema.parse(search),
	loaderDeps: ({ search }) => ({ page: search.page }),
	loader: async ({ params, deps }) => {
		try {
			const author = await getAuthorBySlug({ slug: params.slug });
			if (!author) throw notFound();
			const page = deps.page ?? 1;
			const perPage = 9;
			return {
				author,
				posts: await listPosts({
					page,
					perPage,
					authorSlug: params.slug
				}),
				page,
				perPage
			};
		} catch (e) {
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
				{
					name: "description",
					content: author.bio || ""
				},
				{
					name: "robots",
					content: "index, follow"
				},
				{
					property: "og:title",
					content: siteTitle
				},
				{
					property: "og:description",
					content: author.bio || ""
				},
				{
					property: "og:type",
					content: "profile"
				}
			],
			links: [{
				rel: "canonical",
				href: absoluteUrl(`/autor/${author.slug}`)
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./blog-GSXISNd1.mjs");
var blogSearchSchema = objectType({
	page: numberType().int().min(1).catch(1).optional(),
	categoria: stringType().optional()
});
var Route$5 = createFileRoute("/blog/")({
	validateSearch: (search) => blogSearchSchema.parse(search),
	loaderDeps: ({ search }) => ({
		page: search.page,
		categoria: search.categoria
	}),
	loader: async ({ deps }) => {
		try {
			return await listPosts({
				page: deps.page ?? 1,
				perPage: 9,
				categorySlug: deps.categoria
			});
		} catch (e) {
			console.error(e);
			return {
				items: [],
				total: 0,
				page: deps.page ?? 1,
				perPage: 9
			};
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./blog._slug-BogsmYC6.mjs");
var Route$4 = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		try {
			const res = await getPost({ slug: params.slug });
			if (res?.redirect) throw redirect({
				href: res.redirect.new_path,
				statusCode: res.redirect.status_code || 301
			});
			if (!res?.post) throw notFound();
			return res;
		} catch (e) {
			if (e?.status === 301 || e?.status === 302 || e?.isRouteRedirect || e?.isNotFound) throw e;
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
				{
					name: "description",
					content: post.seo_description || post.excerpt || ""
				},
				{
					name: "keywords",
					content: post.primary_keyword || ""
				},
				{
					property: "og:title",
					content: post.og_title || post.title
				},
				{
					property: "og:description",
					content: post.og_description || post.excerpt || ""
				},
				{
					property: "og:image",
					content: post.og_image || post.featured_image || ""
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: canonical
				},
				{
					name: "twitter:title",
					content: post.og_title || post.title
				},
				{
					name: "twitter:description",
					content: post.og_description || post.excerpt || ""
				},
				{
					name: "twitter:image",
					content: post.og_image || post.featured_image || ""
				},
				{
					name: "robots",
					content: `${post.robots_index ? "index" : "noindex"}, ${post.robots_follow ? "follow" : "nofollow"}`
				}
			],
			links: [{
				rel: "canonical",
				href: canonical
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: post.title,
					description: post.excerpt || post.subtitle || "",
					image: post.featured_image ? [post.featured_image] : [],
					datePublished: post.published_at,
					dateModified: post.updated_at || post.published_at,
					author: post.author ? {
						"@type": "Person",
						name: post.author.name,
						url: absoluteUrl(`/autor/${post.author.slug}`)
					} : void 0,
					publisher: {
						"@type": "Organization",
						name: "MinderPay",
						logo: {
							"@type": "ImageObject",
							url: absoluteUrl("/favicon.ico")
						}
					},
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": canonical
					}
				})
			}, {
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Início",
							item: absoluteUrl("/")
						},
						{
							"@type": "ListItem",
							position: 2,
							name: post.category?.name || "Blog",
							item: post.category ? absoluteUrl(`/categoria/${post.category.slug}`) : absoluteUrl("/blog")
						},
						{
							"@type": "ListItem",
							position: 3,
							name: post.title,
							item: canonical
						}
					]
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./categoria._slug-DA85m1GF.mjs");
var categorySearchSchema = objectType({ page: numberType().int().min(1).catch(1).optional() });
var Route$3 = createFileRoute("/categoria/$slug")({
	validateSearch: (search) => categorySearchSchema.parse(search),
	loaderDeps: ({ search }) => ({ page: search.page }),
	loader: async ({ params, deps }) => {
		try {
			const category = await getCategoryBySlug({ slug: params.slug });
			if (!category) throw notFound();
			const page = deps.page ?? 1;
			const perPage = 9;
			return {
				category,
				posts: await listPosts({
					page,
					perPage,
					categorySlug: params.slug
				}),
				page,
				perPage
			};
		} catch (e) {
			if (e.isRouteRedirect) throw e;
			console.error(e);
			throw notFound();
		}
	},
	head: ({ loaderData }) => {
		if (!loaderData?.category) return {};
		const category = loaderData.category;
		const siteTitle = `${category.seo_title || category.name} — MinderPay`;
		return {
			meta: [
				{ title: siteTitle },
				{
					name: "description",
					content: category.seo_description || category.description || ""
				},
				{
					name: "robots",
					content: `${category.robots_index ? "index" : "noindex"}, follow`
				},
				{
					property: "og:title",
					content: siteTitle
				},
				{
					property: "og:description",
					content: category.seo_description || category.description || ""
				},
				{
					property: "og:type",
					content: "website"
				}
			],
			links: [{
				rel: "canonical",
				href: absoluteUrl(`/categoria/${category.slug}`)
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./posts.index-DDF9YHcR.mjs");
var postsSearchSchema = objectType({
	page: numberType().int().min(1).catch(1).optional(),
	q: stringType().catch("").optional(),
	category: stringType().catch("").optional(),
	status: stringType().catch("").optional(),
	sort: enumType([
		"newest",
		"oldest",
		"views"
	]).catch("newest").optional()
});
var Route$2 = createFileRoute("/admin/posts/")({
	validateSearch: (search) => postsSearchSchema.parse(search),
	loaderDeps: ({ search }) => ({
		page: search.page,
		q: search.q,
		category: search.category,
		status: search.status,
		sort: search.sort
	}),
	loader: async ({ deps }) => {
		const pageNum = deps.page || 1;
		const perPage = 10;
		const from = (pageNum - 1) * perPage;
		const to = from + perPage - 1;
		const categoriesRes = await supabase.from("categories").select("id,name").order("name");
		let query = supabase.from("posts").select("id,title,slug,status,published_at,updated_at,view_count,category:categories(id,name),author:authors(id,name)", { count: "exact" });
		if (deps.q) query = query.ilike("title", `%${deps.q}%`);
		if (deps.category) query = query.eq("category_id", deps.category);
		if (deps.status) query = query.eq("status", deps.status);
		if (deps.sort === "oldest") query = query.order("created_at", { ascending: true });
		else if (deps.sort === "views") query = query.order("view_count", { ascending: false });
		else query = query.order("created_at", { ascending: false });
		const postsRes = await query.range(from, to);
		return {
			posts: postsRes.data || [],
			total: postsRes.count || 0,
			categories: categoriesRes.data || [],
			page: pageNum,
			perPage
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./posts._id-Bt_SR53T.mjs");
var Route$1 = createFileRoute("/admin/posts/$id")({
	loader: async ({ params }) => {
		const { data, error } = await supabase.from("posts").select("*, post_tags(tag_id)").eq("id", params.id).maybeSingle();
		if (error || !data) throw notFound();
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./posts.new-CWp9j4gN.mjs");
var Route = createFileRoute("/admin/posts/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AdminRoute = Route$24.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$26
});
var ContactoRoute = Route$23.update({
	id: "/contacto",
	path: "/contacto",
	getParentRoute: () => Route$26
});
var PesquisaRoute = Route$22.update({
	id: "/pesquisa",
	path: "/pesquisa",
	getParentRoute: () => Route$26
});
var PoliticaDeCookiesRoute = Route$21.update({
	id: "/politica-de-cookies",
	path: "/politica-de-cookies",
	getParentRoute: () => Route$26
});
var PoliticaDePrivacidadeRoute = Route$20.update({
	id: "/politica-de-privacidade",
	path: "/politica-de-privacidade",
	getParentRoute: () => Route$26
});
var RobotsDottxtRoute = Route$19.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$26
});
var SitemapDotxmlRoute = Route$18.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$26
});
var SobreRoute = Route$17.update({
	id: "/sobre",
	path: "/sobre",
	getParentRoute: () => Route$26
});
var TermosDeUsoRoute = Route$16.update({
	id: "/termos-de-uso",
	path: "/termos-de-uso",
	getParentRoute: () => Route$26
});
var AdminIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCategoriesRoute = Route$14.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$13.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminMediaRoute = Route$11.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => AdminRoute
});
var AdminPostsRoute = Route$10.update({
	id: "/posts",
	path: "/posts",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminSetupRoute = Route$8.update({
	id: "/setup",
	path: "/setup",
	getParentRoute: () => AdminRoute
});
var AdminTagsRoute = Route$7.update({
	id: "/tags",
	path: "/tags",
	getParentRoute: () => AdminRoute
});
var AutorSlugRoute = Route$6.update({
	id: "/autor/$slug",
	path: "/autor/$slug",
	getParentRoute: () => Route$26
});
var BlogIndexRoute = Route$5.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$26
});
var BlogSlugRoute = Route$4.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$26
});
var CategoriaSlugRoute = Route$3.update({
	id: "/categoria/$slug",
	path: "/categoria/$slug",
	getParentRoute: () => Route$26
});
var AdminPostsIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminPostsRoute
});
var AdminPostsRouteChildren = {
	AdminPostsIdRoute: Route$1.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => AdminPostsRoute
	}),
	AdminPostsNewRoute: Route.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => AdminPostsRoute
	}),
	AdminPostsIndexRoute
};
var AdminRouteChildren = {
	AdminCategoriesRoute,
	AdminDashboardRoute,
	AdminLoginRoute,
	AdminMediaRoute,
	AdminPostsRoute: AdminPostsRoute._addFileChildren(AdminPostsRouteChildren),
	AdminSettingsRoute,
	AdminSetupRoute,
	AdminTagsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	ContactoRoute,
	PesquisaRoute,
	PoliticaDeCookiesRoute,
	PoliticaDePrivacidadeRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	SobreRoute,
	TermosDeUsoRoute,
	AutorSlugRoute,
	BlogSlugRoute,
	CategoriaSlugRoute,
	BlogIndexRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { subscribeToNewsletter as C, registerView as S, useSite as _, Route$2 as a, formatDateShort as b, Route$25 as c, Route$5 as d, Route$6 as f, router_BK_OawKa_exports as g, Route$9 as h, Route$14 as i, Route$3 as l, Route$8 as m, Route$11 as n, Route$22 as o, Route$7 as p, Route$13 as r, Route$24 as s, Route$1 as t, Route$4 as u, absoluteUrl as v, postPath as x, formatDate as y };
