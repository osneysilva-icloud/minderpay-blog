import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$13 } from "./router-DaAGHLTK.mjs";
import { A as PenLine, I as MapPin, J as Image, Q as FileText, S as Settings, X as Globe, Z as FolderOpen, _ as Tag, bt as Activity, d as TrendingUp, i as Users, lt as CircleCheckBig, mt as Calendar, nt as ExternalLink, r as Wifi, st as CirclePlus, tt as Eye } from "../_libs/lucide-react.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BfBj_YIE.mjs";
import { i as formatDateTime } from "./admin-DjD_SmfS.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DHs3U84S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function countryFlag(code) {
	if (!code || code.length !== 2) return "🌍";
	return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127462 + c.charCodeAt(0) - 65));
}
function useLiveVisitors() {
	const [liveCount, setLiveCount] = (0, import_react.useState)(0);
	const [liveEvents, setLiveEvents] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const refresh = async () => {
			const since = (/* @__PURE__ */ new Date(Date.now() - 3e5)).toISOString();
			const { data } = await supabase.from("analytics_events").select("session_id").gte("created_at", since);
			if (data) setLiveCount(new Set(data.map((r) => r.session_id).filter(Boolean)).size);
		};
		refresh();
		const interval = setInterval(refresh, 15e3);
		const channel = supabase.channel("analytics-live").on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "analytics_events"
		}, (payload) => {
			setLiveEvents((prev) => [payload.new, ...prev].slice(0, 10));
			setLiveCount((c) => c + 1);
		}).subscribe();
		return () => {
			clearInterval(interval);
			supabase.removeChannel(channel);
		};
	}, []);
	return {
		liveCount,
		liveEvents
	};
}
function deviceLabel(type) {
	if (!type) return "Computador";
	if (type === "mobile") return "📱 Móvel";
	if (type === "tablet") return "📱 Tablet";
	return "💻 Computador";
}
function DashboardView() {
	const { stats, recentPosts, recentEdited, topPosts, viewsChart, topCountries, recentViews, hasAnalytics } = Route$13.useLoaderData();
	const { liveCount, liveEvents } = useLiveVisitors();
	const statCards = [
		{
			title: "Total de Artigos",
			value: stats.totalPosts,
			icon: FileText,
			color: "text-blue-600 bg-blue-50 dark:bg-blue-950"
		},
		{
			title: "Publicados",
			value: stats.publishedCount,
			icon: CircleCheckBig,
			color: "text-green-600 bg-green-50 dark:bg-green-950"
		},
		{
			title: "Rascunhos",
			value: stats.draftCount,
			icon: PenLine,
			color: "text-amber-600 bg-amber-50 dark:bg-amber-950"
		},
		{
			title: "Agendados",
			value: stats.scheduledCount,
			icon: Calendar,
			color: "text-purple-600 bg-purple-50 dark:bg-purple-950"
		},
		{
			title: "Visualizações (Posts)",
			value: stats.totalViews.toLocaleString("pt-PT"),
			icon: Eye,
			color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950"
		},
		{
			title: "Visitantes Únicos (7d)",
			value: stats.uniqueVisitors.toLocaleString("pt-PT"),
			icon: Users,
			color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950"
		},
		{
			title: "Categorias",
			value: stats.categoriesCount,
			icon: FolderOpen,
			color: "text-teal-600 bg-teal-50 dark:bg-teal-950"
		},
		{
			title: "Tags",
			value: stats.tagsCount,
			icon: Tag,
			color: "text-pink-600 bg-pink-50 dark:bg-pink-950"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
					children: "Painel de Controlo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "Bem-vindo ao gestor de conteúdos do MinderPay."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 px-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2.5 rounded-full bg-green-500" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-green-700 dark:text-green-400",
							children: liveCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-green-600 dark:text-green-500",
							children: [
								"visitante",
								liveCount !== 1 ? "s" : "",
								" agora"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-card border border-border rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
					children: "Ações Rápidas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/posts/new",
							className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-4" }), " Novo Artigo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/categories",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }), " Categorias"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/tags",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-4" }), " Tags"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/media",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" }), " Biblioteca de Mídia"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/settings",
							className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), " Configurações"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: statCards.map((card) => {
					const Icon = card.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border border-border shadow-sm hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: card.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-lg p-2 ${card.color}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-3xl font-bold tracking-tight text-foreground",
							children: card.value
						}) })]
					}, card.title);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border border-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5 text-primary" }), " Visualizações dos Últimos 7 Dias"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: hasAnalytics && viewsChart.some((d) => d.views > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: viewsChart,
						margin: {
							top: 5,
							right: 10,
							left: -20,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "viewsGrad",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "#10b981",
									stopOpacity: .3
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "#10b981",
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "visitorsGrad",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "#6366f1",
									stopOpacity: .3
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "#6366f1",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "hsl(var(--border))"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tick: {
									fontSize: 11,
									fill: "hsl(var(--muted-foreground))"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fontSize: 11,
									fill: "hsl(var(--muted-foreground))"
								},
								allowDecimals: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "hsl(var(--card))",
								border: "1px solid hsl(var(--border))",
								borderRadius: "8px",
								fontSize: "12px"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "views",
								name: "Visualizações",
								stroke: "#10b981",
								fill: "url(#viewsGrad)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "visitors",
								name: "Visitantes",
								stroke: "#6366f1",
								fill: "url(#visitorsGrad)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center h-[200px] text-sm text-muted-foreground flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Os dados de analítica serão apresentados aqui quando o blog tiver visitas." })]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border border-border shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2.5 mr-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2.5 rounded-full bg-green-500" })]
						}), "Atividade em Tempo Real"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: liveEvents.length > 0 || recentViews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-h-72 overflow-y-auto",
						children: [...liveEvents, ...recentViews].slice(0, 15).map((ev, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-start gap-3 rounded-lg px-3 py-2 text-sm ${i < liveEvents.length ? "bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800" : "hover:bg-muted/40"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 shrink-0 size-2 rounded-full bg-green-500 mt-1.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground truncate",
										children: ev.page_path || "/"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground mt-0.5",
										children: [ev.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											countryFlag(ev.country_code || ""),
											" ",
											ev.city ? `${ev.city}, ` : "",
											ev.country
										] }), ev.device_type && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", deviceLabel(ev.device_type)] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground shrink-0 mt-0.5",
									children: new Date(ev.created_at).toLocaleTimeString("pt-PT", {
										hour: "2-digit",
										minute: "2-digit"
									})
								})
							]
						}, ev.id || i))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center h-40 flex-col gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A aguardar visitas em tempo real…" })]
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border border-border shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-5 text-primary" }), " Visitas por País (7d)"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: topCountries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: topCountries.map((c, i) => {
							const max = topCountries[0]?.count || 1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl shrink-0",
									children: countryFlag(c.code)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-foreground",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold text-muted-foreground",
											children: [c.count, " visitas"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 rounded-full bg-border overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all",
											style: { width: `${Math.round(c.count / max * 100)}%` }
										})
									})]
								})]
							}, c.code);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center h-40 flex-col gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Os dados de localização aparecerão aqui." })]
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border border-border shadow-sm lg:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5 text-primary" }), " Top Artigos"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: topPosts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: topPosts.map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground"}`,
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground truncate",
										children: post.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [(post.view_count || 0).toLocaleString("pt-PT"), " visualizações"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blog/$slug",
									params: { slug: post.slug },
									target: "_blank",
									className: "text-muted-foreground hover:text-primary shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
								})
							]
						}, post.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground text-center py-6",
						children: "Nenhum artigo com visualizações."
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border border-border shadow-sm lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "font-[family-name:var(--font-display)] text-lg font-700",
						children: "Últimos Artigos Publicados"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: recentPosts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5",
										children: "Título"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 text-center",
										children: "Visualizações"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 text-right",
										children: "Publicado"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: recentPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-semibold text-foreground max-w-[240px] truncate",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/admin/posts/$id",
												params: { id: post.id },
												className: "hover:text-primary hover:underline",
												children: post.title
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-center text-muted-foreground",
											children: (post.view_count || 0).toLocaleString("pt-PT")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-right text-muted-foreground text-xs",
											children: formatDateTime(post.published_at)
										})
									]
								}, post.id))
							})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground py-4 text-center",
						children: "Nenhum artigo publicado recentemente."
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border border-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-[family-name:var(--font-display)] text-lg font-700",
					children: "Editados Recentemente"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: recentEdited.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2.5",
									children: "Título"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2.5 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2.5 text-right",
									children: "Modificado em"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: recentEdited.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 font-semibold text-foreground max-w-[300px] truncate",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/posts/$id",
											params: { id: post.id },
											className: "hover:text-primary hover:underline",
											children: post.title
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold border ${post.status === "published" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-400" : post.status === "draft" ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400" : "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-400"}`,
											children: post.status === "published" ? "Publicado" : post.status === "draft" ? "Rascunho" : post.status
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right text-muted-foreground text-xs",
										children: formatDateTime(post.updated_at)
									})
								]
							}, post.id))
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground py-4 text-center",
					children: "Nenhuma edição efetuada."
				}) })]
			})
		]
	});
}
//#endregion
export { DashboardView as component };
