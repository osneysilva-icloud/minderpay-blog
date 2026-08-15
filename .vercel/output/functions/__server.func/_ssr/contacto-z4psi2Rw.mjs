import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as SiteLayout } from "./layout-Bx4PQ1v5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-z4psi2Rw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTACT_CHANNELS = [
	{
		id: "whatsapp",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "size-6",
			fill: "currentColor",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
		}),
		title: "WhatsApp",
		subtitle: "+258 864 339 593",
		description: "Resposta rápida, geralmente em menos de 24h.",
		href: "https://wa.me/258864339593",
		colorClass: "bg-green-500",
		hoverClass: "hover:bg-green-600",
		textColor: "text-green-600",
		bgLight: "bg-green-50 dark:bg-green-950/30",
		borderColor: "border-green-200 dark:border-green-800"
	},
	{
		id: "instagram",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "size-6",
			fill: "currentColor",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })
		}),
		title: "Instagram",
		subtitle: "@minderads",
		description: "Siga e envie uma DM pelo Instagram.",
		href: "https://www.instagram.com/minderads/",
		colorClass: "bg-gradient-to-br from-pink-500 to-orange-400",
		hoverClass: "hover:opacity-90",
		textColor: "text-pink-600",
		bgLight: "bg-pink-50 dark:bg-pink-950/30",
		borderColor: "border-pink-200 dark:border-pink-800"
	},
	{
		id: "youtube",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "size-6",
			fill: "currentColor",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
		}),
		title: "YouTube",
		subtitle: "@MinderAds",
		description: "Assista aos vídeos e deixe o seu comentário.",
		href: "https://www.youtube.com/@MinderAds",
		colorClass: "bg-red-600",
		hoverClass: "hover:bg-red-700",
		textColor: "text-red-600",
		bgLight: "bg-red-50 dark:bg-red-950/30",
		borderColor: "border-red-200 dark:border-red-800"
	}
];
function ContactView() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
			toast.error("Por favor, preencha todos os campos obrigatórios.");
			return;
		}
		setLoading(true);
		try {
			const { error } = await supabase.from("contact_messages").insert({
				name,
				email,
				subject,
				message
			});
			if (error) throw error;
			toast.success("Mensagem enviada com sucesso! Responderemos o mais breve possível.");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch (err) {
			toast.error(err.message || "Não foi possível enviar a sua mensagem. Tente mais tarde.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-primary/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page relative z-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary",
						children: "Vamos conversar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight md:text-5xl",
						children: "Entre em Contacto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-gray-300 leading-relaxed",
						children: "Tem uma dúvida, proposta de parceria ou quer saber mais? Estamos disponíveis por vários canais — escolha o que for mais conveniente para si."
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-16 max-w-5xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-3 mb-16",
			children: CONTACT_CHANNELS.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: channel.href,
				id: `contact-${channel.id}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: `group flex flex-col items-center rounded-2xl border p-8 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${channel.bgLight} ${channel.borderColor}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mb-4 flex size-14 items-center justify-center rounded-full text-white shadow-md transition-transform group-hover:scale-110 ${channel.colorClass}`,
						children: channel.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: `text-lg font-bold ${channel.textColor}`,
						children: channel.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold text-foreground",
						children: channel.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground leading-relaxed",
						children: channel.description
					})
				]
			}, channel.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-card shadow-sm overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border bg-muted/30 px-8 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-[family-name:var(--font-display)] text-2xl font-bold text-foreground",
					children: "Enviar Mensagem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Preencha o formulário abaixo e responderemos em até 48 horas úteis."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "contact-name",
								className: "block text-sm font-semibold text-foreground",
								children: ["Nome Completo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "contact-name",
								type: "text",
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								disabled: loading,
								placeholder: "O seu nome…",
								className: "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "contact-email",
								className: "block text-sm font-semibold text-foreground",
								children: ["Email de Contacto ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "contact-email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								disabled: loading,
								placeholder: "email@exemplo.com",
								className: "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "contact-subject",
							className: "block text-sm font-semibold text-foreground",
							children: ["Assunto ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "contact-subject",
							type: "text",
							required: true,
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							disabled: loading,
							placeholder: "Sobre o que deseja falar…",
							className: "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "contact-message",
							className: "block text-sm font-semibold text-foreground",
							children: ["Mensagem ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "contact-message",
							required: true,
							rows: 6,
							value: message,
							onChange: (e) => setMessage(e.target.value),
							disabled: loading,
							placeholder: "Escreva a sua mensagem em detalhe…",
							className: "w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Ou contacte diretamente:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:suporteminderpay@gmail.com",
									className: "text-primary hover:underline",
									children: "suporteminderpay@gmail.com"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							id: "contact-submit",
							className: "flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }), "A enviar…"] }) : "Enviar Mensagem →"
						})]
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { ContactView as component };
