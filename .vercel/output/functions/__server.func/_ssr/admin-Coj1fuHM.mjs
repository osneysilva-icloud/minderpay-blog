import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Outlet, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$24 } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Menu, J as Image, Q as FileText, R as LogOut, S as Settings, W as LayoutDashboard, Z as FolderOpen, _ as Tag, a as User, it as Compass, n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Coj1fuHM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const navigate = useNavigate();
	Route$24.useSearch();
	const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [userEmail, setUserEmail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setUserEmail(data.session?.user?.email || null);
		});
		const keepAliveInterval = setInterval(async () => {
			const { error } = await supabase.auth.refreshSession();
			if (error) console.warn("[Admin] Session refresh failed:", error.message);
		}, 24e4);
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT" || !session && event !== "INITIAL_SESSION" && event !== "TOKEN_REFRESHED") {
				toast.error("Sessão expirada. Por favor, inicie sessão novamente.");
				navigate({ to: "/admin/login" });
			}
		});
		return () => {
			clearInterval(keepAliveInterval);
			subscription.unsubscribe();
		};
	}, []);
	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) toast.error("Erro ao efetuar logout.");
		else {
			toast.success("Sessão terminada com sucesso.");
			navigate({ to: "/admin/login" });
		}
	};
	const navItems = [
		{
			label: "Dashboard",
			href: "/admin/dashboard",
			icon: LayoutDashboard
		},
		{
			label: "Artigos",
			href: "/admin/posts",
			icon: FileText
		},
		{
			label: "Categorias",
			href: "/admin/categories",
			icon: FolderOpen
		},
		{
			label: "Tags",
			href: "/admin/tags",
			icon: Tag
		},
		{
			label: "Mídia",
			href: "/admin/media",
			icon: Image
		},
		{
			label: "Configurações",
			href: "/admin/settings",
			icon: Settings
		}
	];
	if (currentPath === "/admin/login") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/20 flex flex-col md:flex-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "md:hidden flex items-center justify-between bg-card border-b border-border px-4 py-3 sticky top-0 z-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-foreground",
						children: "MinderPay Admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSidebarOpen(!sidebarOpen),
					className: "rounded-lg p-1.5 hover:bg-muted text-foreground transition-colors",
					"aria-label": sidebarOpen ? "Fechar menu" : "Abrir menu",
					children: sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-16 flex items-center gap-2 px-6 border-b border-border select-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground text-lg",
							children: "MinderPay Admin"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-border bg-muted/10 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-semibold text-foreground truncate",
								children: "Administrador"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] text-muted-foreground truncate",
								children: userEmail || "a carregar…"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Navegação administrativa",
						className: "flex-1 p-4 space-y-1",
						children: navItems.map((item) => {
							const Icon = item.icon;
							const isActive = currentPath.startsWith(item.href);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.href,
								onClick: () => setSidebarOpen(false),
								className: `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.href);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Terminar Sessão" })]
						})
					})
				]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => setSidebarOpen(false),
				className: "fixed inset-0 z-30 bg-black/40 md:hidden",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 flex flex-col min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 p-6 md:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			})
		]
	});
}
//#endregion
export { AdminLayout as component };
