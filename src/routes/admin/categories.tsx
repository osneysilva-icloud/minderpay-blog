import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Edit2, Trash2, Plus, Sparkles, FolderOpen, X, Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  loader: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Erro ao carregar categorias:", error);
      return [];
    }
    return data || [];
  },
  component: CategoriesManagementView,
});

function CategoriesManagementView() {
  const navigate = useNavigate();
  const router = useRouter();
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
  const [deleteName, setDeleteName] = useState<string>("");
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
    setName(category.name || "");
    setSlug(category.slug || "");
    setDescription(category.description || "");
    setSeoTitle(category.seo_title || "");
    setSeoDescription(category.seo_description || "");
    setRobotsIndex(category.robots_index ?? true);

    // Scroll form into view on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (!name.trim() || !slug.trim()) {
      toast.error("Nome e Slug da categoria são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      // Check if slug taken
      let slugQuery = supabase.from("categories").select("id").eq("slug", slug.trim());
      if (editingId) slugQuery = slugQuery.neq("id", editingId);
      const { data: taken } = await slugQuery.maybeSingle();

      if (taken) {
        toast.error("O slug '" + slug.trim() + "' já está a ser utilizado por outra categoria.");
        setLoading(false);
        return;
      }

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        robots_index: robotsIndex,
      };

      if (editingId) {
        const { error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Categoria '" + name + "' atualizada com sucesso!");
      } else {
        const { error } = await supabase.from("categories").insert(payload);
        if (error) throw error;
        toast.success("Categoria '" + name + "' criada com sucesso!");
      }

      resetForm();
      await router.invalidate();
    } catch (err: any) {
      toast.error(err.message || "Erro ao guardar a categoria na base de dados.");
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
      setDeleteName("");
      if (editingId === deleteId) resetForm();
      await router.invalidate();
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir a categoria.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Gestão de Categorias
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Crie, edite e elimine categorias de publicações do MinderPay.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
          {categories.length} {categories.length === 1 ? "Categoria registada" : "Categorias registadas"}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor Card Column */}
        <div className="lg:col-span-1">
          <Card className={`border shadow-sm transition-all ${editingId ? "border-amber-500/50 bg-amber-500/5" : "border-border"}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-[family-name:var(--font-display)] text-lg font-bold flex items-center gap-2">
                  {editingId ? (
                    <>
                      <Edit2 className="size-4 text-amber-500" />
                      <span>Editar Categoria</span>
                    </>
                  ) : (
                    <>
                      <Plus className="size-4 text-primary" />
                      <span>Nova Categoria</span>
                    </>
                  )}
                </CardTitle>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <X className="size-3.5" /> Cancelar
                  </button>
                )}
              </div>
              {editingId && (
                <p className="text-xs text-amber-600 font-medium mt-1">
                  A alterar os dados da categoria selecionada.
                </p>
              )}
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="cat-name" className="text-xs font-semibold text-foreground flex items-center justify-between">
                    <span>Nome da Categoria *</span>
                    <span className="text-[10px] text-muted-foreground">Ex: Vendas, Marketing</span>
                  </label>
                  <Input
                    id="cat-name"
                    required
                    placeholder="Nome da categoria..."
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingId && !slug) {
                        const generated = e.target.value
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .replace(/[^a-z0-9\s-]/g, "")
                          .trim()
                          .replace(/\s+/g, "-");
                        setSlug(generated);
                      }
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-slug" className="text-xs font-semibold text-foreground">Slug de URL *</label>
                  <div className="flex gap-2">
                    <Input
                      id="cat-slug"
                      required
                      placeholder="minha-categoria"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateSlug}
                      title="Gerar slug automático"
                      className="shrink-0"
                    >
                      <Sparkles className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-desc" className="text-xs font-semibold text-foreground">Descrição</label>
                  <Textarea
                    id="cat-desc"
                    placeholder="Resumo do tema da categoria..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Configurações SEO</h3>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="cat-seotitle" className="text-xs font-semibold text-foreground">Título SEO (opcional)</label>
                    <Input
                      id="cat-seotitle"
                      placeholder="Deixe em branco para usar o nome"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="cat-seodesc" className="text-xs font-semibold text-foreground">Descrição Meta SEO (opcional)</label>
                    <Input
                      id="cat-seodesc"
                      placeholder="Descrição para motores de busca..."
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs font-medium text-foreground select-none cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={robotsIndex}
                      onChange={(e) => setRobotsIndex(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary size-4"
                    />
                    <span>Permitir indexação no Google (robots index)</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button type="submit" disabled={loading} className="flex-1 font-bold">
                    {loading ? (
                      "A guardar..."
                    ) : editingId ? (
                      "Salvar Alterações"
                    ) : (
                      "Criar Categoria"
                    )}
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
        <div className="lg:col-span-2">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Lista de Categorias</span>
                <span className="text-xs font-normal text-muted-foreground">Total: {categories.length}</span>
              </CardTitle>
            </CardHeader>

            {/* Mobile View: Cards */}
            <div className="grid gap-3 p-4 sm:hidden">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`rounded-xl border p-4 transition-all ${
                      editingId === cat.id ? "border-amber-500 bg-amber-500/10 shadow-md" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 font-bold text-base text-foreground">
                          <FolderOpen className="size-4 text-primary shrink-0" />
                          <span>{cat.name}</span>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground mt-1">/categoria/{cat.slug}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        cat.robots_index ? "bg-green-500/10 text-green-600 border border-green-500/30" : "bg-red-500/10 text-red-600 border border-red-500/30"
                      }`}>
                        {cat.robots_index ? "Index" : "NoIndex"}
                      </span>
                    </div>

                    {cat.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{cat.description}</p>
                    )}

                    <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-border/60">
                      <button
                        type="button"
                        onClick={() => handleEdit(cat)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-all"
                      >
                        <Edit2 className="size-3.5" /> Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(cat.id);
                          setDeleteName(cat.name);
                          setConfirmOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="size-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Nenhuma categoria registada.
                </div>
              )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider">
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
                      <tr
                        key={cat.id}
                        className={`transition-colors hover:bg-muted/30 ${
                          editingId === cat.id ? "bg-amber-500/10" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-foreground">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="size-4 text-primary shrink-0" />
                            <span>{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                          /categoria/{cat.slug}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                          {cat.description || "—"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            cat.robots_index ? "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30" : "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30"
                          }`}>
                            {cat.robots_index ? "index" : "noindex"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(cat)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 hover:scale-105 transition-all shadow-2xs"
                              title="Editar esta categoria"
                            >
                              <Edit2 className="size-3.5" /> Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteId(cat.id);
                                setDeleteName(cat.name);
                                setConfirmOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 hover:scale-105 transition-all shadow-2xs"
                              title="Eliminar esta categoria"
                            >
                              <Trash2 className="size-3.5" /> Eliminar
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
        title={`Eliminar categoria "${deleteName}"?`}
        description="Esta ação excluirá permanentemente esta categoria da base de dados. Artigos associados a esta categoria continuarão seguros mas ficarão sem categoria."
        confirmText="Sim, Eliminar"
        onConfirm={handleDelete}
      />
    </div>
  );
}
