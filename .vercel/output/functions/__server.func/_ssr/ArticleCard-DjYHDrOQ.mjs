import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as formatDate } from "./router-DaAGHLTK.mjs";
import { ot as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ArticleCard-DjYHDrOQ.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleCard({ post }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/blog/$slug",
			params: { slug: post.slug },
			className: "block overflow-hidden aspect-video relative bg-muted",
			children: [post.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.featured_image,
				alt: post.featured_image_alt || post.title,
				width: 400,
				height: 225,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted text-primary/40 font-bold uppercase tracking-widest text-lg",
				children: "MinderPay"
			}), post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm",
				children: post.category.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(post.published_at) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
								" ",
								post.reading_time,
								" min"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-[family-name:var(--font-display)] text-lg font-700 tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: post.slug },
						children: post.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3",
					children: post.excerpt || post.subtitle || "Sem descrição disponível."
				}),
				post.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3 border-t border-border pt-4",
					children: [post.author.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.author.avatar_url,
						alt: post.author.name,
						className: "size-7 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary",
						children: post.author.name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/autor/$slug",
						params: { slug: post.author.slug },
						className: "text-xs font-medium text-foreground hover:underline",
						children: post.author.name
					})]
				})
			]
		})]
	});
}
function FeaturedArticle({ post }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group grid gap-6 md:grid-cols-2 lg:gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/blog/$slug",
			params: { slug: post.slug },
			className: "block overflow-hidden rounded-2xl border border-border aspect-video md:aspect-auto md:h-full min-h-[250px] relative bg-muted",
			children: [post.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.featured_image,
				alt: post.featured_image_alt || post.title,
				width: 800,
				height: 450,
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-muted text-primary/40 font-bold uppercase tracking-widest text-2xl",
				children: "MinderPay"
			}), post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-4 top-4 rounded bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm",
				children: post.category.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(post.published_at) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
								" ",
								post.reading_time,
								" min"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-[family-name:var(--font-display)] text-2xl font-700 leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl group-hover:text-primary transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: post.slug },
						children: post.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground",
					children: post.excerpt || post.subtitle || "Sem descrição disponível."
				}),
				post.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3 border-t border-border pt-5",
					children: [post.author.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.author.avatar_url,
						alt: post.author.name,
						className: "size-9 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary",
						children: post.author.name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/autor/$slug",
						params: { slug: post.author.slug },
						className: "block text-sm font-semibold text-foreground hover:underline",
						children: post.author.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Autor"
					})] })]
				})
			]
		})]
	});
}
//#endregion
export { FeaturedArticle as n, ArticleCard as t };
