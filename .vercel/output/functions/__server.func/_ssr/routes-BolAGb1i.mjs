import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CRIS042E.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useSite, b as formatDateShort, c as Route$25 } from "./router-BK-OawKa.mjs";
import { d as TrendingUp, vt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-r46NB6Pb.mjs";
import { n as FeaturedArticle, t as ArticleCard } from "./ArticleCard-DjYHDrOQ.mjs";
import { t as AdSlot } from "./AdSlot-BEzq66jy.mjs";
import { t as Newsletter } from "./Newsletter-DfAOamrd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BolAGb1i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { recent, popular, featured } = Route$25.useLoaderData();
	const { categories } = useSite();
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session?.user) supabase.from("user_roles").select("role").eq("user_id", data.session.user.id).eq("role", "admin").maybeSingle().then(({ data: roleData }) => {
				if (roleData) setIsAdmin(true);
			});
		});
	}, []);
	const primaryFeatured = featured.length > 0 ? featured[0] : null;
	const secondaryFeatured = featured.length > 1 ? featured.slice(1, 4) : [];
	const featuredIds = new Set(featured.map((p) => p.id));
	const filteredRecent = recent.filter((p) => !featuredIds.has(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
				slotKey: "header",
				className: "mx-auto max-w-4xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 border-b border-border pb-12",
				children: primaryFeatured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedArticle, { post: primaryFeatured }), secondaryFeatured.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-border/60",
						children: secondaryFeatured.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
					})]
				}) : recent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedArticle, { post: recent[0] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-dashed border-border py-20 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium text-foreground",
						children: "Nenhum artigo publicado"
					}), isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Inicie sessão no painel para criar e publicar os seus primeiros artigos."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/login",
						className: "mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90",
						children: "Ir para o Painel"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "De momento, não existem artigos publicados no portal. Por favor, volte a visitar-nos mais tarde."
					})]
				})
			}),
			recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "article_top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-10 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "lg:col-span-2 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl",
								children: "Mais Recentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog",
								search: { page: 1 },
								className: "group flex items-center gap-1 text-sm font-semibold text-primary hover:underline",
								children: ["Ver todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
							})]
						}),
						filteredRecent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: filteredRecent.slice(0, 8).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhum artigo recente encontrado."
						}),
						filteredRecent.length > 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog",
								search: { page: 1 },
								className: "inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
								children: "Carregar mais artigos"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-10",
					children: [
						popular.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5 text-primary" }), " Populares"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 divide-y divide-border",
								children: popular.map((post, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group py-4 first:pt-0 last:pb-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-[family-name:var(--font-display)] text-3xl font-700 leading-none text-muted-foreground/30 group-hover:text-primary transition-colors",
											children: String(idx + 1).padStart(2, "0")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [
												post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider text-primary",
													children: post.category.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-semibold text-sm leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/blog/$slug",
														params: { slug: post.slug },
														children: post.title
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-[11px] text-muted-foreground",
													children: formatDateShort(post.published_at)
												})
											]
										})]
									})
								}, post.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "sidebar" }),
						categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-2xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground border-b border-border pb-3",
								children: "Categorias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-2",
								children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/categoria/$slug",
									params: { slug: category.slug },
									search: { page: 1 },
									className: "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: category.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 opacity-50" })]
								}) }, category.id))
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "article_bottom" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, { source: "home" })
			})
		]
	}) });
}
//#endregion
export { Index as component };
