import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Route$7 } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as Tag, f as Trash2, k as Pen, y as Sparkles } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BfBj_YIE.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DxXTo8Jq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tags-DZLeocCP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TagsManagementView() {
	const navigate = useNavigate();
	const tags = Route$7.useLoaderData();
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const generateSlug = () => {
		if (!name) return;
		const generated = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
		setSlug(generated);
	};
	const handleEdit = (tag) => {
		setEditingId(tag.id);
		setName(tag.name);
		setSlug(tag.slug);
	};
	const resetForm = () => {
		setEditingId(null);
		setName("");
		setSlug("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !slug) {
			toast.error("Nome e Slug são campos obrigatórios.");
			return;
		}
		setLoading(true);
		try {
			let slugQuery = supabase.from("tags").select("id").eq("slug", slug);
			if (editingId) slugQuery = slugQuery.neq("id", editingId);
			const { data: taken } = await slugQuery.maybeSingle();
			if (taken) {
				toast.error("Este slug de URL já está a ser utilizado por outra tag.");
				setLoading(false);
				return;
			}
			const payload = {
				name,
				slug
			};
			if (editingId) {
				const { error } = await supabase.from("tags").update(payload).eq("id", editingId);
				if (error) throw error;
				toast.success("Tag atualizada com sucesso!");
			} else {
				const { error } = await supabase.from("tags").insert(payload);
				if (error) throw error;
				toast.success("Tag criada com sucesso!");
			}
			resetForm();
			navigate({ to: "/admin/tags" });
		} catch (err) {
			toast.error(err.message || "Erro ao salvar a tag.");
		} finally {
			setLoading(false);
		}
	};
	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const { error } = await supabase.from("tags").delete().eq("id", deleteId);
			if (error) throw error;
			toast.success("Tag excluída com sucesso.");
			setConfirmOpen(false);
			setDeleteId(null);
			navigate({ to: "/admin/tags" });
		} catch (err) {
			toast.error(err.message || "Erro ao excluir a tag.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
				children: "Tags"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Crie e gerencie palavras-chave/tags para vincular aos seus artigos."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border border-border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "font-[family-name:var(--font-display)] text-lg font-700",
							children: editingId ? "Editar Tag" : "Nova Tag"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "tag-name",
										className: "text-xs font-semibold text-foreground",
										children: "Nome da Tag"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tag-name",
										required: true,
										placeholder: "Rendimento, Guia, SEO...",
										value: name,
										onChange: (e) => setName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "tag-slug",
										className: "text-xs font-semibold text-foreground",
										children: "Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "tag-slug",
											required: true,
											placeholder: "rendimento",
											value: slug,
											onChange: (e) => setSlug(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "outline",
											onClick: generateSlug,
											title: "Gerar slug a partir do nome",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: loading,
										className: "flex-1",
										children: editingId ? "Atualizar" : "Criar Tag"
									}), editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: resetForm,
										children: "Cancelar"
									})]
								})
							]
						}) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border border-border shadow-sm overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3.5",
											children: "Nome"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3.5",
											children: "Slug"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3.5 text-right",
											children: "Ações"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: tags.length > 0 ? tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-6 py-4 font-semibold text-foreground flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-4 text-muted-foreground" }),
													" #",
													tag.name
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-muted-foreground font-mono text-xs",
												children: tag.slug
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleEdit(tag),
														className: "rounded-lg p-2 text-primary hover:bg-primary/10 transition-colors",
														title: "Editar Tag",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															setDeleteId(tag.id);
															setConfirmOpen(true);
														},
														className: "rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors",
														title: "Excluir Tag",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
													})]
												})
											})
										]
									}, tag.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 3,
										className: "px-6 py-12 text-center text-muted-foreground",
										children: "Nenhuma tag cadastrada."
									}) })
								})]
							})
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmOpen,
				onOpenChange: setConfirmOpen,
				title: "Deseja excluir esta tag?",
				description: "Esta ação excluirá permanentemente esta tag. Ela será removida de todos os artigos vinculados.",
				confirmText: "Excluir Tag",
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { TagsManagementView as component };
