import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CRIS042E.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$11 } from "./router-BK-OawKa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as FileImage, f as Trash2, mt as Calendar, nt as ExternalLink, o as Upload, rt as Copy } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { n as CardContent, t as Card } from "./card-BfBj_YIE.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DxXTo8Jq.mjs";
import { n as bytesToSize, o as uploadMediaFile, r as deleteMediaFile } from "./admin-BwVktKzv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-Ciqrty1e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaLibraryView() {
	const navigate = useNavigate();
	const mediaItems = Route$11.useLoaderData();
	const [file, setFile] = (0, import_react.useState)(null);
	const [altText, setAltText] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [deleteItem, setDeleteItem] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const [selectedItem, setSelectedItem] = (0, import_react.useState)(null);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
			const name = e.target.files[0].name.replace(/\.[a-zA-Z0-9]+$/, "");
			setAltText(name);
		}
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!file) {
			toast.error("Por favor, selecione uma imagem.");
			return;
		}
		setUploading(true);
		try {
			const { data: session } = await supabase.auth.getSession();
			await uploadMediaFile({
				file,
				altText,
				description: description || void 0,
				uploadedBy: session?.session?.user?.id || null
			});
			toast.success("Imagem enviada e otimizada com sucesso!");
			setFile(null);
			setAltText("");
			setDescription("");
			const fileInput = document.getElementById("media-file");
			if (fileInput) fileInput.value = "";
			navigate({ to: "/admin/media" });
		} catch (err) {
			toast.error(err.message || "Erro ao fazer upload da imagem.");
		} finally {
			setUploading(false);
		}
	};
	const handleDelete = async () => {
		if (!deleteItem) return;
		try {
			await deleteMediaFile(deleteItem);
			toast.success("Imagem excluída da biblioteca.");
			setConfirmOpen(false);
			setDeleteItem(null);
			setSelectedItem(null);
			navigate({ to: "/admin/media" });
		} catch (err) {
			toast.error(err.message || "Erro ao excluir imagem.");
		}
	};
	const copyToClipboard = (url) => {
		const absolute = window.location.origin + url;
		navigator.clipboard.writeText(absolute);
		toast.success("URL absoluta da imagem copiada!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
				children: "Biblioteca de Mídia"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Carregue e organize as imagens dos artigos. Conversão automática para WebP e compressão ativas."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border border-border shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-foreground text-sm border-b border-border pb-3 mb-4",
								children: "Enviar Imagem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleUpload,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "media-file",
												className: "text-xs font-semibold text-foreground",
												children: "Ficheiro de Imagem"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "media-file",
												type: "file",
												accept: "image/*",
												required: true,
												onChange: handleFileChange,
												disabled: uploading,
												className: "cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Formatos: JPG, PNG, WEBP, SVG, GIF (máx. 5MB)."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "media-alt",
											className: "text-xs font-semibold text-foreground",
											children: "Texto Alternativo (Alt Text)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "media-alt",
											required: true,
											placeholder: "Descrição da imagem para acessibilidade…",
											value: altText,
											onChange: (e) => setAltText(e.target.value),
											disabled: uploading
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "media-desc",
											className: "text-xs font-semibold text-foreground",
											children: "Descrição (Opcional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "media-desc",
											placeholder: "Onde será usada esta imagem…",
											value: description,
											onChange: (e) => setDescription(e.target.value),
											disabled: uploading
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										disabled: uploading || !file,
										className: "w-full gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), uploading ? "A enviar…" : "Enviar Imagem"]
									})
								]
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-3 space-y-4",
					children: [mediaItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
						children: mediaItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setSelectedItem(item),
							className: `group rounded-xl border overflow-hidden bg-card cursor-pointer transition-all hover:shadow-md hover:border-primary/50 relative aspect-square ${selectedItem?.id === item.id ? "ring-2 ring-primary border-primary" : "border-border"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.public_url,
								alt: item.alt_text || item.file_name,
								className: "w-full h-full object-cover select-none",
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										copyToClipboard(item.public_url);
									},
									className: "rounded-full bg-background p-2 text-foreground shadow-sm hover:scale-105 transition-transform",
									title: "Copiar URL",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										setDeleteItem(item);
										setConfirmOpen(true);
									},
									className: "rounded-full bg-destructive p-2 text-destructive-foreground shadow-sm hover:scale-105 transition-transform",
									title: "Excluir Imagem",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})]
						}, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-dashed border-border py-24 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "mx-auto size-12 text-muted-foreground/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted-foreground font-medium",
								children: "Biblioteca vazia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground/75",
								children: "Faça o envio da primeira imagem utilizando o painel lateral."
							})
						]
					}), selectedItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border border-border shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-24 rounded-lg overflow-hidden border border-border bg-muted shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedItem.public_url,
									alt: selectedItem.alt_text || selectedItem.file_name,
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-1.5 text-center sm:text-left text-sm overflow-hidden w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-foreground truncate",
										children: selectedItem.file_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }),
													" ",
													new Date(selectedItem.created_at).toLocaleDateString()
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Tamanho: ", bytesToSize(selectedItem.size_bytes)] }),
											selectedItem.width && selectedItem.height && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Dimensões: ",
												selectedItem.width,
												"x",
												selectedItem.height,
												"px"
											] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Alt Text: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: selectedItem.alt_text || "—"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-center sm:justify-start gap-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => copyToClipboard(selectedItem.public_url),
											className: "gap-1.5 h-8 text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), " Copiar Link"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: selectedItem.public_url,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), " Ver Original"]
										})]
									})
								]
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmOpen,
				onOpenChange: setConfirmOpen,
				title: "Deseja excluir esta imagem?",
				description: "Esta ação excluirá permanentemente a imagem do Supabase Storage e do banco de dados. Artigos que usem esta URL exibirão uma imagem quebrada.",
				confirmText: "Excluir Imagem",
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { MediaLibraryView as component };
