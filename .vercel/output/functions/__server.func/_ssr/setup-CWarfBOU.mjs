import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as Route$8 } from "./router-BK-OawKa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setup-CWarfBOU.js
var import_jsx_runtime = require_jsx_runtime();
function SetupView() {
	const data = Route$8.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full p-8 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-4",
			children: [
				data.success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold",
					children: "✓"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto size-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-2xl font-bold",
					children: "✗"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-slate-800",
					children: "Setup de Administrador"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-sm font-medium ${data.success ? "text-emerald-600" : "text-rose-600"}`,
					children: data.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500 leading-relaxed",
					children: data.success ? "Os utilizadores 'osneysilva@icloud.com' e 'suporteminderpay@gmail.com' foram criados de forma nativa pela API do Supabase e promovidos a admin. Já pode aceder a /admin/login!" : "Por favor, certifique-se de que a variável SUPABASE_SERVICE_ROLE_KEY está configurada corretamente na Vercel e tente de novo."
				})
			]
		})
	});
}
//#endregion
export { SetupView as component };
