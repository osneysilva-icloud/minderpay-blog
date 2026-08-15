import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as registerView, u as Route$4, v as absoluteUrl, x as postPath, y as formatDate } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as Linkedin, et as Facebook, mt as Calendar, ot as Clock, u as Twitter, x as Share2 } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./layout-Bx4PQ1v5.mjs";
import { t as AdSlot } from "./AdSlot-BEu-FT5N.mjs";
import { t as Newsletter } from "./Newsletter-DfAOamrd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-D7B3v6rV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PostView() {
	const { post, tags, related } = Route$4.useLoaderData();
	(0, import_react.useEffect)(() => {
		if (post?.slug) registerView({ slug: post.slug }).catch((err) => console.error("Failed to register page view:", err));
	}, [post?.slug]);
	if (!post) return null;
	const pageUrl = typeof window !== "undefined" ? window.location.href : absoluteUrl(postPath(post.slug));
	const handleShare = (platform) => {
		let url = "";
		switch (platform) {
			case "fb":
				url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
				break;
			case "tw":
				url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;
				break;
			case "in":
				url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
				break;
			case "wa":
				url = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + pageUrl)}`;
				break;
			case "copy":
				navigator.clipboard.writeText(pageUrl);
				toast.success("Link copiado para a área de transferência!");
				return;
		}
		if (url) window.open(url, "_blank", "width=600,height=400");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "container-page py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
				slotKey: "article_top",
				className: "max-w-4xl mx-auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Breadcrumb",
				className: "mx-auto max-w-3xl text-sm text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-primary transition-colors",
							children: "Início"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
						post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categoria/$slug",
							params: { slug: post.category.slug },
							search: { page: 1 },
							className: "hover:text-primary transition-colors",
							children: post.category.name
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-foreground font-medium truncate max-w-[200px] sm:max-w-xs",
							"aria-current": "page",
							children: post.title
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto max-w-3xl mt-6 text-center md:text-left",
				children: [
					post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categoria/$slug",
						params: { slug: post.category.slug },
						search: { page: 1 },
						className: "inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20",
						children: post.category.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl",
						children: post.title
					}),
					post.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed",
						children: post.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 border-b border-t border-border/60 py-4 text-xs text-muted-foreground",
						children: [
							post.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [post.author.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: post.author.avatar_url,
									alt: post.author.name,
									className: "size-8 rounded-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary",
									children: post.author.name[0]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/autor/$slug",
									params: { slug: post.author.slug },
									className: "font-semibold text-foreground hover:underline",
									children: post.author.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[10px] text-muted-foreground",
									children: post.author.role_title || "Autor"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-border",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Publicado a ", formatDate(post.published_at)] })]
							}),
							post.updated_at && post.updated_at !== post.published_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-border",
								children: "|"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "italic",
								children: ["Atualizado a ", formatDate(post.updated_at)]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-border",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.reading_time, " min de leitura"] })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-4xl mt-8 overflow-hidden rounded-2xl border border-border bg-muted aspect-video",
				children: post.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.featured_image,
					alt: post.featured_image_alt || post.title,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-muted text-primary/30 font-bold uppercase tracking-widest text-3xl",
					children: "MinderPay"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl mt-10 grid gap-10 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden md:block col-span-1 space-y-4 sticky top-24 self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Partilhar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleShare("fb"),
								className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted",
								"aria-label": "Partilhar no Facebook",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4 text-[#1877F2]" }), " Facebook"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleShare("tw"),
								className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted",
								"aria-label": "Partilhar no X / Twitter",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "size-4 text-foreground" }), " Twitter / X"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleShare("in"),
								className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted",
								"aria-label": "Partilhar no LinkedIn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4 text-[#0A66C2]" }), " LinkedIn"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleShare("wa"),
								className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted",
								"aria-label": "Partilhar no WhatsApp",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4 text-[#25D366]" }), " WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleShare("copy"),
								className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-muted",
								"aria-label": "Copiar link do artigo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4 text-muted-foreground" }), " Copiar Link"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-3 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "prose prose-stone dark:prose-invert max-w-none text-foreground leading-relaxed",
							style: { fontSize: "1.1rem" },
							dangerouslySetInnerHTML: { __html: post.content }
						}),
						tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 pt-6 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground pt-1.5",
								children: "Tags:"
							}), tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-lg bg-muted px-3 py-1 text-xs font-medium text-foreground",
								children: ["#", tag.name]
							}, tag.slug))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:hidden border-t border-border pt-6 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Partilhar este Artigo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("fb"),
										className: "rounded-full border border-border p-2.5 transition-colors hover:bg-muted",
										"aria-label": "Facebook",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "size-4 text-[#1877F2]" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("tw"),
										className: "rounded-full border border-border p-2.5 transition-colors hover:bg-muted",
										"aria-label": "Twitter",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "size-4 text-foreground" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("in"),
										className: "rounded-full border border-border p-2.5 transition-colors hover:bg-muted",
										"aria-label": "LinkedIn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-4 text-[#0A66C2]" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("wa"),
										className: "rounded-full border border-border p-2.5 transition-colors hover:bg-muted",
										"aria-label": "WhatsApp",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4 text-[#25D366]" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleShare("copy"),
										className: "rounded-full border border-border p-2.5 transition-colors hover:bg-muted",
										"aria-label": "Copiar link",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "in_content" }),
						post.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8",
							children: [post.author.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.author.avatar_url,
								alt: post.author.name,
								className: "size-16 rounded-full object-cover shrink-0"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-16 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl shrink-0",
								children: post.author.name[0]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center sm:text-left space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-primary",
										children: "Escrito Por"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-foreground hover:underline text-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/autor/$slug",
											params: { slug: post.author.slug },
											children: post.author.name
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: post.author.bio || "Membro da equipa de redação do MinderPay."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-center sm:justify-start gap-3 pt-2 text-xs text-muted-foreground",
										children: [
											post.author.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: post.author.website_url,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "hover:underline",
												children: "Website"
											}),
											post.author.twitter_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: post.author.twitter_url,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "hover:underline",
												children: "Twitter / X"
											}),
											post.author.linkedin_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: post.author.linkedin_url,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "hover:underline",
												children: "LinkedIn"
											})
										]
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slotKey: "article_bottom" }),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 border-t border-border pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl text-center sm:text-left",
					children: "Leia Também"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog/$slug",
							params: { slug: item.slug },
							className: "block overflow-hidden aspect-video relative bg-muted",
							children: item.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.featured_image,
								alt: item.featured_image_alt || item.title,
								className: "h-full w-full object-cover group-hover:scale-103 transition-transform duration-300"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-muted text-primary/30 font-bold uppercase tracking-widest text-xs",
								children: "MinderPay"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col p-4 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-primary",
								children: item.category?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-2 font-[family-name:var(--font-display)] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog/$slug",
									params: { slug: item.slug },
									children: item.title
								})
							})]
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, { source: `post_${post.slug}` })
			})
		]
	}) });
}
//#endregion
export { PostView as component };
