import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useSite, d as Route$5 } from "./router-BK-OawKa.mjs";
import { dt as ChevronRight, ft as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-r46NB6Pb.mjs";
import { t as ArticleCard } from "./ArticleCard-DjYHDrOQ.mjs";
import { t as AdSlot } from "./AdSlot-BEzq66jy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-GSXISNd1.js
var import_jsx_runtime = require_jsx_runtime();
function BlogIndex() {
	const { items, total, page, perPage } = Route$5.useLoaderData();
	const search = Route$5.useSearch();
	const { categories } = useSite();
	const totalPages = Math.ceil(total / perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl",
					children: "Todos os Artigos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Explore publicações organizadas por temas práticos e relevantes."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					search: {
						page: 1,
						categoria: void 0
					},
					className: `rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${!search.categoria ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground hover:bg-muted"}`,
					children: "Todos"
				}), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					search: {
						page: 1,
						categoria: category.slug
					},
					className: `rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${search.categoria === category.slug ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground hover:bg-muted"}`,
					children: category.name
				}, category.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "header" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: items.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed border-border py-16 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Nenhum artigo encontrado nesta seleção."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "article_bottom" }),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Paginação",
				className: "mt-12 flex justify-center items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog",
						search: {
							page: Math.max(1, page - 1),
							categoria: search.categoria
						},
						disabled: page <= 1,
						className: `inline-flex size-9 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${page <= 1 ? "opacity-40 pointer-events-none" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Página anterior"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })]
					}),
					Array.from({ length: totalPages }).map((_, i) => {
						const pageNum = i + 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							search: {
								page: pageNum,
								categoria: search.categoria
							},
							className: `inline-flex size-9 items-center justify-center rounded border font-semibold text-xs transition-all ${page === pageNum ? "bg-primary border-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`,
							children: pageNum
						}, pageNum);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog",
						search: {
							page: Math.min(totalPages, page + 1),
							categoria: search.categoria
						},
						disabled: page >= totalPages,
						className: `inline-flex size-9 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${page >= totalPages ? "opacity-40 pointer-events-none" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Próxima página"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})
				]
			})
		]
	}) });
}
//#endregion
export { BlogIndex as component };
