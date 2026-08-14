import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Edit2, Trash2, Plus, Sparkles, FolderOpen } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  loader: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  },
  component: CategoriesManagementView,
});

function CategoriesManagementView() {
  const navigate = useNavigate();
  const categories = Route.useLoaderData();

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [loading, setLoading] = useState(false);

  // Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const generateSlug = () => {
    if (!name) return;
    const generated = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleEdit = (category: any) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Nome e Slug são campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      // Check if slug taken
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
        robots_index: robotsIndex,
      };

      if (editingId) {
        const { error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Categoria atualizada com sucesso!");
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) throw error;
        toast.success("Categoria criada com sucesso!");
      }

      resetForm();
      void navigate({ to: "/admin/categories" });
    } catch (err: any) {
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
      void navigate({ to: "/admin/categories" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir a categoria.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Categorias
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Crie e gerencie categorias de temas de publicação do MinderPay.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Editor Card Column */}
        <div className="md:col-span-1">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">
                {editingId ? "Editar Categoria" : "Nova Categoria"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="cat-name" className="text-xs font-semibold text-foreground">Nome</label>
                  <Input
                    id="cat-name"
                    required
                    placeholder="Dinheiro, Negócios..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-slug" className="text-xs font-semibold text-foreground">Slug</label>
                  <div className="flex gap-2">
                    <Input
                      id="cat-slug"
                      required
                      placeholder="dinheiro"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateSlug}
                      title="Gerar slug a partir do nome"
                    >
                      <Sparkles className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-desc" className="text-xs font-semibold text-foreground">Descrição</label>
                  <Textarea
                    id="cat-desc"
                    placeholder="Descrição desta categoria..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">SEO da Categoria</h3>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="cat-seotitle" className="text-xs font-semibold text-foreground">SEO Title</label>
                    <Input
                      id="cat-seotitle"
                      placeholder="Deixe em branco para usar o nome"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="cat-seodesc" className="text-xs font-semibold text-foreground">SEO Description</label>
                    <Input
                      id="cat-seodesc"
                      placeholder="Descrição meta para pesquisa…"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm text-foreground select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={robotsIndex}
                      onChange={(e) => setRobotsIndex(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary size-4"
                    />
                    Permitir indexação (index)
                  </label>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {editingId ? "Atualizar" : "Criar Categoria"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Categories List Column */}
        <div className="md:col-span-2">
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-3.5">Nome</th>
                    <th className="px-6 py-3.5">Slug</th>
                    <th className="px-6 py-3.5">Descrição</th>
                    <th className="px-6 py-3.5 text-center">Robots</th>
                    <th className="px-6 py-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-muted/10">
                        <td className="px-6 py-4 font-semibold text-foreground flex items-center gap-2">
                          <FolderOpen className="size-4 text-muted-foreground" /> {cat.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                          /categoria/{cat.slug}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                          {cat.description || "—"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            cat.robots_index ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                            {cat.robots_index ? "index" : "noindex"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(cat)}
                              className="rounded-lg p-2 text-primary hover:bg-primary/10 transition-colors"
                              title="Editar Categoria"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteId(cat.id);
                                setConfirmOpen(true);
                              }}
                              className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                              title="Excluir Categoria"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        Nenhuma categoria cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Delete confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deseja excluir esta categoria?"
        description="Esta ação excluirá permanentemente esta categoria. Tenha em mente que artigos vinculados a ela ficarão sem categoria."
        confirmText="Excluir Categoria"
        onConfirm={handleDelete}
      />
    </div>
  );
}
