import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Route$9 } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as Image, L as Mail, N as MessageSquare, S as Settings, _t as BadgePercent, a as User, b as ShieldCheck, f as Trash2, it as Compass, o as Upload, x as Share2, y as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BfBj_YIE.mjs";
import { i as formatDateTime } from "./admin-DjD_SmfS.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CqJGoWci.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function SettingsManagementView() {
	const navigate = useNavigate();
	const { settings, adSlots: initialAdSlots, author: initialAuthor, messages: initialMessages } = Route$9.useLoaderData();
	const [siteName, setSiteName] = (0, import_react.useState)(settings?.site_name || "MinderPay");
	const [siteDescription, setSiteDescription] = (0, import_react.useState)(settings?.site_description || "");
	const [siteUrl, setSiteUrl] = (0, import_react.useState)(settings?.site_url || "https://minderpay.com");
	const [logoUrl, setLogoUrl] = (0, import_react.useState)(settings?.logo_url || "");
	const [faviconUrl, setFaviconUrl] = (0, import_react.useState)(settings?.favicon_url || "/favicon.svg");
	const [contactEmail, setContactEmail] = (0, import_react.useState)(settings?.contact_email || "suporteminderpay@gmail.com");
	const [gaId, setGaId] = (0, import_react.useState)(settings?.ga_measurement_id || "");
	const [gscVer, setGscVer] = (0, import_react.useState)(settings?.gsc_verification || "");
	const [adsensePubId, setAdsensePubId] = (0, import_react.useState)(settings?.adsense_publisher_id || "");
	const [adsEnabled, setAdsEnabled] = (0, import_react.useState)(settings?.ads_enabled ?? false);
	const [defSeoTitle, setDefSeoTitle] = (0, import_react.useState)(settings?.default_seo_title || "");
	const [defSeoDesc, setDefSeoDesc] = (0, import_react.useState)(settings?.default_seo_description || "");
	const [defOgImage, setDefOgImage] = (0, import_react.useState)(settings?.default_og_image || "");
	const [whatsapp, setWhatsapp] = (0, import_react.useState)("+258864339593");
	const [facebook, setFacebook] = (0, import_react.useState)(settings?.social_facebook || "");
	const [instagram, setInstagram] = (0, import_react.useState)(settings?.social_instagram || "https://www.instagram.com/minderads/");
	const [twitter, setTwitter] = (0, import_react.useState)(settings?.social_twitter || "");
	const [linkedin, setLinkedin] = (0, import_react.useState)(settings?.social_linkedin || "");
	const [youtube, setYoutube] = (0, import_react.useState)(settings?.social_youtube || "https://www.youtube.com/@MinderAds");
	const [authorName, setAuthorName] = (0, import_react.useState)(initialAuthor?.name || "Minder Ads");
	const [authorRole, setAuthorRole] = (0, import_react.useState)(initialAuthor?.role_title || "Expert em vendas de infoprodutos, produtos físicos, desenvolvedor e designer");
	const [authorBio, setAuthorBio] = (0, import_react.useState)(initialAuthor?.bio || "Expert em vendas de infoprodutos, produtos físicos, marketing digital, desenvolvimento web e design.");
	const [authorAvatar, setAuthorAvatar] = (0, import_react.useState)(initialAuthor?.avatar_url || "");
	const [authorWebsite, setAuthorWebsite] = (0, import_react.useState)(initialAuthor?.website_url || "https://minderpay.com");
	const [adSlots, setAdSlots] = (0, import_react.useState)(initialAdSlots);
	const [messages, setMessages] = (0, import_react.useState)(initialMessages);
	const [selectedMessage, setSelectedMessage] = (0, import_react.useState)(null);
	const [savingGeneral, setSavingGeneral] = (0, import_react.useState)(false);
	const [savingAuthor, setSavingAuthor] = (0, import_react.useState)(false);
	const [savingAds, setSavingAds] = (0, import_react.useState)(false);
	const [uploadingLogo, setUploadingLogo] = (0, import_react.useState)(false);
	const [uploadingFavicon, setUploadingFavicon] = (0, import_react.useState)(false);
	const [uploadingOgImage, setUploadingOgImage] = (0, import_react.useState)(false);
	const [uploadingAvatar, setUploadingAvatar] = (0, import_react.useState)(false);
	const uploadImageToStorage = async (file, folder) => {
		const ext = file.name.split(".").pop();
		const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
		const { data, error } = await supabase.storage.from("media").upload(filename, file, {
			upsert: false,
			contentType: file.type
		});
		if (error) throw error;
		const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
		return publicUrl;
	};
	const handleLogoUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploadingLogo(true);
		try {
			const url = await uploadImageToStorage(file, "site-branding");
			setLogoUrl(url);
			toast.success("Logotipo enviado com sucesso!");
		} catch (err) {
			toast.error("Erro ao enviar logotipo: " + err.message);
		} finally {
			setUploadingLogo(false);
		}
	};
	const handleFaviconUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploadingFavicon(true);
		try {
			const url = await uploadImageToStorage(file, "site-branding");
			setFaviconUrl(url);
			toast.success("Favicon enviado com sucesso!");
		} catch (err) {
			toast.error("Erro ao enviar favicon: " + err.message);
		} finally {
			setUploadingFavicon(false);
		}
	};
	const handleOgImageUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploadingOgImage(true);
		try {
			const url = await uploadImageToStorage(file, "site-branding");
			setDefOgImage(url);
			toast.success("Imagem social (OG) enviada!");
		} catch (err) {
			toast.error("Erro ao enviar imagem: " + err.message);
		} finally {
			setUploadingOgImage(false);
		}
	};
	const handleAvatarUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploadingAvatar(true);
		try {
			const url = await uploadImageToStorage(file, "avatars");
			setAuthorAvatar(url);
			toast.success("Foto de perfil enviada!");
		} catch (err) {
			toast.error("Erro ao enviar avatar: " + err.message);
		} finally {
			setUploadingAvatar(false);
		}
	};
	const handleGeneralSubmit = async (e) => {
		e.preventDefault();
		setSavingGeneral(true);
		try {
			const payload = {
				site_name: siteName,
				site_description: siteDescription,
				site_url: siteUrl,
				logo_url: logoUrl || null,
				favicon_url: faviconUrl || null,
				contact_email: contactEmail || null,
				ga_measurement_id: gaId || null,
				gsc_verification: gscVer || null,
				adsense_publisher_id: adsensePubId || null,
				ads_enabled: adsEnabled,
				default_seo_title: defSeoTitle || null,
				default_seo_description: defSeoDesc || null,
				default_og_image: defOgImage || null,
				social_facebook: facebook || null,
				social_instagram: instagram || null,
				social_twitter: twitter || null,
				social_linkedin: linkedin || null,
				social_youtube: youtube || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			if (settings?.id) {
				const { error } = await supabase.from("site_settings").update(payload).eq("id", settings.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("site_settings").insert({
					singleton: true,
					...payload
				});
				if (error) throw error;
			}
			toast.success("Configurações do site guardadas com sucesso!");
			navigate({ to: "/admin/settings" });
		} catch (err) {
			toast.error(err.message || "Erro ao guardar configurações.");
		} finally {
			setSavingGeneral(false);
		}
	};
	const handleAuthorSubmit = async (e) => {
		e.preventDefault();
		setSavingAuthor(true);
		try {
			const slug = authorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
			const payload = {
				name: authorName,
				slug,
				role_title: authorRole || null,
				bio: authorBio || null,
				avatar_url: authorAvatar || null,
				website_url: authorWebsite || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			if (initialAuthor?.id) {
				const { error } = await supabase.from("authors").update(payload).eq("id", initialAuthor.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("authors").insert(payload);
				if (error) throw error;
			}
			toast.success("Perfil do autor atualizado com sucesso!");
			navigate({ to: "/admin/settings" });
		} catch (err) {
			toast.error(err.message || "Erro ao atualizar perfil do autor.");
		} finally {
			setSavingAuthor(false);
		}
	};
	const handleAdSlotChange = (key, field, value) => {
		setAdSlots((prev) => prev.map((slot) => slot.key === key ? {
			...slot,
			[field]: value
		} : slot));
	};
	const handleToggleAllAds = (enable) => {
		setAdsEnabled(enable);
		setAdSlots((prev) => prev.map((s) => ({
			...s,
			enabled: enable
		})));
	};
	const handleAdsSubmit = async (e) => {
		e.preventDefault();
		setSavingAds(true);
		try {
			if (settings?.id) {
				const { error: settingsError } = await supabase.from("site_settings").update({
					ads_enabled: adsEnabled,
					adsense_publisher_id: adsensePubId || null
				}).eq("id", settings.id);
				if (settingsError) throw settingsError;
			}
			const promises = adSlots.map((slot) => supabase.from("ad_slots").update({
				enabled: slot.enabled,
				ad_client: slot.ad_client || null,
				ad_unit_id: slot.ad_unit_id || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("key", slot.key));
			const failed = (await Promise.all(promises)).find((r) => r.error);
			if (failed?.error) throw failed.error;
			toast.success("Configurações de publicidade atualizadas com sucesso!");
			navigate({ to: "/admin/settings" });
		} catch (err) {
			toast.error(err.message || "Erro ao guardar definições de anúncios.");
		} finally {
			setSavingAds(false);
		}
	};
	const handleDeleteMessage = async (id) => {
		const { error } = await supabase.from("contact_messages").delete().eq("id", id);
		if (error) toast.error("Erro ao apagar mensagem.");
		else {
			setMessages((prev) => prev.filter((m) => m.id !== id));
			if (selectedMessage?.id === id) setSelectedMessage(null);
			toast.success("Mensagem eliminada.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
			children: "Configurações do Site & Plataforma"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Gerencie a identidade visual, perfil do autor, SEO global, publicidade AdSense e caixa de entrada."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "geral",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-muted w-full justify-start overflow-x-auto p-1 flex gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "geral",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), " Geral"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "autor",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }), " Perfil do Autor"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "seo",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " SEO & Analytics"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "redes",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Redes & Contactos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "anuncios",
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgePercent, { className: "size-4" }), " Publicidade"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "mensagens",
							className: "flex items-center gap-1.5 relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
								" Mensagens",
								messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] font-bold text-primary-foreground",
									children: messages.length
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "geral",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleGeneralSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "font-[family-name:var(--font-display)] text-lg font-700",
								children: "Identidade do Portal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Defina o nome, URL, logotipo e favicon oficial do MinderPay." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "set-name",
												className: "text-xs font-semibold text-foreground",
												children: "Nome do Blog / Portal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "set-name",
												required: true,
												value: siteName,
												onChange: (e) => setSiteName(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "set-url",
												className: "text-xs font-semibold text-foreground",
												children: "URL Oficial de Produção"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "set-url",
												required: true,
												value: siteUrl,
												onChange: (e) => setSiteUrl(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "set-desc",
											className: "text-xs font-semibold text-foreground",
											children: "Descrição do Site (Tagline Global)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "set-desc",
											required: true,
											value: siteDescription,
											onChange: (e) => setSiteDescription(e.target.value),
											rows: 3
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-6 sm:grid-cols-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: "Logotipo Oficial"
												}), logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setLogoUrl(""),
													className: "text-xs text-destructive hover:underline",
													children: "Remover"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "size-16 rounded-xl border border-border bg-muted/40 flex items-center justify-center overflow-hidden shrink-0",
													children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: logoUrl,
														alt: "Logo Preview",
														className: "h-full w-full object-contain p-1"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-6 text-muted-foreground" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors",
														children: [
															uploadingLogo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
															uploadingLogo ? "A enviar…" : "Enviar Logotipo",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "file",
																accept: "image/*",
																className: "hidden",
																onChange: handleLogoUpload,
																disabled: uploadingLogo
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground",
														children: "PNG, SVG ou WebP (recomendado 200x50px)"
													})]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border bg-card p-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: "Favicon (Ícone da Aba)"
												}), faviconUrl && faviconUrl !== "/favicon.svg" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setFaviconUrl("/favicon.svg"),
													className: "text-xs text-destructive hover:underline",
													children: "Restaurar Padrão"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "size-16 rounded-xl border border-border bg-muted/40 flex items-center justify-center overflow-hidden shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: faviconUrl || "/favicon.svg",
														alt: "Favicon Preview",
														className: "size-8 object-contain"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors",
														children: [
															uploadingFavicon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
															uploadingFavicon ? "A enviar…" : "Enviar Favicon",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "file",
																accept: "image/*,.ico",
																className: "hidden",
																onChange: handleFaviconUpload,
																disabled: uploadingFavicon
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground",
														children: "SVG, ICO ou PNG (32x32px)"
													})]
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 max-w-md pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "set-email",
											className: "text-xs font-semibold text-foreground",
											children: "Email de Suporte / Contacto Oficial"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "set-email",
											type: "email",
											value: contactEmail,
											onChange: (e) => setContactEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingGeneral,
											className: "min-w-[140px]",
											children: savingGeneral ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), " A guardar…"] }) : "Guardar Geral"
										})
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "autor",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleAuthorSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "font-[family-name:var(--font-display)] text-lg font-700",
								children: "Perfil de Autor (Minder Ads)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Edite a sua foto, cargo, biografia e informações apresentadas nas páginas dos artigos." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-6 p-4 rounded-xl border border-border bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative size-20 rounded-full border-2 border-primary/20 overflow-hidden bg-muted flex items-center justify-center shrink-0",
											children: authorAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: authorAvatar,
												alt: "Foto do Autor",
												className: "h-full w-full object-cover"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-8 text-primary/40" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow hover:opacity-90 transition-opacity",
												children: [
													uploadingAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
													uploadingAvatar ? "A enviar foto…" : "Alterar Foto de Perfil",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "file",
														accept: "image/*",
														className: "hidden",
														onChange: handleAvatarUpload,
														disabled: uploadingAvatar
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: "Recomendado formato quadrado (ex: 400x400px JPG/PNG)"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "auth-name",
												className: "text-xs font-semibold text-foreground",
												children: "Nome do Autor / Marca"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "auth-name",
												required: true,
												value: authorName,
												onChange: (e) => setAuthorName(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "auth-role",
												className: "text-xs font-semibold text-foreground",
												children: "Título / Especialidade"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "auth-role",
												value: authorRole,
												onChange: (e) => setAuthorRole(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "auth-bio",
											className: "text-xs font-semibold text-foreground",
											children: "Biografia / Sobre o Autor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "auth-bio",
											value: authorBio,
											onChange: (e) => setAuthorBio(e.target.value),
											rows: 3
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "auth-web",
												className: "text-xs font-semibold text-foreground",
												children: "Website Pessoal / Canal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "auth-web",
												value: authorWebsite,
												onChange: (e) => setAuthorWebsite(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "auth-wa",
												className: "text-xs font-semibold text-foreground",
												children: "WhatsApp Profissional"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "auth-wa",
												value: whatsapp,
												onChange: (e) => setWhatsapp(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingAuthor,
											className: "min-w-[140px]",
											children: savingAuthor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), " A guardar…"] }) : "Guardar Perfil"
										})
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "seo",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleGeneralSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "font-[family-name:var(--font-display)] text-lg font-700",
								children: "SEO Global & Serviços Google"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure as chaves do Google Search Console, Google Analytics e metatags para redes sociais." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "seo-gsc",
													className: "text-xs font-semibold text-foreground",
													children: "Google Search Console Verification Tag"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "seo-gsc",
													placeholder: "ex: google-site-verification=...",
													value: gscVer,
													onChange: (e) => setGscVer(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: "Insira o valor da meta tag de verificação do Google."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "seo-ga",
													className: "text-xs font-semibold text-foreground",
													children: "Google Analytics 4 Measurement ID"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "seo-ga",
													placeholder: "G-XXXXXXXXXX",
													value: gaId,
													onChange: (e) => setGaId(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-muted-foreground",
													children: "Identificador no formato G-XXXXXXXXXX."
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "seo-deftitle",
												className: "text-xs font-semibold text-foreground",
												children: "Meta Title Padrão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "seo-deftitle",
												placeholder: "MinderPay — Negócios, Marketing e Tecnologia",
												value: defSeoTitle,
												onChange: (e) => setDefSeoTitle(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "seo-defdesc",
												className: "text-xs font-semibold text-foreground",
												children: "Meta Description Padrão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "seo-defdesc",
												placeholder: "Resumo padrão do site...",
												value: defSeoDesc,
												onChange: (e) => setDefSeoDesc(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Imagem de Partilha Social (OG Image Padrão)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4 p-3 rounded-xl border border-border bg-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-16 w-28 rounded-lg border border-border bg-muted overflow-hidden shrink-0 flex items-center justify-center",
												children: defOgImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: defOgImage,
													alt: "OG Preview",
													className: "h-full w-full object-cover"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-muted-foreground" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors",
													children: [
														uploadingOgImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }),
														uploadingOgImage ? "A enviar…" : "Enviar Imagem OG (1200x630px)",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "file",
															accept: "image/*",
															className: "hidden",
															onChange: handleOgImageUpload,
															disabled: uploadingOgImage
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "ou cole o URL direto da imagem...",
													value: defOgImage,
													onChange: (e) => setDefOgImage(e.target.value),
													className: "h-8 text-xs"
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-muted/20 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), " Pré-visualização nos Resultados do Google"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-card border border-border p-4 space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-muted-foreground",
													children: "https://minderpay.com"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate",
													children: defSeoTitle || siteName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
													children: defSeoDesc || siteDescription
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingGeneral,
											className: "min-w-[140px]",
											children: savingGeneral ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), " A guardar…"] }) : "Guardar SEO"
										})
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "redes",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleGeneralSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "font-[family-name:var(--font-display)] text-lg font-700",
								children: "Canais & Redes Sociais"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure os canais oficiais do Minder Ads apresentados no cabeçalho e rodapé." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "social-yt",
												className: "text-xs font-semibold text-foreground",
												children: "Canal do YouTube"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "social-yt",
												placeholder: "https://www.youtube.com/@MinderAds",
												value: youtube,
												onChange: (e) => setYoutube(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "social-ig",
												className: "text-xs font-semibold text-foreground",
												children: "Perfil do Instagram"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "social-ig",
												placeholder: "https://www.instagram.com/minderads/",
												value: instagram,
												onChange: (e) => setInstagram(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "social-wa",
													className: "text-xs font-semibold text-foreground",
													children: "WhatsApp (wa.me)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "social-wa",
													placeholder: "https://wa.me/258864339593",
													value: whatsapp,
													onChange: (e) => setWhatsapp(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "social-fb",
													className: "text-xs font-semibold text-foreground",
													children: "Página do Facebook"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "social-fb",
													placeholder: "https://facebook.com/...",
													value: facebook,
													onChange: (e) => setFacebook(e.target.value)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													htmlFor: "social-tw",
													className: "text-xs font-semibold text-foreground",
													children: "Twitter / X"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "social-tw",
													placeholder: "https://twitter.com/...",
													value: twitter,
													onChange: (e) => setTwitter(e.target.value)
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingGeneral,
											className: "min-w-[140px]",
											children: savingGeneral ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), " A guardar…"] }) : "Guardar Redes"
										})
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "anuncios",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: handleAdsSubmit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgePercent, { className: "size-5 text-primary" }), " Google AdSense & Bloco de Anúncios"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Gerencie a ativação global e a configuração individual dos 6 blocos publicitários do portal." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 p-5 rounded-2xl border border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: `size-5 ${adsEnabled ? "text-green-600" : "text-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-bold text-foreground",
													children: "Publicidade Global no Portal"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: adsEnabled ? "Os blocos de anúncios estão ATIVOS no portal." : "Todos os anúncios estão DESATIVADOS."
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => handleToggleAllAds(true),
												className: "text-xs",
												children: "Ativar Todos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => handleToggleAllAds(false),
												className: "text-xs text-destructive",
												children: "Desativar Todos"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 max-w-md",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "ad-client-pub",
												className: "text-xs font-semibold text-foreground",
												children: "Google AdSense Publisher ID"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "ad-client-pub",
												placeholder: "pub-XXXXXXXXXXXXXXXX",
												value: adsensePubId,
												onChange: (e) => setAdsensePubId(e.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "O seu ID de editor do AdSense (ex: pub-1234567890123456)."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border pt-4 space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
											children: "Espaços Publicitários (6 Slots Disponíveis)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid gap-4 md:grid-cols-2",
											children: adSlots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `p-4 rounded-xl border transition-all ${slot.enabled ? "border-primary/40 bg-card shadow-sm" : "border-border bg-muted/10 opacity-70"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														htmlFor: `slot-${slot.key}`,
														className: "text-sm font-bold text-foreground cursor-pointer select-none",
														children: slot.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														id: `slot-${slot.key}`,
														checked: slot.enabled,
														onChange: (e) => handleAdSlotChange(slot.key, "enabled", e.target.checked),
														className: "rounded border-border text-primary focus:ring-primary size-5 cursor-pointer"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-2 grid-cols-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-semibold text-muted-foreground",
															children: "Client ID (opcional)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "pub-...",
															value: slot.ad_client || "",
															onChange: (e) => handleAdSlotChange(slot.key, "ad_client", e.target.value),
															className: "h-8 text-xs"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-semibold text-muted-foreground",
															children: "Ad Unit ID"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "1234567890",
															value: slot.ad_unit_id || "",
															onChange: (e) => handleAdSlotChange(slot.key, "ad_unit_id", e.target.value),
															className: "h-8 text-xs"
														})]
													})]
												})]
											}, slot.key))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-4 border-t border-border flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingAds,
											className: "min-w-[160px]",
											children: savingAds ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), " A guardar…"] }) : "Guardar Publicidade"
										})
									})
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "mensagens",
					className: "mt-6 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border border-border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "font-[family-name:var(--font-display)] text-lg font-700 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5 text-primary" }), " Caixa de Entrada de Contactos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Mensagens enviadas por leitores através da página de contacto do portal." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: messages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-1 border-r border-border pr-4 space-y-2 max-h-[450px] overflow-y-auto",
								children: messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setSelectedMessage(msg),
									className: `p-3 rounded-lg border text-left cursor-pointer transition-all ${selectedMessage?.id === msg.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/40"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs font-bold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-[120px]",
												children: msg.name || "Sem Nome"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: formatDateTime(msg.created_at)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground truncate mt-1",
											children: msg.subject || "Sem Assunto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground/80 line-clamp-1 mt-1",
											children: msg.message
										})
									]
								}, msg.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2 pl-2",
								children: selectedMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between border-b border-border pb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-foreground text-base",
												children: selectedMessage.subject || "Mensagem de Contacto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													"De: ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: selectedMessage.name
													}),
													" (<",
													selectedMessage.email,
													">)"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: formatDateTime(selectedMessage.created_at)
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Contacto MinderPay")}`,
												className: "inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), " Responder"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteMessage(selectedMessage.id),
												className: "rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors",
												title: "Apagar mensagem",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-4 rounded-xl bg-muted/20 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed",
										children: selectedMessage.message
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center h-48 text-sm text-muted-foreground flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selecione uma mensagem à esquerda para ler os detalhes." })]
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center h-48 text-sm text-muted-foreground flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ainda não foram recebidas mensagens através do formulário de contacto." })]
						}) })]
					})
				})
			]
		})]
	});
}
//#endregion
export { SettingsManagementView as component };
