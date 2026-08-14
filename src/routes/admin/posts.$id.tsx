import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PostEditorForm } from "@/components/admin/PostEditorForm";

export const Route = createFileRoute("/admin/posts/$id")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, post_tags(tag_id)")
      .eq("id", params.id)
      .maybeSingle();

    if (error || !data) {
      throw notFound();
    }
    return data;
  },
  component: EditPostView,
});

function EditPostView() {
  const navigate = useNavigate();
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

      // If status changed to published, ensure published_at is set
      const isStatusChangedToPublished = postData.status === "published" && initialData.status !== "published";
      const updatedPayload = {
        ...postData,
        updated_at: new Date().toISOString(),
        published_at: isStatusChangedToPublished 
          ? (initialData.published_at || new Date().toISOString()) 
          : postData.status === "published"
          ? initialData.published_at 
          : postData.published_at,
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

      toast.success("Artigo atualizado com sucesso!");
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
