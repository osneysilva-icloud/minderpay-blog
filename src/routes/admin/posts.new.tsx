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

      const finalPayload = {
        ...payload,
        author_id: payload.author_id || author?.id || null,
      };

      const { error } = await supabase.from("posts").insert(finalPayload);
      if (error) throw error;

      toast.success("Artigo criado com sucesso!");
      void navigate({ to: "/admin/posts" });
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
