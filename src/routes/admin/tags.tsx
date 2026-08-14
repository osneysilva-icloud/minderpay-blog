import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Edit2, Trash2, Tag as TagIcon, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/tags")({
  loader: async () => {
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  },
  component: TagsManagementView,
});

function TagsManagementView() {
  const navigate = useNavigate();
  const tags = Route.useLoaderData();

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
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

  const handleEdit = (tag: any) => {
    setEditingId(tag.id);
    setName(tag.name);
    setSlug(tag.slug);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Nome e Slug são campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      // Check slug taken
      let slugQuery = supabase.from("tags").select("id").eq("slug", slug);
      if (editingId) slugQuery = slugQuery.neq("id", editingId);
      const { data: taken } = await slugQuery.maybeSingle();

      if (taken) {
        toast.error("Este slug de URL já está a ser utilizado por outra tag.");
        setLoading(false);
        return;
      }

      const payload = { name, slug };

      if (editingId) {
        const { error } = await supabase
          .from("tags")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Tag atualizada com sucesso!");
      } else {
        const { error } = await supabase.from("tags").insert(payload);
        if (error) throw error;
        toast.success("Tag criada com sucesso!");
      }

      resetForm();
      void navigate({ to: "/admin/tags" });
    } catch (err: any) {
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
      void navigate({ to: "/admin/tags" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir a tag.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 tracking-tight text-foreground">
          Tags
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Crie e gerencie palavras-chave/tags para vincular aos seus artigos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Form Column */}
        <div className="md:col-span-1">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-lg font-700">
                {editingId ? "Editar Tag" : "Nova Tag"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="tag-name" className="text-xs font-semibold text-foreground">Nome da Tag</label>
                  <Input
                    id="tag-name"
                    required
                    placeholder="Rendimento, Guia, SEO..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="tag-slug" className="text-xs font-semibold text-foreground">Slug</label>
                  <div className="flex gap-2">
                    <Input
                      id="tag-slug"
                      required
                      placeholder="rendimento"
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

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {editingId ? "Atualizar" : "Criar Tag"}
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

        {/* Tags List Column */}
        <div className="md:col-span-2">
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-3.5">Nome</th>
                    <th className="px-6 py-3.5">Slug</th>
                    <th className="px-6 py-3.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <tr key={tag.id} className="hover:bg-muted/10">
                        <td className="px-6 py-4 font-semibold text-foreground flex items-center gap-2">
                          <TagIcon className="size-4 text-muted-foreground" /> #{tag.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                          {tag.slug}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(tag)}
                              className="rounded-lg p-2 text-primary hover:bg-primary/10 transition-colors"
                              title="Editar Tag"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteId(tag.id);
                                setConfirmOpen(true);
                              }}
                              className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                              title="Excluir Tag"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                        Nenhuma tag cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deseja excluir esta tag?"
        description="Esta ação excluirá permanentemente esta tag. Ela será removida de todos os artigos vinculados."
        confirmText="Excluir Tag"
        onConfirm={handleDelete}
      />
    </div>
  );
}
