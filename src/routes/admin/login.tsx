import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, KeyRound, Mail } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    // If the user already has a session, redirect them to dashboard
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({
        to: "/admin/dashboard",
      });
    }
  },
  component: LoginView,
});

function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Por favor, preencha o email e a palavra-passe.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Check if they have the admin role (for security)
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!userRole) {
        await supabase.auth.signOut();
        toast.error("Acesso negado: Apenas administradores podem aceder a esta área.");
        return;
      }

      toast.success("Sessão iniciada com sucesso!");
      void navigate({ to: "/admin/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Erro de autenticação. Verifique os dados inseridos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Compass className="size-7 animate-pulse" />
          </div>
          <div>
            <CardTitle className="font-[family-name:var(--font-display)] text-2xl font-700">
              MinderPay CMS
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground">
              Faça login para aceder à área de administração.
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-xs font-semibold text-foreground">
                Endereço de Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="admin@minderpay.com"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="login-pass" className="text-xs font-semibold text-foreground">
                  Palavra-passe
                </label>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-4 pb-6">
            <Button type="submit" disabled={loading} className="w-full h-11 font-semibold text-sm rounded-lg">
              {loading ? "A processar…" : "Iniciar Sessão"}
            </Button>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors text-center hover:underline">
              Voltar ao site público
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
