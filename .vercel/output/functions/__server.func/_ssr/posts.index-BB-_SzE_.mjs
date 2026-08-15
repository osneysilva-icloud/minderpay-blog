import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-oP-Vwcq3.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$2, b as formatDateShort } from "./router-DaAGHLTK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Search, O as Plus, X as Globe, dt as ChevronRight, f as Trash2, ft as ChevronLeft, k as Pen, tt as Eye, yt as Archive } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as Input } from "./input-CEMa6_Eh.mjs";
import { t as ConfirmDialog } from "./ConfirmDialog-DxXTo8Jq.mjs";
import { t as POST_STATUS_LABELS } from "./admin-DjD_SmfS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts.index-BB-_SzE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var STYLES = {
	draft: "bg-muted text-muted-foreground border-border",
	published: "bg-success/15 text-success border-success/30",
	scheduled: "bg-warning/15 text-warning border-warning/30",
	archived: "bg-destructive/10 text-destructive border-destructive/30"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("font-medium", STYLES[status]),
		children: POST_STATUS_LABELS[status]
	});
}
function PostsManagementView() {
	const navigate = useNavigate();
	const { posts, total, categories, page, perPage } = Route$2.useLoaderData();
	const search = Route$2.useSearch();
	const [searchVal, setSearchVal] = (0, import_react.useState)(search.q || "");
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSearchVal(search.q || "");
	}, [search.q]);
	const updateSearch = (newParams) => {
		navigate({
			to: "/admin/posts",
			search: {
				...search,
				...newParams,
				page: 1
			}
		});
	};
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		updateSearch({ q: searchVal });
	};
	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			const { error } = await supabase.from("posts").delete().eq("id", deleteId);
			if (error) throw error;
			toast.success("Artigo excluído com sucesso.");
			setConfirmOpen(false);
			setDeleteId(null);
			navigate({
				to: "/admin/posts",
				search
			});
		} catch (err) {
			toast.error(err.message || "Erro ao excluir o artigo.");
		}
	};
	const togglePublishStatus = async (id, currentStatus) => {
		const newStatus = currentStatus === "published" ? "draft" : "published";
		try {
			const { error } = await supabase.from("posts").update({
				status: newStatus,
				published_at: newStatus === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null
			}).eq("id", id);
			if (error) throw error;
			toast.success(newStatus === "published" ? "Artigo publicado!" : "Artigo despublicado.");
			navigate({
				to: "/admin/posts",
				search
			});
		} catch (err) {
			toast.error(err.message || "Erro ao atualizar o artigo.");
		}
	};
	const totalPages = Math.ceil(total / perPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground",
					children: "Artigos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Gerencie todas as publicações de conteúdo do seu blog."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/posts/new",
					className: "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:opacity-90 self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Novo Artigo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearchSubmit,
					className: "relative w-full md:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						placeholder: "Pesquisar por título…",
						value: searchVal,
						onChange: (e) => setSearchVal(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap w-full md:w-auto items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-medium hidden sm:inline",
								children: "Categoria:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: search.category || "",
								onChange: (e) => updateSearch({ category: e.target.value || void 0 }),
								className: "h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Todas"
								}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-medium hidden sm:inline",
								children: "Status:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: search.status || "",
								onChange: (e) => updateSearch({ status: e.target.value || void 0 }),
								className: "h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Todos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "draft",
										children: "Rascunho"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "published",
										children: "Publicado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "scheduled",
										children: "Agendado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "archived",
										children: "Arquivado"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-medium hidden sm:inline",
								children: "Ordenação:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: search.sort || "newest",
								onChange: (e) => updateSearch({ sort: e.target.value || void 0 }),
								className: "h-10 rounded-lg border border-input bg-background px-3 py-1 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-auto",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "newest",
										children: "Mais recentes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "oldest",
										children: "Mais antigos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "views",
										children: "Mais visualizados"
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm whitespace-nowrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5",
									children: "Título"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5",
									children: "Categoria"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5",
									children: "Autor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5 text-center",
									children: "Leituras"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Datas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Ações"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: posts.length > 0 ? posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 font-semibold text-foreground max-w-[280px] truncate",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-muted-foreground",
										children: post.category?.name || "Sem categoria"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: post.status })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-muted-foreground",
										children: post.author?.name || "Sem autor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-center text-muted-foreground",
										children: post.view_count || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-4 text-right text-xs text-muted-foreground space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block",
											children: ["Criado: ", formatDateShort(post.published_at)]
										}), post.updated_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block italic text-[10px]",
											children: ["Atu: ", formatDateShort(post.updated_at)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => togglePublishStatus(post.id, post.status),
													className: "rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
													title: post.status === "published" ? "Despublicar Artigo" : "Publicar Artigo",
													children: post.status === "published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/blog/$slug",
													params: { slug: post.slug },
													target: "_blank",
													className: "rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
													title: "Visualizar Artigo Público",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: `/admin/posts/${post.id}`,
													className: "rounded-lg p-2 text-primary hover:bg-primary/10 transition-colors",
													title: "Editar Artigo",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setDeleteId(post.id);
														setConfirmOpen(true);
													},
													className: "rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors",
													title: "Excluir Artigo",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
												})
											]
										})
									})
								]
							}, post.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-6 py-12 text-center text-muted-foreground",
								children: "Nenhum artigo encontrado para a seleção atual."
							}) })
						})]
					})
				}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-6 py-4 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							"A mostrar ",
							posts.length,
							" de ",
							total,
							" artigos"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Paginação",
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/posts",
								search: {
									...search,
									page: Math.max(1, page - 1)
								},
								disabled: page <= 1,
								className: `inline-flex size-8 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${page <= 1 ? "opacity-40 pointer-events-none" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-xs px-2",
								children: [
									"Página ",
									page,
									" de ",
									totalPages
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/posts",
								search: {
									...search,
									page: Math.min(totalPages, page + 1)
								},
								disabled: page >= totalPages,
								className: `inline-flex size-8 items-center justify-center rounded border border-border text-foreground transition-all hover:bg-muted ${page >= totalPages ? "opacity-40 pointer-events-none" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmOpen,
				onOpenChange: setConfirmOpen,
				title: "Deseja excluir este artigo?",
				description: "Esta ação é permanente e excluirá o artigo do banco de dados definitivamente. Não poderá recuperá-lo.",
				confirmText: "Excluir Permanente",
				onConfirm: handleDelete
			})
		]
	});
}
//#endregion
export { PostsManagementView as component };
