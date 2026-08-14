import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCallback, useRef, useState } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code2, Heading1, Heading2, Heading3,
  Heading4, List, ListOrdered, Quote, Minus, Link as LinkIcon, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Youtube as YoutubeIcon,
  Undo2, Redo2, RemoveFormatting, Highlighter, Palette, ChevronDown, Upload, X,
  Loader2, Type, FileText, Braces, Table2
} from "lucide-react";

const lowlight = createLowlight(common);

// ──────────────────────────────────────────────
// Post templates
// ──────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "article",
    label: "📰 Artigo Padrão",
    content: `<h2>Introdução</h2><p>Escreva a introdução do seu artigo aqui. Apresente o tema e o que o leitor vai aprender.</p><h2>Desenvolvimento</h2><p>Desenvolva o tema principal do artigo. Use subtítulos para organizar o conteúdo.</p><h3>Ponto Principal 1</h3><p>Explique o primeiro ponto importante.</p><h3>Ponto Principal 2</h3><p>Explique o segundo ponto importante.</p><h2>Conclusão</h2><p>Resuma os pontos principais e deixe uma chamada para ação.</p>`,
  },
  {
    id: "tutorial",
    label: "🛠️ Tutorial Passo a Passo",
    content: `<h2>O Que Vai Aprender</h2><p>Neste tutorial, você vai aprender como...</p><h2>Pré-requisitos</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><h2>Passo 1: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Passo 2: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Passo 3: Título do Passo</h2><p>Descrição detalhada do passo.</p><h2>Conclusão</h2><p>Parabéns! Agora você sabe como...</p>`,
  },
  {
    id: "review",
    label: "⭐ Review / Análise",
    content: `<h2>Visão Geral</h2><p>Resumo geral do produto/serviço avaliado.</p><h2>Pontos Positivos</h2><ul><li>✅ Ponto positivo 1</li><li>✅ Ponto positivo 2</li><li>✅ Ponto positivo 3</li></ul><h2>Pontos Negativos</h2><ul><li>❌ Ponto negativo 1</li><li>❌ Ponto negativo 2</li></ul><h2>Veredicto Final</h2><p>Nossa avaliação final e recomendação.</p><blockquote><p>Nota: ⭐⭐⭐⭐☆ (4/5)</p></blockquote>`,
  },
  {
    id: "list",
    label: "📋 Lista Top N",
    content: `<h2>Introdução</h2><p>Conheça as melhores opções de...</p><h2>1. Título do Item</h2><p>Descrição detalhada do item número 1.</p><h2>2. Título do Item</h2><p>Descrição detalhada do item número 2.</p><h2>3. Título do Item</h2><p>Descrição detalhada do item número 3.</p><h2>Conclusão</h2><p>Qual é a melhor opção para você?</p>`,
  },
  {
    id: "comparison",
    label: "⚖️ Comparativo",
    content: `<h2>Introdução</h2><p>Neste artigo, comparamos A versus B para ajudá-lo a escolher a melhor opção.</p><h2>Opção A</h2><p>Descrição da opção A.</p><ul><li>✅ Vantagem 1</li><li>✅ Vantagem 2</li><li>❌ Desvantagem 1</li></ul><h2>Opção B</h2><p>Descrição da opção B.</p><ul><li>✅ Vantagem 1</li><li>✅ Vantagem 2</li><li>❌ Desvantagem 1</li></ul><h2>Qual Escolher?</h2><p>Nossa recomendação final.</p>`,
  },
];

