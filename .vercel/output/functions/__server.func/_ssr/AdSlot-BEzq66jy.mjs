import { b as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as useSite } from "./router-BK-OawKa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdSlot-BEzq66jy.js
var import_jsx_runtime = require_jsx_runtime();
function AdSlot({ slotKey, className = "" }) {
	const { settings, adSlots } = useSite();
	if (!settings?.ads_enabled) return null;
	const slot = adSlots.find((s) => s.key === slotKey);
	if (!slot || !slot.enabled) return null;
	const adClient = slot.ad_client || settings.adsense_publisher_id || "";
	const adSlotId = slot.ad_unit_id || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `my-6 flex flex-col items-center justify-center border border-dashed border-border bg-muted/30 p-4 text-center transition-colors hover:bg-muted/50 ${className}`,
		style: { minHeight: "100px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60",
			children: "Publicidade"
		}), adClient && adSlotId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ins", {
			className: "adsbygoogle",
			style: { display: "block" },
			"data-ad-client": adClient,
			"data-ad-slot": adSlotId,
			"data-ad-format": "auto",
			"data-full-width-responsive": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 text-xs text-muted-foreground font-medium",
			children: [
				"Espaço Reservado para Anúncio (",
				slotKey,
				")",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] text-muted-foreground/70 font-normal",
					children: ["Configure ", slot.ad_unit_id ? "AdSense Publisher ID" : "Ad Unit ID no Painel"]
				})
			]
		})]
	});
}
//#endregion
export { AdSlot as t };
