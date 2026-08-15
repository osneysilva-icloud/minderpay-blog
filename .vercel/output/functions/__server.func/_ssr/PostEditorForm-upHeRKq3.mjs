import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CRIS042E.mjs";
import { b as require_jsx_runtime, x as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as List, D as Quote, E as Redo2, J as Image, K as Italic, M as Minus, Q as FileText, T as RemoveFormatting, U as Link, V as ListOrdered, Y as Highlighter, at as CodeXml, c as Underline, ct as CircleCheck, g as TextAlignCenter, gt as Bold, h as TextAlignEnd, ht as Braces, it as Compass, j as Palette, l as Type, m as TextAlignJustify, n as X, o as Upload, ot as Clock, p as TextAlignStart, pt as ChevronDown, r as Wifi, s as Undo2, t as Youtube, ut as CircleAlert, v as Strikethrough, w as Save, y as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./input-CEMa6_Eh.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BfBj_YIE.mjs";
import { a as slugify } from "./admin-BwVktKzv.mjs";
import { n as useEditor, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { n as index_default } from "../_libs/@tiptap/extension-link+[...].mjs";
import { n as index_default$1 } from "../_libs/tiptap__extension-underline.mjs";
import { t as index_default$2 } from "../_libs/@tiptap/extension-character-count+[...].mjs";
import { t as index_default$3 } from "../_libs/tiptap__starter-kit.mjs";
import { t as index_default$4 } from "../_libs/tiptap__extension-image.mjs";
import { t as index_default$5 } from "../_libs/tiptap__extension-placeholder.mjs";
import { t as index_default$6 } from "../_libs/tiptap__extension-youtube.mjs";
import { t as index_default$7 } from "../_libs/tiptap__extension-text-align.mjs";
import { t as index_default$8 } from "../_libs/tiptap__extension-highlight.mjs";
import { n as TextStyle, t as Color } from "../_libs/@tiptap/extension-color+[...].mjs";
import { t as index_default$9 } from "../_libs/tiptap__extension-typography.mjs";
import { t as index_default$10 } from "../_libs/@tiptap/extension-code-block-lowlight+[...].mjs";
import { n as grammars, t as createLowlight } from "../_libs/lowlight.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PostEditorForm-upHeRKq3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lowlight = createLowlight(grammars);
var TEMPLATES = [
	{
		id: "article",
		label: "📰 Artigo Padrão",
		content: `<h2>Introdução</h2><p>Escreva a introdução do seu artigo aqui. Apresente o tema e o que o leitor vai aprender.</p><h2>Desenvolvimento</h2><p>Desenvolva o tema principal do artigo. Use subtítulos para organizar o conteúdo.</p><h3>Ponto Principal 1</h3><p>Explique o primeiro ponto importante.</p><h3>Ponto Principal 2</h3><p>Explique o segundo ponto importante.</p><h2>Conclusão</h2><p>Resuma os pontos principais e deixe uma chamada para ação.</p>`
	},
	{
		id: "tutorial",
		label: "🛠️ Tutorial Passo a Passo",
		content: `<h2>O Que Vai Aprender</h2><p>Neste tutorial, você vai aprender como...</p><h2>Pré-requisitos</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><h2>Passo 1: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Passo 2: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Passo 3: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Conclusão</h2><p>Parabéns! Agora você sabe como...</p>`
	},
	{
		id: "review",
		label: "⭐ Review / Análise",
		content: `<h2>Visão Geral</h2><p>Resumo geral do produto/serviço avaliado.</p><h2>Pontos Positivos</h2><ul><li>✅ Ponto positivo 1</li><li>✅ Ponto positivo 2</li><li>✅ Ponto positivo 3</li></ul><h2>Pontos Negativos</h2><ul><li>❌ Ponto negativo 1</li><li>❌ Ponto negativo 2</li></ul><h2>Veredicto Final</h2><p>Nossa avaliação final e recomendação.</p><blockquote><p>Nota: ⭐⭐⭐⭐☆ (4/5)</p></blockquote>`
	},
	{
		id: "list",
		label: "📋 Lista Top N",
		content: `<h2>Introdução</h2><p>Conheça as melhores opções de...</p><h2>1. Título do Item</h2><p>Descrição detalhada do item número 1.</p><h2>2. Título do Item</h2><p>Descrição detalhada do item número 2.</p><h2>3. Título do Item</h2><p>Descrição detalhada do item número 3.</p><h2>Conclusão</h2><p>Qual é a melhor opção para você?</p>`
	},
	{
		id: "comparison",
		label: "⚖️ Comparativo",
		content: `<h2>Introdução</h2><p>Neste artigo, comparamos A versus B para ajudá-lo a escolher a melhor opção.</p><h2>Opção A</h2><p>Descrição da opção A.</p><ul><li>✅ Vantagem 1</li><li>✅ Vantagem 2</li><li>❌ Desvantagem 1</li></ul><h2>Opção B</h2><p>Descrição da opção B.</p><ul><li>✅ Vantagem 1</li><li>✅ Vantagem 2</li><li>❌ Desvantagem 1</li></ul><h2>Qual Escolher?</h2><p>Nossa recomendação final.</p>`
	}
];
function ToolbarButton({ onClick, active = false, disabled = false, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onMouseDown: (e) => {
			e.preventDefault();
			onClick();
		},
		disabled,
		title,
		className: `inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors
        ${active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `,
		children
	});
}
function Divider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-0.5 h-5 w-px bg-border" });
}
function ImageUploadModal({ onClose, onInsert }) {
	const [tab, setTab] = (0, import_react.useState)("upload");
	const [url, setUrl] = (0, import_react.useState)("");
	const [alt, setAlt] = (0, import_react.useState)("");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	const handleUpload = async (file) => {
		if (!file) return;
		setUploading(true);
		try {
			const ext = file.name.split(".").pop();
			const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
			const { data, error } = await supabase.storage.from("media").upload(`posts/${filename}`, file, {
				upsert: false,
				contentType: file.type
			});
			if (error) throw error;
			const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
			setUrl(publicUrl);
			setPreview(publicUrl);
			toast.success("Imagem enviada com sucesso!");
		} catch (err) {
			toast.error("Erro ao enviar imagem: " + (err.message || "erro desconhecido"));
		} finally {
			setUploading(false);
		}
	};
	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) handleUpload(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-foreground",
						children: "Inserir Imagem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg p-1.5 hover:bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab("upload"),
						className: `flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${tab === "upload" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 inline mr-1.5" }), " Fazer Upload"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab("url"),
						className: `flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${tab === "url" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "size-4 inline mr-1.5" }), " Por URL"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [
						tab === "upload" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							onDrop: handleDrop,
							onDragOver: (e) => e.preventDefault(),
							onClick: () => fileRef.current?.click(),
							className: "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-10 transition-colors hover:border-primary hover:bg-primary/5",
							children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-8 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-foreground",
									children: "Clique ou arraste uma imagem"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "JPG, PNG, WebP, GIF, SVG — máx. 10 MB"
								})]
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) handleUpload(file);
							}
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "URL da Imagem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "url",
								value: url,
								onChange: (e) => {
									setUrl(e.target.value);
									setPreview(e.target.value);
								},
								placeholder: "https://exemplo.com/imagem.jpg",
								className: "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
							})]
						}),
						preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg overflow-hidden border border-border aspect-video bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: preview,
								alt: "Preview",
								className: "w-full h-full object-contain"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Texto Alternativo (Alt)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: alt,
								onChange: (e) => setAlt(e.target.value),
								placeholder: "Descrição da imagem para acessibilidade",
								className: "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !url || uploading,
						onClick: () => {
							onInsert(url, alt);
							onClose();
						},
						className: "rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
						children: "Inserir Imagem"
					})]
				})
			]
		})
	});
}
function YoutubeModal({ onClose, onInsert }) {
	const [url, setUrl] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-foreground",
						children: "Incorporar Vídeo YouTube"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg p-1.5 hover:bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "URL do Vídeo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "url",
							value: url,
							onChange: (e) => setUrl(e.target.value),
							placeholder: "https://www.youtube.com/watch?v=...",
							className: "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !url,
						onClick: () => {
							onInsert(url);
							onClose();
						},
						className: "rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50",
						children: "Inserir Vídeo"
					})]
				})
			]
		})
	});
}
function LinkModal({ onClose, onInsert, initial }) {
	const [url, setUrl] = (0, import_react.useState)(initial || "https://");
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-foreground",
						children: "Inserir Link"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg p-1.5 hover:bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "url",
							value: url,
							onChange: (e) => setUrl(e.target.value),
							className: "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none",
							placeholder: "https://"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-foreground",
							children: "Texto (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: text,
							onChange: (e) => setText(e.target.value),
							className: "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none",
							placeholder: "Texto do link..."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-end gap-2 border-t border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !url,
						onClick: () => {
							onInsert(url, text);
							onClose();
						},
						className: "rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50",
						children: "Inserir"
					})]
				})
			]
		})
	});
}
function RichEditor({ content, onChange, placeholder = "Comece a escrever o seu artigo..." }) {
	const [showImageModal, setShowImageModal] = (0, import_react.useState)(false);
	const [showYoutubeModal, setShowYoutubeModal] = (0, import_react.useState)(false);
	const [showLinkModal, setShowLinkModal] = (0, import_react.useState)(false);
	const [showTemplates, setShowTemplates] = (0, import_react.useState)(false);
	const [showColorPicker, setShowColorPicker] = (0, import_react.useState)(false);
	const editor = useEditor({
		extensions: [
			index_default$3.configure({
				codeBlock: false,
				heading: { levels: [
					1,
					2,
					3,
					4
				] }
			}),
			index_default$1,
			TextStyle,
			Color,
			index_default$8.configure({ multicolor: true }),
			index_default$9,
			index_default$7.configure({ types: ["heading", "paragraph"] }),
			index_default.configure({
				openOnClick: false,
				autolink: true,
				linkOnPaste: true
			}),
			index_default$4.configure({
				allowBase64: false,
				inline: false
			}),
			index_default$6.configure({
				controls: true,
				modestBranding: true
			}),
			index_default$5.configure({ placeholder }),
			index_default$2,
			index_default$10.configure({ lowlight })
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: { attributes: { class: "prose prose-stone dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-6 text-foreground leading-relaxed" } }
	});
	const insertImage = (0, import_react.useCallback)((url, alt) => {
		if (!editor) return;
		editor.chain().focus().setImage({
			src: url,
			alt
		}).run();
	}, [editor]);
	const insertYoutube = (0, import_react.useCallback)((url) => {
		if (!editor) return;
		editor.chain().focus().setYoutubeVideo({ src: url }).run();
	}, [editor]);
	const insertLink = (0, import_react.useCallback)((url, text) => {
		if (!editor) return;
		if (text && editor.state.selection.empty) editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
		else editor.chain().focus().setLink({
			href: url,
			target: "_blank"
		}).run();
	}, [editor]);
	const handlePaste = (0, import_react.useCallback)(async (e) => {
		const imageItem = Array.from(e.clipboardData.items).find((item) => item.type.startsWith("image/"));
		if (!imageItem || !editor) return;
		e.preventDefault();
		const file = imageItem.getAsFile();
		if (!file) return;
		toast.loading("A enviar imagem colada...");
		const ext = file.type.split("/")[1];
		const filename = `${Date.now()}.${ext}`;
		const { data, error } = await supabase.storage.from("media").upload(`posts/${filename}`, file, { contentType: file.type });
		toast.dismiss();
		if (error) {
			toast.error("Erro ao enviar imagem: " + error.message);
			return;
		}
		const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
		editor.chain().focus().setImage({ src: publicUrl }).run();
		toast.success("Imagem inserida!");
	}, [editor]);
	const COLORS = [
		"#000000",
		"#374151",
		"#6b7280",
		"#ef4444",
		"#f97316",
		"#eab308",
		"#22c55e",
		"#06b6d4",
		"#3b82f6",
		"#8b5cf6",
		"#ec4899",
		"#ffffff"
	];
	const HIGHLIGHT_COLORS = [
		"#fef08a",
		"#bbf7d0",
		"#bfdbfe",
		"#fecaca",
		"#f5d0fe",
		"#fed7aa"
	];
	const wordCount = editor?.storage.characterCount?.words() ?? 0;
	const charCount = editor?.storage.characterCount?.characters() ?? 0;
	if (!editor) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onMouseDown: (e) => {
									e.preventDefault();
									setShowTemplates(!showTemplates);
								},
								className: "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold text-foreground/70 hover:bg-muted hover:text-foreground transition-colors",
								title: "Inserir modelo de artigo",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }),
									"Modelos",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-3 transition-transform ${showTemplates ? "rotate-180" : ""}` })
								]
							}), showTemplates && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-full left-0 z-20 mt-1 w-56 rounded-xl border border-border bg-card shadow-lg py-1.5",
								children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onMouseDown: (e) => {
										e.preventDefault();
										editor.chain().focus().setContent(t.content).run();
										onChange(t.content);
										setShowTemplates(false);
										toast.success(`Modelo "${t.label}" aplicado!`);
									},
									className: "w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors",
									children: t.label
								}, t.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().undo().run(),
							disabled: !editor.can().undo(),
							title: "Desfazer (Ctrl+Z)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().redo().run(),
							disabled: !editor.can().redo(),
							title: "Refazer (Ctrl+Y)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
							active: editor.isActive("heading", { level: 1 }),
							title: "Título H1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-extrabold",
								children: "H1"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
							active: editor.isActive("heading", { level: 2 }),
							title: "Título H2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								children: "H2"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
							active: editor.isActive("heading", { level: 3 }),
							title: "Título H3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold",
								children: "H3"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
							active: editor.isActive("heading", { level: 4 }),
							title: "Título H4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: "H4"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setParagraph().run(),
							active: editor.isActive("paragraph"),
							title: "Parágrafo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleBold().run(),
							active: editor.isActive("bold"),
							title: "Negrito (Ctrl+B)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleItalic().run(),
							active: editor.isActive("italic"),
							title: "Itálico (Ctrl+I)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleUnderline().run(),
							active: editor.isActive("underline"),
							title: "Sublinhado (Ctrl+U)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Underline, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleStrike().run(),
							active: editor.isActive("strike"),
							title: "Rasurado",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strikethrough, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleCode().run(),
							active: editor.isActive("code"),
							title: "Código inline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().unsetAllMarks().run(),
							title: "Remover formatação",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemoveFormatting, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onMouseDown: (e) => {
									e.preventDefault();
									setShowColorPicker((s) => !s);
								},
								title: "Cor do texto",
								className: "inline-flex size-8 items-center justify-center rounded-md text-foreground/70 hover:bg-muted hover:text-foreground transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" })
							}), showColorPicker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-full left-0 z-20 mt-1 rounded-xl border border-border bg-card p-3 shadow-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Cor do texto"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-6 gap-1.5 mb-3",
										children: COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onMouseDown: (e) => {
												e.preventDefault();
												editor.chain().focus().setColor(color).run();
												setShowColorPicker(false);
											},
											className: "size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110",
											style: { backgroundColor: color },
											title: color
										}, color))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Destaque"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-6 gap-1.5",
										children: HIGHLIGHT_COLORS.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onMouseDown: (e) => {
												e.preventDefault();
												editor.chain().focus().toggleHighlight({ color }).run();
												setShowColorPicker(false);
											},
											className: "size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110",
											style: { backgroundColor: color },
											title: `Destacar em ${color}`
										}, color))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onMouseDown: (e) => {
											e.preventDefault();
											editor.chain().focus().unsetColor().run();
											setShowColorPicker(false);
										},
										className: "mt-2 w-full rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors",
										children: "Remover cor"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run(),
							active: editor.isActive("highlight"),
							title: "Destacar texto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlighter, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-0.5 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleBulletList().run(),
							active: editor.isActive("bulletList"),
							title: "Lista não ordenada",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleOrderedList().run(),
							active: editor.isActive("orderedList"),
							title: "Lista ordenada",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleBlockquote().run(),
							active: editor.isActive("blockquote"),
							title: "Citação",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().toggleCodeBlock().run(),
							active: editor.isActive("codeBlock"),
							title: "Bloco de código",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setHorizontalRule().run(),
							title: "Divisor horizontal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setTextAlign("left").run(),
							active: editor.isActive({ textAlign: "left" }),
							title: "Alinhar à esquerda",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignStart, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setTextAlign("center").run(),
							active: editor.isActive({ textAlign: "center" }),
							title: "Centrar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignCenter, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setTextAlign("right").run(),
							active: editor.isActive({ textAlign: "right" }),
							title: "Alinhar à direita",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignEnd, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => editor.chain().focus().setTextAlign("justify").run(),
							active: editor.isActive({ textAlign: "justify" }),
							title: "Justificar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignJustify, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => setShowLinkModal(true),
							active: editor.isActive("link"),
							title: "Inserir link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => setShowImageModal(true),
							title: "Inserir imagem",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							onClick: () => setShowYoutubeModal(true),
							title: "Incorporar YouTube",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3 text-xs text-muted-foreground pr-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [wordCount, " palavras"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [charCount, " caracteres"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-medium",
									children: [
										"~",
										Math.ceil(wordCount / 200),
										" min leitura"
									]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onPaste: handlePaste,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, { editor })
			}),
			showImageModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadModal, {
				onClose: () => setShowImageModal(false),
				onInsert: insertImage
			}),
			showYoutubeModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YoutubeModal, {
				onClose: () => setShowYoutubeModal(false),
				onInsert: insertYoutube
			}),
			showLinkModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkModal, {
				onClose: () => setShowLinkModal(false),
				onInsert: insertLink,
				initial: editor.isActive("link") ? editor.getAttributes("link").href : void 0
			})
		]
	});
}
/**
* useAutosave – Real-time database autosave hook for the post editor.
*
* Strategy:
*  - Debounce: saves to Supabase 5 seconds after the user stops typing.
*  - Heartbeat: forces a save every 15 seconds regardless, so no more than
*    15 seconds of work is ever lost even if the user types continuously.
*  - localStorage backup: also mirrors to localStorage as an offline fallback.
*  - Returns { status, lastSavedAt } so the UI can show a live indicator.
*/
var DEBOUNCE_MS = 5e3;
var HEARTBEAT_MS = 15e3;
function useAutosave({ postId, storageKey, payload, enabled }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [lastSavedAt, setLastSavedAt] = (0, import_react.useState)(null);
	const debounceRef = (0, import_react.useRef)(null);
	const heartbeatRef = (0, import_react.useRef)(null);
	const pendingRef = (0, import_react.useRef)(false);
	const payloadRef = (0, import_react.useRef)(payload);
	(0, import_react.useEffect)(() => {
		payloadRef.current = payload;
	});
	const persistToDb = (0, import_react.useCallback)(async () => {
		if (!postId) return;
		const p = payloadRef.current;
		if (!p.title && !p.content) return;
		setStatus("saving");
		try {
			const { error } = await supabase.from("posts").update({
				title: p.title || null,
				slug: p.slug || null,
				subtitle: p.subtitle || null,
				excerpt: p.excerpt || null,
				content: p.content || null,
				featured_image: p.featuredImage || null,
				featured_image_alt: p.featuredImageAlt || null,
				category_id: p.categoryId || null,
				author_id: p.authorId || null,
				seo_title: p.seoTitle || null,
				seo_description: p.seoDescription || null,
				primary_keyword: p.primaryKeyword || null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", postId);
			if (error) throw error;
			setLastSavedAt(/* @__PURE__ */ new Date());
			setStatus("saved");
			pendingRef.current = false;
			localStorage.setItem(storageKey, JSON.stringify({
				...p,
				autosavedAt: Date.now()
			}));
		} catch (err) {
			console.warn("[Autosave] DB save failed:", err);
			setStatus("error");
			try {
				localStorage.setItem(storageKey, JSON.stringify({
					...payloadRef.current,
					autosavedAt: Date.now()
				}));
			} catch {}
		}
		setTimeout(() => setStatus((s) => s === "saved" ? "idle" : s), 3e3);
	}, [postId, storageKey]);
	const persistToLocalStorage = (0, import_react.useCallback)(() => {
		const p = payloadRef.current;
		if (!p.title && !p.content) return;
		try {
			localStorage.setItem(storageKey, JSON.stringify({
				...p,
				autosavedAt: Date.now()
			}));
		} catch {}
	}, [storageKey]);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		setStatus("pending");
		pendingRef.current = true;
		persistToLocalStorage();
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			persistToDb();
		}, DEBOUNCE_MS);
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [
		payload.title,
		payload.slug,
		payload.subtitle,
		payload.excerpt,
		payload.content,
		payload.featuredImage,
		payload.featuredImageAlt,
		payload.categoryId,
		payload.authorId,
		payload.status,
		payload.seoTitle,
		payload.seoDescription,
		payload.primaryKeyword,
		enabled
	]);
	(0, import_react.useEffect)(() => {
		if (!enabled || !postId) return;
		heartbeatRef.current = setInterval(() => {
			if (pendingRef.current) persistToDb();
		}, HEARTBEAT_MS);
		return () => {
			if (heartbeatRef.current) clearInterval(heartbeatRef.current);
		};
	}, [
		enabled,
		postId,
		persistToDb
	]);
	(0, import_react.useEffect)(() => {
		const handleBeforeUnload = (e) => {
			if (pendingRef.current) {
				persistToLocalStorage();
				e.preventDefault();
				e.returnValue = "Existem alterações não guardadas. Tem a certeza que quer sair?";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [persistToLocalStorage]);
	return {
		status,
		lastSavedAt
	};
}
function PostEditorForm({ postId, initialData, onSave, loading }) {
	const isEdit = !!postId;
	const storageKey = `minderpay_autosave_${postId || "new"}`;
	const [title, setTitle] = (0, import_react.useState)(initialData?.title || "");
	const [slug, setSlug] = (0, import_react.useState)(initialData?.slug || "");
	const [slugManuallyEdited, setSlugManuallyEdited] = (0, import_react.useState)(!!initialData?.slug);
	const [subtitle, setSubtitle] = (0, import_react.useState)(initialData?.subtitle || "");
	const [excerpt, setExcerpt] = (0, import_react.useState)(initialData?.excerpt || "");
	const [content, setContent] = (0, import_react.useState)(initialData?.content || "");
	const [featuredImage, setFeaturedImage] = (0, import_react.useState)(initialData?.featured_image || "");
	const [featuredImageAlt, setFeaturedImageAlt] = (0, import_react.useState)(initialData?.featured_image_alt || "");
	const [categoryId, setCategoryId] = (0, import_react.useState)(initialData?.category_id || "");
	const [authorId, setAuthorId] = (0, import_react.useState)(initialData?.author_id || "");
	const [status, setStatus] = (0, import_react.useState)(initialData?.status || "draft");
	const [publishedAt, setPublishedAt] = (0, import_react.useState)(initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : "");
	const [allTags, setAllTags] = (0, import_react.useState)([]);
	const [selectedTagIds, setSelectedTagIds] = (0, import_react.useState)((initialData?.post_tags ?? []).map((pt) => pt.tag_id ?? pt.id ?? pt));
	const [newTagName, setNewTagName] = (0, import_react.useState)("");
	const [seoTitle, setSeoTitle] = (0, import_react.useState)(initialData?.seo_title || "");
	const [seoDescription, setSeoDescription] = (0, import_react.useState)(initialData?.seo_description || "");
	const [canonicalUrl, setCanonicalUrl] = (0, import_react.useState)(initialData?.canonical_url || "");
	const [robotsIndex, setRobotsIndex] = (0, import_react.useState)(initialData?.robots_index ?? true);
	const [robotsFollow, setRobotsFollow] = (0, import_react.useState)(initialData?.robots_follow ?? true);
	const [ogTitle, setOgTitle] = (0, import_react.useState)(initialData?.og_title || "");
	const [ogDescription, setOgDescription] = (0, import_react.useState)(initialData?.og_description || "");
	const [ogImage, setOgImage] = (0, import_react.useState)(initialData?.og_image || "");
	const [primaryKeyword, setPrimaryKeyword] = (0, import_react.useState)(initialData?.primary_keyword || "");
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [authors, setAuthors] = (0, import_react.useState)([]);
	const [showSeo, setShowSeo] = (0, import_react.useState)(false);
	const [uploadingFeatured, setUploadingFeatured] = (0, import_react.useState)(false);
	const { status: autosaveStatus, lastSavedAt } = useAutosave({
		postId,
		storageKey,
		payload: (0, import_react.useMemo)(() => ({
			title,
			slug,
			subtitle,
			excerpt,
			content,
			featuredImage,
			featuredImageAlt,
			categoryId,
			authorId,
			status,
			seoTitle,
			seoDescription,
			primaryKeyword
		}), [
			title,
			slug,
			subtitle,
			excerpt,
			content,
			featuredImage,
			featuredImageAlt,
			categoryId,
			authorId,
			status,
			seoTitle,
			seoDescription,
			primaryKeyword
		]),
		enabled: !!(title || content)
	});
	(0, import_react.useEffect)(() => {
		supabase.from("categories").select("id,name").order("name").then(({ data }) => {
			setCategories(data || []);
			if (!categoryId && data?.length) setCategoryId(data[0].id);
		});
		supabase.from("authors").select("id,name").order("name").then(({ data }) => {
			setAuthors(data || []);
			if (!authorId && data?.length) setAuthorId(data[0].id);
		});
		supabase.from("tags").select("id,name").order("name").then(({ data }) => {
			setAllTags(data || []);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(storageKey);
		if (!saved) return;
		try {
			const parsed = JSON.parse(saved);
			if ((parsed.autosavedAt || 0) > (initialData?.updated_at ? new Date(initialData.updated_at).getTime() : 0) && (parsed.title || parsed.content)) toast("Encontrámos um rascunho local não guardado.", {
				duration: 1e4,
				action: {
					label: "Recuperar",
					onClick: () => {
						setTitle(parsed.title || "");
						setSlug(parsed.slug || "");
						setSubtitle(parsed.subtitle || "");
						setExcerpt(parsed.excerpt || "");
						setContent(parsed.content || "");
						setFeaturedImage(parsed.featuredImage || "");
						setFeaturedImageAlt(parsed.featuredImageAlt || "");
						setCategoryId(parsed.categoryId || "");
						setAuthorId(parsed.authorId || "");
						setStatus(parsed.status || "draft");
						setSeoTitle(parsed.seoTitle || "");
						setSeoDescription(parsed.seoDescription || "");
						setPrimaryKeyword(parsed.primaryKeyword || "");
						toast.success("Rascunho recuperado.");
					}
				}
			});
		} catch {}
	}, [initialData]);
	const handleTitleChange = (val) => {
		setTitle(val);
		if (!slugManuallyEdited) setSlug(slugify(val));
	};
	const generateSlug = () => {
		if (!title) return;
		const generated = slugify(title);
		setSlug(generated);
		setSlugManuallyEdited(false);
	};
	const handleFeaturedImageUpload = async (file) => {
		if (!file) return;
		setUploadingFeatured(true);
		try {
			const ext = file.name.split(".").pop();
			const filename = `featured/${Date.now()}.${ext}`;
			const { data, error } = await supabase.storage.from("media").upload(filename, file, {
				upsert: false,
				contentType: file.type
			});
			if (error) throw error;
			const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
			setFeaturedImage(publicUrl);
			toast.success("Imagem destacada enviada!");
		} catch (err) {
			toast.error("Erro ao enviar: " + err.message);
		} finally {
			setUploadingFeatured(false);
		}
	};
	const toggleTag = (tagId) => {
		setSelectedTagIds((prev) => prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]);
	};
	const createTag = async () => {
		if (!newTagName.trim()) return;
		const slugTag = slugify(newTagName);
		const { data, error } = await supabase.from("tags").insert({
			name: newTagName.trim(),
			slug: slugTag
		}).select("id,name").single();
		if (error) {
			toast.error("Erro ao criar tag: " + error.message);
			return;
		}
		setAllTags((prev) => [...prev, data]);
		setSelectedTagIds((prev) => [...prev, data.id]);
		setNewTagName("");
		toast.success(`Tag "${data.name}" criada!`);
	};
	const handleSaveSubmit = (e) => {
		e.preventDefault();
		if (!title) {
			toast.error("O título é obrigatório.");
			return;
		}
		const finalSlug = slugify(slug || title);
		if (!finalSlug) {
			toast.error("O slug (URL) é obrigatório.");
			return;
		}
		onSave({
			title,
			slug: finalSlug,
			subtitle: subtitle || null,
			excerpt: excerpt || null,
			content,
			featured_image: featuredImage || null,
			featured_image_alt: featuredImageAlt || null,
			category_id: categoryId || null,
			author_id: authorId || null,
			status,
			reading_time: Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)),
			seo_title: seoTitle || null,
			seo_description: seoDescription || null,
			canonical_url: canonicalUrl || null,
			robots_index: robotsIndex,
			robots_follow: robotsFollow,
			og_title: ogTitle || null,
			og_description: ogDescription || null,
			og_image: ogImage || null,
			primary_keyword: primaryKeyword || null,
			published_at: status === "published" ? initialData?.published_at || (/* @__PURE__ */ new Date()).toISOString() : status === "scheduled" && publishedAt ? new Date(publishedAt).toISOString() : null,
			_tag_ids: selectedTagIds
		}).then(() => {
			localStorage.removeItem(storageKey);
		});
	};
	const previewTitle = seoTitle || title || "Título do Artigo";
	const previewDesc = seoDescription || excerpt || "Descrição do artigo aparece aqui para o utilizador que pesquisa no Google...";
	const previewSlug = slug ? `minderpay.com/blog/${slug}` : "minderpay.com/blog/slug-do-artigo";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSaveSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground",
					children: isEdit ? "Editar Artigo" : "Novo Artigo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-2 text-xs",
					children: [
						autosaveStatus === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-amber-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 animate-pulse" }), " A preparar guardamento automático…"]
						}),
						autosaveStatus === "saving" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-blue-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 animate-spin rounded-full border border-blue-400 border-t-transparent" }), postId ? "A guardar na base de dados…" : "A guardar rascunho local…"]
						}),
						autosaveStatus === "saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-green-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), postId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Guardado na BD ", lastSavedAt ? `às ${lastSavedAt.toLocaleTimeString("pt-PT", {
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit"
							})}` : ""] }) : "Rascunho local guardado"]
						}),
						autosaveStatus === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-red-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" }), " Falha no guardamento — guardado localmente como backup"]
						}),
						autosaveStatus === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3" }),
								" ",
								postId ? "Guardamento automático ativo (a cada 15s)" : "Novo artigo — será guardado automaticamente"
							]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: status,
						onChange: (e) => setStatus(e.target.value),
						className: "h-10 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "draft",
								children: "Rascunho"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "published",
								children: "Publicar agora"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "scheduled",
								children: "Agendar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "archived",
								children: "Arquivado"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: loading,
						className: "gap-2 h-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }),
							" ",
							loading ? "A guardar…" : "Guardar"
						]
					})]
				})]
			}),
			status === "scheduled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-semibold text-foreground",
					children: "Data e hora de publicação"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "datetime-local",
					value: publishedAt,
					onChange: (e) => setPublishedAt(e.target.value),
					className: "mt-2 max-w-xs"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border border-border shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Título do Artigo *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											required: true,
											placeholder: "Escreva um título apelativo…",
											value: title,
											onChange: (e) => handleTitleChange(e.target.value),
											className: "text-base font-semibold h-12"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Slug (URL)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex items-center text-xs text-muted-foreground bg-muted border border-border px-3 rounded-lg select-none shrink-0",
													children: "minderpay.com/blog/"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													required: true,
													placeholder: "como-ganhar-dinheiro-online",
													value: slug,
													onChange: (e) => {
														setSlug(e.target.value);
														setSlugManuallyEdited(true);
													},
													className: "flex-1 font-mono text-sm"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "outline",
													onClick: generateSlug,
													title: "Gerar slug a partir do título",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Subtítulo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Subtítulo ou lead da notícia…",
											value: subtitle,
											onChange: (e) => setSubtitle(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Excerto (resumo curto para listagens)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											placeholder: "Breve resumo exibido nos cards do blog e nas meta tags de redes sociais…",
											value: excerpt,
											onChange: (e) => setExcerpt(e.target.value),
											rows: 2
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Conteúdo do Artigo *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichEditor, {
								content,
								onChange: setContent,
								placeholder: "Comece a escrever ou escolha um modelo acima…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowSeo(!showSeo),
								className: "w-full flex items-center justify-between p-6 font-semibold text-foreground text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 font-[family-name:var(--font-display)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-5 text-primary" }), " SEO & Open Graph"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-5 text-muted-foreground transition-transform ${showSeo ? "rotate-180" : ""}` })]
							}), showSeo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "px-6 pb-6 space-y-5 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border bg-white dark:bg-gray-900 p-4 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
												children: "Pré-visualização Google"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-green-700 dark:text-green-400 truncate",
												children: previewSlug
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-base text-blue-700 dark:text-blue-400 font-medium truncate leading-snug",
												children: [previewTitle.slice(0, 60), previewTitle.length > 60 ? "…" : ""]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed",
												children: [previewDesc.slice(0, 160), previewDesc.length > 160 ? "…" : ""]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-semibold text-foreground",
														children: "Meta Title"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: `text-xs ${seoTitle.length > 60 ? "text-red-500" : "text-muted-foreground"}`,
														children: [seoTitle.length, "/60"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Deixe em branco para usar o título",
													value: seoTitle,
													onChange: (e) => setSeoTitle(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1 rounded-full bg-border overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-full rounded-full transition-all ${seoTitle.length > 60 ? "bg-red-500" : seoTitle.length > 45 ? "bg-yellow-500" : "bg-green-500"}`,
														style: { width: `${Math.min(100, seoTitle.length / 60 * 100)}%` }
													})
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-semibold text-foreground",
														children: "Meta Description"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: `text-xs ${seoDescription.length > 160 ? "text-red-500" : "text-muted-foreground"}`,
														children: [seoDescription.length, "/160"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Deixe em branco para usar o excerto",
													value: seoDescription,
													onChange: (e) => setSeoDescription(e.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-1 rounded-full bg-border overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-full rounded-full transition-all ${seoDescription.length > 160 ? "bg-red-500" : seoDescription.length > 130 ? "bg-yellow-500" : "bg-green-500"}`,
														style: { width: `${Math.min(100, seoDescription.length / 160 * 100)}%` }
													})
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-semibold text-foreground",
												children: "Palavra-chave Principal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "ex: marketing digital",
												value: primaryKeyword,
												onChange: (e) => setPrimaryKeyword(e.target.value)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-semibold text-foreground",
												children: "Canonical URL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "https://minderpay.com/blog/...",
												value: canonicalUrl,
												onChange: (e) => setCanonicalUrl(e.target.value)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm select-none cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: robotsIndex,
												onChange: (e) => setRobotsIndex(e.target.checked),
												className: "size-4 rounded border-border text-primary"
											}), "Permitir indexação"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm select-none cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: robotsFollow,
												onChange: (e) => setRobotsFollow(e.target.checked),
												className: "size-4 rounded border-border text-primary"
											}), "Seguir links"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-border/60 pt-4 space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
												children: "Open Graph (Redes Sociais)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-semibold text-foreground",
														children: "Título OG"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "Título para Facebook/Instagram…",
														value: ogTitle,
														onChange: (e) => setOgTitle(e.target.value)
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-xs font-semibold text-foreground",
														children: "Descrição OG"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "Descrição para redes sociais…",
														value: ogDescription,
														onChange: (e) => setOgDescription(e.target.value)
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-xs font-semibold text-foreground",
													children: "URL da Imagem OG"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "https://...",
													value: ogImage,
													onChange: (e) => setOgImage(e.target.value)
												})]
											})
										]
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "font-[family-name:var(--font-display)] text-base font-bold",
									children: "Publicação"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-foreground",
										children: "Categoria"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: categoryId,
										onChange: (e) => setCategoryId(e.target.value),
										className: "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Sem categoria"
										}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.id,
											children: c.name
										}, c.id))]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-foreground",
										children: "Autor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: authorId,
										onChange: (e) => setAuthorId(e.target.value),
										className: "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Sem autor"
										}), authors.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: a.id,
											children: a.name
										}, a.id))]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "font-[family-name:var(--font-display)] text-base font-bold",
									children: "Tags"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [allTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleTag(tag.id),
										className: `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all border ${selectedTagIds.includes(tag.id) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
										children: [selectedTagIds.includes(tag.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-1",
											children: "✓"
										}), tag.name]
									}, tag.id)), allTags.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Nenhuma tag criada ainda."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: newTagName,
										onChange: (e) => setNewTagName(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												createTag();
											}
										},
										placeholder: "Nova tag…",
										className: "h-8 flex-1 rounded-lg border border-border bg-background px-3 text-xs focus:border-primary focus:outline-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: createTag,
										disabled: !newTagName.trim(),
										className: "h-8 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
										children: "+ Criar"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border border-border shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "pb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "font-[family-name:var(--font-display)] text-base font-bold",
									children: "Imagem Destacada"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:border-primary hover:bg-primary/5",
										onDrop: (e) => {
											e.preventDefault();
											const file = e.dataTransfer.files[0];
											if (file?.type.startsWith("image/")) handleFeaturedImageUpload(file);
										},
										onDragOver: (e) => e.preventDefault(),
										children: [uploadingFeatured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" }), "A enviar…"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground text-center",
											children: [
												"Clique ou arraste uma imagem",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												"JPG, PNG, WebP — máx. 10 MB"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "hidden",
											onChange: (e) => {
												const file = e.target.files?.[0];
												if (file) handleFeaturedImageUpload(file);
											}
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Ou cole a URL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "https://...",
											value: featuredImage,
											onChange: (e) => setFeaturedImage(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Texto alternativo (Alt)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Descrição acessível da imagem…",
											value: featuredImageAlt,
											onChange: (e) => setFeaturedImageAlt(e.target.value)
										})]
									}),
									featuredImage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative rounded-xl overflow-hidden border border-border aspect-video bg-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: featuredImage,
											alt: "Pré-visualização",
											className: "w-full h-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setFeaturedImage(""),
											className: "absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "size-3.5",
												fill: "none",
												viewBox: "0 0 24 24",
												stroke: "currentColor",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													strokeLinecap: "round",
													strokeLinejoin: "round",
													strokeWidth: 2,
													d: "M6 18L18 6M6 6l12 12"
												})
											})
										})]
									})
								]
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { PostEditorForm as t };
