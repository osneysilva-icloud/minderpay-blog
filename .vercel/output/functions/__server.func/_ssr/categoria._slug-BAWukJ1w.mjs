import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Route$3 } from "./router-DaAGHLTK.mjs";
import { dt as ChevronRight, ft as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-Bx4PQ1v5.mjs";
import { t as ArticleCard } from "./ArticleCard-DjYHDrOQ.mjs";
import { t as AdSlot } from "./AdSlot-BEu-FT5N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-BAWukJ1w.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryView() {
	const { category, posts, page, perPage } = Route$3.useLoaderData();
	const totalPages = Math.ceil(posts.total / perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider text-primary",
						children: "Categoria"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground md:text-4xl",
						children: category.name
					}),
					category.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl",
						children: category.description
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "header" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: posts.items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: posts.items.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed border-border py-16 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Nenhum artigo encontrado nesta categoria."
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "article_bottom" }),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Paginação",
				className: "mt-12 flex justify-center items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categoria/$slug",
						params: { slug: category.slug },
						search: { page: Math.max(1, page - 1) },
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
							to: "/categoria/$slug",
							params: { slug: category.slug },
							search: { page: pageNum },
							className: `inline-flex size-9 items-center justify-center rounded border font-semibold text-xs transition-all ${page === pageNum ? "bg-primary border-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`,
							children: pageNum
						}, pageNum);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categoria/$slug",
						params: { slug: category.slug },
						search: { page: Math.min(totalPages, page + 1) },
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
export { CategoryView as component };
