import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$14 } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Z as FolderOpen, f as Trash2, k as Pen, y as Sparkles } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BfBj_YIE.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DxXTo8Jq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-BEQYlQXM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoriesManagementView() {
	const navigate = useNavigate();
	const categories = Route$14.useLoaderData();
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [seoTitle, setSeoTitle] = (0, import_react.useState)("");
	const [seoDescription, setSeoDescription] = (0, import_react.useState)("");
	const [robotsIndex, setRobotsIndex] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const generateSlug = () => {
		if (!name) return;
		const generated = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
		setSlug(generated);
	};
	const handleEdit = (category) => {
		setEditingId(category.id);
		setName(category.name);
		setSlug(category.slug);
		setDescription(category.description || "");
		setSeoTitle(category.seo_title || "");
		setSeoDescription(category.seo_description || "");
		setRobotsIndex(category.robots_index ?? true);
	};
	const resetForm = () => {
		setEditingId(null);
		setName("");
		setSlug("");
		setDescription("");
		setSeoTitle("");
		setSeoDescription("");
		setRobotsIndex(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !slug) {
			toast.error("Nome e Slug são campos obrigatórios.");
			return;
		}
		setLoading(true);
		try {
			let slugQuery = supabase.from("categories").select("id").eq("slug", slug);
			if (editingId) slugQuery = slugQuery.neq("id", editingId);
			const { data: taken } = await slugQuery.maybeSingle();
			if (taken) {
				toast.error("Este slug de URL já está a ser utilizado por outra categoria.");
				setLoading(false);
				return;
			}
			const payload = {
				name,
				slug,
				description: description || null,
				seo_title: seoTitle || null,
				seo_description: seoDescription || null,
				robots_index: robotsIndex
			};
			if (editingId) {
				const { error } = await supabase.from("categories").update(payload).eq("id", editingId);
				if (error) throw error;
				toast.success("Categoria atualizada com sucesso!");
			} else {
				const { error } = await supabase.from("categories").insert(payload);
				if (error) throw error;
				toast.success("Categoria criada com sucesso!");
			}
			resetForm();
			navigate({ to: "/admin/categories" });
		} catch (err) {
			toast.error(err.message || "Erro ao salvar a categoria.");
		} finally {
			setLoading(false);
		}
	};
	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const { error } = await supabase.from("categories").delete().eq("id", deleteId);
			if (error) throw error;
			toast.success("Categoria excluída com sucesso.");
			setConfirmOpen(false);
			setDeleteId(null);
			navigate({ to: "/admin/categories" });
		} catch (err) {
			toast.error(err.message || "Erro ao excluir a categoria.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
				children: "Categorias"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Crie e gerencie categorias de temas de publicação do MinderPay."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border border-border shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "font-[family-name:var(--font-display)] text-lg font-700",
							children: editingId ? "Editar Categoria" : "Nova Categoria"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "cat-name",
										className: "text-xs font-semibold text-foreground",
										children: "Nome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cat-name",
										required: true,
										placeholder: "Dinheiro, Negócios...",
										value: name,
										onChange: (e) => setName(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "cat-slug",
										className: "text-xs font-semibold text-foreground",
										children: "Slug"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "cat-slug",
											required: true,
											placeholder: "dinheiro",
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
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "cat-desc",
										className: "text-xs font-semibold text-foreground",
										children: "Descrição"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "cat-desc",
										placeholder: "Descrição desta categoria...",
										value: description,
										onChange: (e) => setDescription(e.target.value),
										rows: 3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
											children: "SEO da Categoria"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "cat-seotitle",
												className: "text-xs font-semibold text-foreground",
												children: "SEO Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "cat-seotitle",
												placeholder: "Deixe em branco para usar o nome",
												value: seoTitle,
												onChange: (e) => setSeoTitle(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "cat-seodesc",
												className: "text-xs font-semibold text-foreground",
												children: "SEO Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "cat-seodesc",
												placeholder: "Descrição meta para pesquisa…",
												value: seoDescription,
												onChange: (e) => setSeoDescription(e.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm text-foreground select-none cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: robotsIndex,
												onChange: (e) => setRobotsIndex(e.target.checked),
												className: "rounded border-border text-primary focus:ring-primary size-4"
											}), "Permitir indexação (index)"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: loading,
										className: "flex-1",
										children: editingId ? "Atualizar" : "Criar Categoria"
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
											className: "px-6 py-3.5",
											children: "Descrição"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3.5 text-center",
											children: "Robots"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-6 py-3.5 text-right",
											children: "Ações"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: categories.length > 0 ? categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-6 py-4 font-semibold text-foreground flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4 text-muted-foreground" }),
													" ",
													cat.name
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "px-6 py-4 text-muted-foreground font-mono text-xs",
												children: ["/categoria/", cat.slug]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-muted-foreground max-w-[200px] truncate",
												children: cat.description || "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat.robots_index ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`,
													children: cat.robots_index ? "index" : "noindex"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-6 py-4 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-end gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleEdit(cat),
														className: "rounded-lg p-2 text-primary hover:bg-primary/10 transition-colors",
														title: "Editar Categoria",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															setDeleteId(cat.id);
															setConfirmOpen(true);
														},
														className: "rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors",
														title: "Excluir Categoria",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
													})]
												})
											})
										]
									}, cat.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "px-6 py-12 text-center text-muted-foreground",
										children: "Nenhuma categoria cadastrada."
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
				title: "Deseja excluir esta categoria?",
				description: "Esta ação excluirá permanentemente esta categoria. Tenha em mente que artigos vinculados a ela ficarão sem categoria.",
				confirmText: "Excluir Categoria",
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { CategoriesManagementView as component };
