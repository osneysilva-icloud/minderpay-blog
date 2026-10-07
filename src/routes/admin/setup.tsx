import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const runSetup = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");
      
      const email = process.env.ADMIN_EMAIL || "osneysilva@icloud.com";
      const email2 = process.env.ADMIN_SUPPORT_EMAIL || "suporteminderpay@gmail.com";
      const password = process.env.ADMIN_PASSWORD || "Minder_Ads1998";
      const adminName = process.env.ADMIN_NAME || "Osney Silva";
      const supportName = process.env.ADMIN_SUPPORT_NAME || "Suporte MinderPay";

      // 1. Delete previous users from auth to avoid conflicts
      const { data: usersData, error: listError } = await db.auth.admin.listUsers();
      if (listError) throw listError;

      for (const u of usersData.users) {
        if (u.email === email || u.email === email2) {
          await db.auth.admin.deleteUser(u.id);
        }
      }

      // 2. Create users natively via Supabase Auth Admin API
      const res1 = await db.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: adminName },
      });

      if (res1.error) throw res1.error;

      const res2 = await db.auth.admin.createUser({
        email: email2,
        password,
        email_confirm: true,
        user_metadata: { full_name: supportName },
      });

      if (res2.error) throw res2.error;

      // 3. Delete previous roles/authors with these user_ids to avoid conflict errors
      await db.from("user_roles").delete().in("user_id", [res1.data.user.id, res2.data.user.id]);
      await db.from("authors").delete().in("user_id", [res1.data.user.id, res2.data.user.id]);

      // 4. Promote both to admin in user_roles
      const { error: roleError } = await db.from("user_roles").insert([
        { user_id: res1.data.user.id, role: "admin" },
        { user_id: res2.data.user.id, role: "admin" },
      ]);
      if (roleError) throw roleError;

      // 5. Create authors
      const { error: authorError } = await db.from("authors").insert([
        {
          name: adminName,
          slug: adminName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          bio: "Fundador e Administrador.",
          role_title: "Diretor Editorial",
          is_example: false,
          user_id: res1.data.user.id,
        },
        {
          name: supportName,
          slug: supportName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          bio: "Equipe de Suporte.",
          role_title: "Administrador",
          is_example: false,
          user_id: res2.data.user.id,
        },
      ]);
      if (authorError) throw authorError;

      return { success: true, message: "Administradores criados com sucesso!" };
    } catch (err: any) {
      console.error("Setup error:", err);
      return { success: false, message: err.message || "Erro durante o setup" };
    }
  });

export const Route = createFileRoute("/admin/setup")({
  loader: async () => {
    return runSetup();
  },
  component: SetupView,
});

function SetupView() {
  const data = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl border border-slate-200 shadow-xl space-y-4">
        {data.success ? (
          <div className="mx-auto size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
            ✓
          </div>
        ) : (
          <div className="mx-auto size-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-2xl font-bold">
            ✗
          </div>
        )}
        <h1 className="text-2xl font-bold text-slate-800">Setup de Administrador</h1>
        <p className={`text-sm font-medium ${data.success ? "text-emerald-600" : "text-rose-600"}`}>
          {data.message}
        </p>
        <p className="text-xs text-slate-500 leading-relaxed">
          {data.success 
            ? "Os utilizadores 'osneysilva@icloud.com' e 'suporteminderpay@gmail.com' foram criados de forma nativa pela API do Supabase e promovidos a admin. Já pode aceder a /admin/login!" 
            : "Por favor, certifique-se de que a variável SUPABASE_SERVICE_ROLE_KEY está configurada corretamente na Vercel e tente de novo."}
        </p>
      </div>
    </div>
  );
}
