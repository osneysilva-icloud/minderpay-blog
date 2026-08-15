import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as KeyRound, L as Mail, it as Compass } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BfBj_YIE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-H--28a6j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginView() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Por favor, preencha o email e a palavra-passe.");
			return;
		}
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			const { data: userRole } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
			if (!userRole) {
				await supabase.auth.signOut();
				toast.error("Acesso negado: Apenas administradores podem aceder a esta área.");
				return;
			}
			toast.success("Sessão iniciada com sucesso!");
			navigate({ to: "/admin/dashboard" });
		} catch (err) {
			toast.error(err.message || "Erro de autenticação. Verifique os dados inseridos.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-muted/30 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md border border-border shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "space-y-3 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-7 animate-pulse" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-[family-name:var(--font-display)] text-2xl font-700",
					children: "MinderPay CMS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Faça login para aceder à área de administração."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleLogin,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "login-email",
							className: "text-xs font-semibold text-foreground",
							children: "Endereço de Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "login-email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								disabled: loading,
								placeholder: "admin@minderpay.com",
								className: "pl-9"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "login-pass",
								className: "text-xs font-semibold text-foreground",
								children: "Palavra-passe"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "login-pass",
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								disabled: loading,
								placeholder: "••••••••",
								className: "pl-9"
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
					className: "flex flex-col gap-3 pt-4 pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "w-full h-11 font-semibold text-sm rounded-lg",
						children: loading ? "A processar…" : "Iniciar Sessão"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs text-muted-foreground hover:text-primary transition-colors text-center hover:underline",
						children: "Voltar ao site público"
					})]
				})]
			})]
		})
	});
}
//#endregion
export { LoginView as component };