// ──────────────────────────────────────────────
// Toolbar button helper
// ──────────────────────────────────────────────
function ToolbarButton({
  onClick, active = false, disabled = false, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors
        ${active
          ? "bg-primary text-primary-foreground"
          : "text-foreground/70 hover:bg-muted hover:text-foreground"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-0.5 h-5 w-px bg-border" />;
}

// ──────────────────────────────────────────────
// Image Upload Modal
// ──────────────────────────────────────────────
function ImageUploadModal({
  onClose,
  onInsert,
}: {
  onClose: () => void;
  onInsert: (url: string, alt: string) => void;
}) {
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("media")
        .upload(`posts/${filename}`, file, { upsert: false, contentType: file.type });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
      setUrl(publicUrl);
      setPreview(publicUrl);
      toast.success("Imagem enviada com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao enviar imagem: " + (err.message || "erro desconhecido"));
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleUpload(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Inserir Imagem</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground">
            <X className="size-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${tab === "upload" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Upload className="size-4 inline mr-1.5" /> Fazer Upload
          </button>
          <button
            type="button"
            onClick={() => setTab("url")}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${tab === "url" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LinkIcon className="size-4 inline mr-1.5" /> Por URL
          </button>
        </div>

        <div className="p-6 space-y-4">
          {tab === "upload" ? (
            <>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 p-10 transition-colors hover:border-primary hover:bg-primary/5"
              >
                {uploading ? (
                  <Loader2 className="size-8 animate-spin text-primary" />
                ) : (
                  <>
                    <Upload className="size-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Clique ou arraste uma imagem</p>
                      <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WebP, GIF, SVG — máx. 10 MB</p>
                    </div>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
            </>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-foreground">URL da Imagem</label>
              <input
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setPreview(e.target.value); }}
                placeholder="https://exemplo.com/imagem.jpg"
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          )}

          {preview && (
            <div className="rounded-lg overflow-hidden border border-border aspect-video bg-muted">
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Texto Alternativo (Alt)</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Descrição da imagem para acessibilidade"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button
            type="button"
            disabled={!url || uploading}
            onClick={() => { onInsert(url, alt); onClose(); }}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Inserir Imagem
          </button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// YouTube Modal
// ──────────────────────────────────────────────
function YoutubeModal({ onClose, onInsert }: { onClose: () => void; onInsert: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Incorporar Vídeo YouTube</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground"><X className="size-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">URL do Vídeo</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">Cancelar</button>
          <button
            type="button"
            disabled={!url}
            onClick={() => { onInsert(url); onClose(); }}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
          >
            Inserir Vídeo
          </button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Link Modal
// ──────────────────────────────────────────────
function LinkModal({ onClose, onInsert, initial }: { onClose: () => void; onInsert: (url: string, text: string) => void; initial?: string }) {
  const [url, setUrl] = useState(initial || "https://");
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-semibold text-foreground">Inserir Link</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground"><X className="size-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">URL</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none" placeholder="https://" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Texto (opcional)</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none" placeholder="Texto do link..." />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Cancelar</button>
          <button type="button" disabled={!url} onClick={() => { onInsert(url, text); onClose(); }} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50">Inserir</button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main RichEditor component
// ──────────────────────────────────────────────
interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichEditor({ content, onChange, placeholder = "Comece a escrever o seu artigo..." }: RichEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Typography,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      Image.configure({ allowBase64: false, inline: false }),
      Youtube.configure({ controls: true, modestBranding: true }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-stone dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-6 text-foreground leading-relaxed",
      },
    },
  });

  const insertImage = useCallback((url: string, alt: string) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  const insertYoutube = useCallback((url: string) => {
    if (!editor) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  const insertLink = useCallback((url: string, text: string) => {
    if (!editor) return;
    if (text && editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
    }
  }, [editor]);

  // Handle image paste from clipboard
  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find(item => item.type.startsWith("image/"));
    if (!imageItem || !editor) return;
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (!file) return;
    toast.loading("A enviar imagem colada...");
    const ext = file.type.split("/")[1];
    const filename = `${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("media").upload(`posts/${filename}`, file, { contentType: file.type });
    toast.dismiss();
    if (error) { toast.error("Erro ao enviar imagem: " + error.message); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(data.path);
    editor.chain().focus().setImage({ src: publicUrl }).run();
    toast.success("Imagem inserida!");
  }, [editor]);

  const COLORS = ["#000000", "#374151", "#6b7280", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff"];
  const HIGHLIGHT_COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#f5d0fe", "#fed7aa"];

  const wordCount = editor?.storage.characterCount?.words() ?? 0;
  const charCount = editor?.storage.characterCount?.characters() ?? 0;

  if (!editor) return null;

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-sm">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border/50">
          {/* Templates */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setShowTemplates(!showTemplates); }}
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
              title="Inserir modelo de artigo"
            >
              <FileText className="size-3.5" />
              Modelos
              <ChevronDown className={`size-3 transition-transform ${showTemplates ? "rotate-180" : ""}`} />
            </button>
            {showTemplates && (
              <div className="absolute top-full left-0 z-20 mt-1 w-56 rounded-xl border border-border bg-card shadow-lg py-1.5">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().setContent(t.content).run();
                      onChange(t.content);
                      setShowTemplates(false);
                      toast.success(`Modelo "${t.label}" aplicado!`);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Divider />

          {/* Undo/Redo */}
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Desfazer (Ctrl+Z)">
            <Undo2 className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Refazer (Ctrl+Y)">
            <Redo2 className="size-4" />
          </ToolbarButton>

          <Divider />

          {/* Headings */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Título H1">
            <span className="text-xs font-extrabold">H1</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Título H2">
            <span className="text-xs font-bold">H2</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Título H3">
            <span className="text-xs font-semibold">H3</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Título H4">
            <span className="text-xs font-medium">H4</span>
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Parágrafo">
            <Type className="size-3.5" />
          </ToolbarButton>

          <Divider />

          {/* Inline marks */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Negrito (Ctrl+B)">
            <Bold className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Itálico (Ctrl+I)">
            <Italic className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Sublinhado (Ctrl+U)">
            <UnderlineIcon className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Rasurado">
            <Strikethrough className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Código inline">
            <Code2 className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Remover formatação">
            <RemoveFormatting className="size-4" />
          </ToolbarButton>

          <Divider />

          {/* Color */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setShowColorPicker(s => !s); }}
              title="Cor do texto"
              className="inline-flex size-8 items-center justify-center rounded-md text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              <Palette className="size-4" />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 z-20 mt-1 rounded-xl border border-border bg-card p-3 shadow-lg">
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cor do texto</p>
                <div className="grid grid-cols-6 gap-1.5 mb-3">
                  {COLORS.map((color) => (
                    <button key={color} type="button"
                      onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setColor(color).run(); setShowColorPicker(false); }}
                      className="size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Destaque</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button key={color} type="button"
                      onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHighlight({ color }).run(); setShowColorPicker(false); }}
                      className="size-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color }}
                      title={`Destacar em ${color}`}
                    />
                  ))}
                </div>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); setShowColorPicker(false); }} className="mt-2 w-full rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
                  Remover cor
                </button>
              </div>
            )}
          </div>

          <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} active={editor.isActive("highlight")} title="Destacar texto">
            <Highlighter className="size-4" />
          </ToolbarButton>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2">
          {/* Lists */}
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista não ordenada">
            <List className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista ordenada">
            <ListOrdered className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Citação">
            <Quote className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Bloco de código">
            <Braces className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divisor horizontal">
            <Minus className="size-4" />
          </ToolbarButton>

          <Divider />

          {/* Alignment */}
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Alinhar à esquerda">
            <AlignLeft className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Centrar">
            <AlignCenter className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Alinhar à direita">
            <AlignRight className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justificar">
            <AlignJustify className="size-4" />
          </ToolbarButton>

          <Divider />

          {/* Link / Image / YouTube */}
          <ToolbarButton onClick={() => setShowLinkModal(true)} active={editor.isActive("link")} title="Inserir link">
            <LinkIcon className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setShowImageModal(true)} title="Inserir imagem">
            <ImageIcon className="size-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setShowYoutubeModal(true)} title="Incorporar YouTube">
            <YoutubeIcon className="size-4" />
          </ToolbarButton>

          {/* Char/word count */}
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground pr-1">
            <span>{wordCount} palavras</span>
            <span>{charCount} caracteres</span>
            <span className="text-primary font-medium">~{Math.ceil(wordCount / 200)} min leitura</span>
          </div>
        </div>
      </div>



      {/* ── Editor Content ── */}
      <div onPaste={handlePaste}>
        <EditorContent editor={editor} />
      </div>

      {/* Modals */}
      {showImageModal && (
        <ImageUploadModal onClose={() => setShowImageModal(false)} onInsert={insertImage} />
      )}
      {showYoutubeModal && (
        <YoutubeModal onClose={() => setShowYoutubeModal(false)} onInsert={insertYoutube} />
      )}
      {showLinkModal && (
        <LinkModal
          onClose={() => setShowLinkModal(false)}
          onInsert={insertLink}
          initial={editor.isActive("link") ? editor.getAttributes("link").href : undefined}
        />
      )}
    </div>
  );
}
