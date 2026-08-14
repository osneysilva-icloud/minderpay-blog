import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { uploadMediaFile, deleteMediaFile, bytesToSize } from "@/lib/admin";
import { Copy, Trash2, Upload, FileImage, ExternalLink, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/media")({
  loader: async () => {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  },
  component: MediaLibraryView,
});

function MediaLibraryView() {
  const navigate = useNavigate();
  const mediaItems = Route.useLoaderData();

  // Upload fields
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // Dialog fields
  const [deleteItem, setDeleteItem] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      // Pre-fill alt text using file name
      const name = e.target.files[0].name.replace(/\.[a-zA-Z0-9]+$/, "");
      setAltText(name);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
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
        description: description || undefined,
        uploadedBy: session?.session?.user?.id || null,
      });

      toast.success("Imagem enviada e otimizada com sucesso!");
      setFile(null);
      setAltText("");
      setDescription("");
      // Reset input element
      const fileInput = document.getElementById("media-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      void navigate({ to: "/admin/media" });
    } catch (err: any) {
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
      void navigate({ to: "/admin/media" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir imagem.");
    }
  };

  const copyToClipboard = (url: string) => {
    // Generate absolute path or relative
    // If Supabase URL is mapped locally, public_url contains /api/public/media/storage_path
    // We can copy the absolute or relative path
    const absolute = window.location.origin + url;
    navigator.clipboard.writeText(absolute);
    toast.success("URL absoluta da imagem copiada!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Biblioteca de Mídia
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Carregue e organize as imagens dos artigos. Conversão automática para WebP e compressão ativas.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Upload Panel */}
        <div className="lg:col-span-1">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5">
              <h2 className="font-semibold text-foreground text-sm border-b border-border pb-3 mb-4">
                Enviar Imagem
              </h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="media-file" className="text-xs font-semibold text-foreground">Ficheiro de Imagem</label>
                  <Input
                    id="media-file"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Formatos: JPG, PNG, WEBP, SVG, GIF (máx. 5MB).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="media-alt" className="text-xs font-semibold text-foreground">Texto Alternativo (Alt Text)</label>
                  <Input
                    id="media-alt"
                    required
                    placeholder="Descrição da imagem para acessibilidade…"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="media-desc" className="text-xs font-semibold text-foreground">Descrição (Opcional)</label>
                  <Input
                    id="media-desc"
                    placeholder="Onde será usada esta imagem…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={uploading}
                  />
                </div>

                <Button type="submit" disabled={uploading || !file} className="w-full gap-2">
                  <Upload className="size-4" />
                  {uploading ? "A enviar…" : "Enviar Imagem"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-3 space-y-4">
          {mediaItems.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group rounded-xl border overflow-hidden bg-card cursor-pointer transition-all hover:shadow-md hover:border-primary/50 relative aspect-square ${
                    selectedItem?.id === item.id ? "ring-2 ring-primary border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={item.public_url}
                    alt={item.alt_text || item.file_name}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.public_url);
                      }}
                      className="rounded-full bg-background p-2 text-foreground shadow-sm hover:scale-105 transition-transform"
                      title="Copiar URL"
                    >
                      <Copy className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteItem(item);
                        setConfirmOpen(true);
                      }}
                      className="rounded-full bg-destructive p-2 text-destructive-foreground shadow-sm hover:scale-105 transition-transform"
                      title="Excluir Imagem"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-24 text-center">
              <FileImage className="mx-auto size-12 text-muted-foreground/30" />
              <p className="mt-4 text-sm text-muted-foreground font-medium">Biblioteca vazia</p>
              <p className="mt-1 text-xs text-muted-foreground/75">
                Faça o envio da primeira imagem utilizando o painel lateral.
              </p>
            </div>
          )}

          {/* Details Sidebar overlay */}
          {selectedItem && (
            <Card className="border border-border shadow-md">
              <CardContent className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="size-24 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                  <img
                    src={selectedItem.public_url}
                    alt={selectedItem.alt_text || selectedItem.file_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1.5 text-center sm:text-left text-sm overflow-hidden w-full">
                  <h3 className="font-bold text-foreground truncate">{selectedItem.file_name}</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" /> {new Date(selectedItem.created_at).toLocaleDateString()}
                    </span>
                    <span>Tamanho: {bytesToSize(selectedItem.size_bytes)}</span>
                    {selectedItem.width && selectedItem.height && (
                      <span>Dimensões: {selectedItem.width}x{selectedItem.height}px</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Alt Text: <span className="font-medium text-foreground">{selectedItem.alt_text || "—"}</span></p>
                  
                  <div className="flex justify-center sm:justify-start gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(selectedItem.public_url)}
                      className="gap-1.5 h-8 text-xs font-semibold"
                    >
                      <Copy className="size-3.5" /> Copiar Link
                    </Button>
                    <a
                      href={selectedItem.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      <ExternalLink className="size-3.5" /> Ver Original
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deseja excluir esta imagem?"
        description="Esta ação excluirá permanentemente a imagem do Supabase Storage e do banco de dados. Artigos que usem esta URL exibirão uma imagem quebrada."
        confirmText="Excluir Imagem"
        onConfirm={handleDelete}
      />
    </div>
  );
}
