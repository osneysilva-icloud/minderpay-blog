import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Route$6 } from "./router-BK-OawKa.mjs";
import { H as Linkedin, X as Globe, dt as ChevronRight, ft as ChevronLeft, u as Twitter } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-r46NB6Pb.mjs";
import { t as ArticleCard } from "./ArticleCard-DjYHDrOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autor._slug-CJ_8V5Yn.js
var import_jsx_runtime = require_jsx_runtime();
function AuthorView() {
	const { author, posts, page, perPage } = Route$6.useLoaderData();
	const totalPages = Math.ceil(posts.total / perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6",
				children: [author.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: author.avatar_url,
					alt: author.name,
					className: "size-24 rounded-full object-cover shrink-0 ring-4 ring-muted"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-24 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-3xl shrink-0",
					children: author.name[0]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center md:text-left space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider text-primary",
							children: "Perfil do Autor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-[family-name:var(--font-display)] text-2xl font-700 tracking-tight text-foreground md:text-3xl",
							children: author.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded",
							children: author.role_title || "Redator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl",
							children: author.bio || "Contribuidor do MinderPay, trazendo novidades sobre negócios, finanças e tecnologia."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-center md:justify-start gap-3 pt-3 text-muted-foreground",
							children: [
								author.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: author.website_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-1.5 text-xs hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), " Website"]
								}),
								author.twitter_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: author.twitter_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-1.5 text-xs hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "size-4" }), " Twitter / X"]
								}),
								author.linkedin_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: author.linkedin_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-1.5 text-xs hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4" }), " LinkedIn"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground border-b border-border pb-4",
					children: "Artigos Publicados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: posts.items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: posts.items.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { post }, post.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-border py-12 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nenhum artigo publicado por este autor."
						})
					})
				})]
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Paginação",
				className: "mt-12 flex justify-center items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/autor/$slug",
						params: { slug: author.slug },
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
							to: "/autor/$slug",
							params: { slug: author.slug },
							search: { page: pageNum },
							className: `inline-flex size-9 items-center justify-center rounded border font-semibold text-xs transition-all ${page === pageNum ? "bg-primary border-primary text-primary-foreground" : "border-border text-foreground hover:bg-muted"}`,
							children: pageNum
						}, pageNum);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/autor/$slug",
						params: { slug: author.slug },
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
export { AuthorView as component };
