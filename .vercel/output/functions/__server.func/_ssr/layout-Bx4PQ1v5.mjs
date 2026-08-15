import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as useSite } from "./router-DaAGHLTK.mjs";
import { C as Search, F as Menu, P as MessageCircle, dt as ChevronRight, n as X, q as Instagram, t as Youtube, vt as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-Bx4PQ1v5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* usePageAnalytics – tracks page views to Supabase analytics_events table.
*
* Features:
* - Generates a persistent session_id per browser session (sessionStorage)
* - Detects device type (mobile/tablet/desktop)
* - Fetches approximate geolocation via ip-api.com (free, no key needed)
* - Sends a page_view event on every route change
* - Gracefully fails silently if the table doesn't exist yet
*/
function getDeviceType() {
	const ua = navigator.userAgent.toLowerCase();
	if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return "mobile";
	if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) return "tablet";
	return "desktop";
}
function getSessionId() {
	const key = "mp_session";
	let id = sessionStorage.getItem(key);
	if (!id) {
		id = Math.random().toString(36).slice(2) + Date.now().toString(36);
		sessionStorage.setItem(key, id);
	}
	return id;
}
var geoCache = null;
var geoPending = null;
async function getGeoData() {
	if (geoCache) return geoCache;
	if (geoPending) return geoPending;
	geoPending = fetch("https://ip-api.com/json/?fields=country,countryCode,city,regionName,lat,lon&lang=pt").then((r) => r.json()).then((data) => {
		if (data?.country) geoCache = {
			country: data.country,
			country_code: data.countryCode,
			city: data.city,
			region: data.regionName,
			latitude: data.lat,
			longitude: data.lon
		};
		return geoCache;
	}).catch(() => null);
	return geoPending;
}
function usePageAnalytics(pagePath) {
	(0, import_react.useEffect)(() => {
		const path = pagePath || (typeof window !== "undefined" ? window.location.pathname : "/");
		if (path.startsWith("/admin")) return;
		const trackView = async () => {
			try {
				const geo = await getGeoData();
				const sessionId = getSessionId();
				const deviceType = getDeviceType();
				const referrer = document.referrer || null;
				await supabase.from("analytics_events").insert({
					event_type: "page_view",
					page_path: path,
					session_id: sessionId,
					device_type: deviceType,
					referrer,
					user_agent: navigator.userAgent.slice(0, 200),
					...geo || {}
				});
			} catch {}
		};
		const timer = setTimeout(trackView, 1500);
		return () => clearTimeout(timer);
	}, [pagePath]);
}
var WHATSAPP_URL = "https://wa.me/258864339593";
var INSTAGRAM_URL = "https://www.instagram.com/minderads/";
var YOUTUBE_URL = "https://www.youtube.com/@MinderAds";
function Logo({ compact = false }) {
	const { settings } = useSite();
	const name = settings?.site_name || "MinderPay";
	if (settings?.logo_url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: settings.logo_url,
		alt: name,
		width: 140,
		height: 32,
		className: "h-8 w-auto",
		decoding: "async"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-baseline gap-0 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground",
				children: "Minder"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gradient-to-r from-primary to-primary/70 bg-clip-text px-1 text-transparent font-extrabold",
				children: "Pay"
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Dinheiro, negócios e tecnologia, sem ruído."
			})
		]
	});
}
function SearchBar({ autoFocus = false, defaultValue = "", onSubmitted }) {
	const navigate = useNavigate();
	const [value, setValue] = (0, import_react.useState)(defaultValue);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		role: "search",
		className: "relative w-full",
		onSubmit: (event) => {
			event.preventDefault();
			const term = value.trim();
			if (!term) return;
			onSubmitted?.();
			navigate({
				to: "/pesquisa",
				search: {
					q: term,
					page: 1
				}
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "site-search",
				className: "sr-only",
				children: "Pesquisar artigos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "site-search",
				ref,
				type: "search",
				name: "q",
				value,
				onChange: (event) => setValue(event.target.value),
				placeholder: "Pesquisar artigos…",
				className: "h-10 w-full rounded-full border border-border bg-card/80 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
			})
		]
	});
}
function Header() {
	const { categories } = useSite();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-gray-950 text-gray-300 text-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex h-8 items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:block opacity-60 tracking-wide",
						children: "Expert em vendas de infoprodutos & marketing digital"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: WHATSAPP_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "WhatsApp",
								className: "flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "+258 864 339 593"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-20",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: INSTAGRAM_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Instagram",
								className: "hover:text-pink-400 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: YOUTUBE_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "YouTube",
								className: "hover:text-red-400 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "size-3.5" })
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex h-16 items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							"aria-label": "MinderPay — página inicial",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Navegação principal",
							className: "hidden flex-1 lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "flex items-center justify-center gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog",
									search: {
										page: 1,
										categoria: void 0
									},
									className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground",
									activeProps: { className: "text-primary bg-primary/5" },
									children: "Artigos"
								}) }), categories.slice(0, 6).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/categoria/$slug",
									params: { slug: category.slug },
									search: { page: 1 },
									className: "rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground",
									activeProps: { className: "text-primary bg-primary/5" },
									children: category.name
								}) }, category.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto hidden w-60 lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": searchOpen ? "Fechar pesquisa" : "Abrir pesquisa",
								"aria-expanded": searchOpen,
								onClick: () => {
									setSearchOpen((open) => !open);
									setMenuOpen(false);
								},
								className: "inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted",
								children: searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": menuOpen ? "Fechar menu" : "Abrir menu",
								"aria-expanded": menuOpen,
								onClick: () => {
									setMenuOpen((open) => !open);
									setSearchOpen(false);
								},
								className: "inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted",
								children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" })]
			}),
			searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-card px-4 py-3 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
					autoFocus: true,
					onSubmitted: () => setSearchOpen(false)
				})
			}),
			menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Navegação principal (móvel)",
				className: "border-b border-border bg-card lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "container-page grid gap-1 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/blog",
						search: {
							page: 1,
							categoria: void 0
						},
						onClick: () => setMenuOpen(false),
						className: "flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-primary" }), "Todos os artigos"]
					}) }), categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categoria/$slug",
						params: { slug: category.slug },
						search: { page: 1 },
						onClick: () => setMenuOpen(false),
						className: "flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-primary" }), category.name]
					}) }, category.id))]
				})
			})
		]
	});
}
function Footer() {
	const { categories, settings } = useSite();
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 bg-gray-950 text-gray-400",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 lg:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								"aria-label": "MinderPay — página inicial",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline gap-0 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: "Minder"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text px-1 text-transparent font-extrabold",
										children: "Pay"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-gray-400 max-w-xs",
								children: settings?.site_description || "Conteúdo prático sobre infoprodutos, marketing digital, negócios e tecnologia para empreendedores modernos."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: YOUTUBE_URL,
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "YouTube — Minder Ads",
										className: "flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-red-600 hover:text-white hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: INSTAGRAM_URL,
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "Instagram — Minder Ads",
										className: "flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:text-white hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: WHATSAPP_URL,
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "WhatsApp — Minder Ads",
										className: "flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-green-600 hover:text-white hover:scale-110",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Categorias",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold uppercase tracking-widest text-gray-500",
							children: "Categorias"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2.5 text-sm",
							children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/categoria/$slug",
								params: { slug: category.slug },
								search: { page: 1 },
								className: "flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 shrink-0 text-primary/50" }), category.name]
							}) }, category.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Institucional",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold uppercase tracking-widest text-gray-500",
							children: "MinderPay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2.5 text-sm",
							children: [[
								{
									to: "/sobre",
									label: "Sobre"
								},
								{
									to: "/contacto",
									label: "Contacto"
								},
								{
									to: "/politica-de-privacidade",
									label: "Política de Privacidade"
								},
								{
									to: "/politica-de-cookies",
									label: "Política de Cookies"
								},
								{
									to: "/termos-de-uso",
									label: "Termos de Uso"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 shrink-0 text-primary/50" }), item.label]
							}) }, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog",
								search: {
									page: 1,
									categoria: void 0
								},
								className: "flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 shrink-0 text-primary/50" }), "Todos os artigos"]
							}) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold uppercase tracking-widest text-gray-500",
							children: "Contacto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: WHATSAPP_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-2.5 text-gray-400 transition-colors hover:text-green-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-7 items-center justify-center rounded-full bg-gray-800 text-green-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+258 864 339 593" })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: INSTAGRAM_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-2.5 text-gray-400 transition-colors hover:text-pink-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-7 items-center justify-center rounded-full bg-gray-800 text-pink-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "@minderads" })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: YOUTUBE_URL,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-2.5 text-gray-400 transition-colors hover:text-red-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-7 items-center justify-center rounded-full bg-gray-800 text-red-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "@MinderAds" })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:suporteminderpay@gmail.com",
									className: "flex items-center gap-2.5 text-gray-400 transition-colors hover:text-primary text-xs break-all",
									children: "suporteminderpay@gmail.com"
								}) })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-gray-800",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex flex-col gap-2 py-6 text-xs text-gray-600 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						year,
						" ",
						settings?.site_name || "MinderPay",
						". Todos os direitos reservados."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-gray-700",
						children: [
							"Feito com ♥ por",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: YOUTUBE_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-gray-500 hover:text-primary transition-colors",
								children: "Minder Ads"
							})
						]
					})]
				})
			})
		]
	});
}
function SiteLayout({ children }) {
	usePageAnalytics(typeof window !== "undefined" ? window.location.pathname : "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#conteudo",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground",
				children: "Saltar para o conteúdo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "conteudo",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { SiteLayout as t };
