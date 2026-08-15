import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as subscribeToNewsletter } from "./router-BK-OawKa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Newsletter-DfAOamrd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Newsletter({ source = "home" }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) return;
		setLoading(true);
		try {
			await subscribeToNewsletter({
				email,
				source
			});
			toast.success("Subscrição concluída com sucesso! Obrigado.");
			setEmail("");
		} catch (err) {
			toast.error(err.message || "Erro ao efetuar a subscrição.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl",
				children: "Mantenha-se informado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: "Receba os melhores artigos sobre dinheiro, negócios e tecnologia diretamente no seu email. Sem spam."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-6 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "newsletter-email",
						className: "sr-only",
						children: "Endereço de email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "newsletter-email",
						type: "email",
						placeholder: "O seu endereço de email…",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						disabled: loading,
						className: "h-11 w-full rounded-lg bg-background"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "h-11 rounded-lg px-6 font-semibold",
					children: loading ? "A subscrever…" : "Subscrever"
				})]
			})
		]
	});
}
//#endregion
export { Newsletter as t };
