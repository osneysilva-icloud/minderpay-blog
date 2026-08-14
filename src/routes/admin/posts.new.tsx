import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PostEditorForm } from "@/components/admin/PostEditorForm";

export const Route = createFileRoute("/admin/posts/new")({
  component: NewPostView,
});

function NewPostView() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = async (payload: any) => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      // Ensure the user has an author profile or attach equipped author
      // Let's check authors for the user or default to first author
      const { data: author } = await supabase
        .from("authors")
        .select("id")
        .limit(1)
        .maybeSingle();

      const { _tag_ids, ...postData } = payload;

      const finalPayload = {
        ...postData,
        author_id: postData.author_id || author?.id || null,
      };

      const { data: newPost, error } = await supabase
        .from("posts")
        .insert(finalPayload)
        .select("id")
        .single();

      if (error) throw error;

      if (_tag_ids && Array.isArray(_tag_ids) && _tag_ids.length > 0 && newPost?.id) {
        const tagInserts = _tag_ids.map((tag_id: string) => ({
          post_id: newPost.id,
          tag_id,
        }));
        await supabase.from("post_tags").insert(tagInserts);
      }

      toast.success("Artigo criado com sucesso!");
      void navigate({ to: "/admin/posts/" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar o artigo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PostEditorForm onSave={handleSave} loading={loading} />
    </div>
  );
}
