import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$22 } from "./router-DaAGHLTK.mjs";
import { C as Search, dt as ChevronRight, ft as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-Bx4PQ1v5.mjs";
import { t as ArticleCard } from "./ArticleCard-DjYHDrOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pesquisa-i46E5evQ.js
var import_jsx_runtime = require_jsx_runtime();
function SearchView() {
	const { posts, page, perPage } = Route$22.useLoaderData();
	const query = Route$22.useSearch().q || "";
	const total = posts?.total || 0;
	const items = posts?.items || [];
	const totalPages = Math.ceil(total / perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "Resultados de Pesquisa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-8 text-muted-foreground" }), query ? `Resultados para "${query}"` : "Pesquisar no site"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: query ? `Foram encontrados ${total} artigo(s) correspondente(s) à sua pesquisa.` : "Escreva algo na pesquisa acima para encontrar artigos."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: items.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border py-20 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mx-auto size-10 text-muted-foreground/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground font-medium",
							children: "Nenhum artigo correspondente encontrado."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground/75",
							children: "Tente pesquisar por termos diferentes ou palavras-chave mais genéricas."
						})
					]
				})
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Paginação",
				className: "mt-12 flex justify-center items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pesquisa",
						search: {
							q: query,
							page: Math.max(1, page - 1)
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
							to: "/pesquisa",
							search: {
								q: query,
								page: pageNum
							},
							className: `inline-flex size-9 items-center justify-center rounded border font-semibold text-xs transition-all ${page === pageNum ? "bg-primary border-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`,
							children: pageNum
						}, pageNum);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pesquisa",
						search: {
							q: query,
							page: Math.min(totalPages, page + 1)
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
export { SearchView as component };
