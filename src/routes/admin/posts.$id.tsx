import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { ArrowLeft, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin/posts/$id")({
  loader: async ({ params }) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, post_tags(tag_id)")
        .eq("id", params.id)
        .maybeSingle();

      if (error) {
        console.error("Erro Supabase em posts.$id:", error);
        throw new Error(error.message || "Erro ao consultar artigo na base de dados.");
      }

      if (!data) {
        throw new Error("Artigo não encontrado ou foi excluído.");
      }

      return data;
    } catch (err: any) {
      console.error("Erro no loader de posts.$id:", err);
      throw err;
    }
  },
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card border border-border rounded-2xl my-8">
      <AlertCircle className="size-12 text-amber-500 mb-3" />
      <h2 className="text-2xl font-bold text-foreground">Artigo Não Encontrado</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        O artigo que está a tentar editar não foi encontrado na base de dados ou pode ter sido eliminado.
      </p>
      <Link
        to="/admin/posts"
        search={{ page: 1 }}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-all"
      >
        <ArrowLeft className="size-4" /> Voltar à Lista de Artigos
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card border border-border rounded-2xl my-8">
      <AlertCircle className="size-12 text-red-500 mb-3" />
      <h2 className="text-2xl font-bold text-foreground">Erro ao Carregar Artigo</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        {error?.message || "Ocorreu um erro ao carregar os dados deste artigo."}
      </p>
      <Link
        to="/admin/posts"
        search={{ page: 1 }}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-all"
      >
        <ArrowLeft className="size-4" /> Voltar à Lista de Artigos
      </Link>
    </div>
  ),
  component: EditPostView,
});

function EditPostView() {
  const navigate = useNavigate();
  const router = useRouter();
  const initialData = Route.useLoaderData();
  const [loading, setLoading] = useState(false);

  const handleSave = async (payload: any) => {
    setLoading(true);
    try {
      const { _tag_ids, ...postData } = payload;

      // Check if slug is taken by another post
      const { data: slugCheck } = await supabase
        .from("posts")
        .select("id")
        .eq("slug", postData.slug)
        .neq("id", initialData.id)
        .maybeSingle();

      if (slugCheck) {
        toast.error("Este slug de URL já está a ser utilizado por outro artigo.");
        setLoading(false);
        return;
      }

      // Ensure published_at is a valid timestamp if published
      const isPublished = postData.status === "published";
      const resolvedPublishedAt = isPublished
        ? initialData.published_at || postData.published_at || new Date().toISOString()
        : postData.status === "scheduled" && postData.published_at
        ? postData.published_at
        : null;

      const updatedPayload = {
        ...postData,
        updated_at: new Date().toISOString(),
        published_at: resolvedPublishedAt,
      };

      const { error } = await supabase
        .from("posts")
        .update(updatedPayload)
        .eq("id", initialData.id);

      if (error) throw error;

      // Sync post_tags
      if (Array.isArray(_tag_ids)) {
        await supabase.from("post_tags").delete().eq("post_id", initialData.id);
        if (_tag_ids.length > 0) {
          const tagInserts = _tag_ids.map((tag_id: string) => ({
            post_id: initialData.id,
            tag_id,
          }));
          await supabase.from("post_tags").insert(tagInserts);
        }
      }

      // Invalidate all route caches so published changes are immediately visible
      await router.invalidate();

      toast.success(
        isPublished
          ? "Artigo e alterações publicados com sucesso!"
          : "Artigo atualizado com sucesso!"
      );

      void navigate({ to: "/admin/posts/" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar o artigo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PostEditorForm postId={initialData.id} initialData={initialData} onSave={handleSave} loading={loading} />
    </div>
  );
}
