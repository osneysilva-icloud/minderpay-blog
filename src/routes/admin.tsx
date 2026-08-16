import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Compass,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login") {
      return;
    }

    // Only run auth check on client where localStorage exists
    if (typeof window !== "undefined") {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        throw redirect({
          to: "/admin/login",
        });
      }
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const isLoginPage = currentPath === "/admin/login";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(!isLoginPage);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;

    async function verifyAdminAuth() {
      try {
        // 1. Fetch current session
        const { data: sessionData } = await supabase.auth.getSession();
        let session = sessionData?.session;

        // 2. Try auto-refreshing token if existing session is close to expiry
        if (session) {
          const { data: refreshData } = await supabase.auth.refreshSession();
          if (refreshData?.session) {
            session = refreshData.session;
          }
        }

        if (!session) {
          if (isMounted) {
            setIsAuthenticated(false);
            setCheckingAuth(false);
            void navigate({ to: "/admin/login" });
          }
          return;
        }

        // 3. Verify admin role strictly in database
        const { data: userRole, error: roleErr } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleErr || !userRole) {
          console.warn("[AdminAuth] Unauthorized access attempt detected. Signing out.");
          await supabase.auth.signOut();
          if (isMounted) {
            setIsAuthenticated(false);
            setCheckingAuth(false);
            toast.error("Acesso negado: Apenas administradores podem aceder ao painel.");
            void navigate({ to: "/admin/login" });
          }
          return;
        }

        if (isMounted) {
          setUserEmail(session.user.email || null);
          setIsAuthenticated(true);
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error("[AdminAuth] Auth verification error:", err);
        if (isMounted) {
          setIsAuthenticated(false);
          setCheckingAuth(false);
          void navigate({ to: "/admin/login" });
        }
      }
    }

    void verifyAdminAuth();

    // ── Keep-alive: refresh session every 4 minutes ──
    const keepAliveInterval = setInterval(async () => {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.warn("[Admin] Session refresh failed:", error.message);
      }
    }, 4 * 60 * 1000);

    // ── Auth state watcher: redirect immediately on sign-out ──
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || (!session && event !== "INITIAL_SESSION")) {
        setIsAuthenticated(false);
        toast.error("Sessão terminada. Por favor, inicie sessão novamente.");
        void navigate({ to: "/admin/login" });
      }
    });

    return () => {
      isMounted = false;
      clearInterval(keepAliveInterval);
      subscription.unsubscribe();
    };
  }, [isLoginPage, navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erro ao efetuar logout.");
    } else {
      toast.success("Sessão terminada com sucesso.");
      void navigate({ to: "/admin/login" });
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Artigos", href: "/admin/posts", icon: FileText },
    { label: "Categorias", href: "/admin/categories", icon: FolderOpen },
    { label: "Tags", href: "/admin/tags", icon: Tag },
    { label: "Mídia", href: "/admin/media", icon: ImageIcon },
    { label: "Configurações", href: "/admin/settings", icon: Settings },
  ];

  // Render child login route cleanly
  if (isLoginPage) {
    return <Outlet />;
  }

  // Render auth checking shield until session is 100% verified
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-card flex flex-col items-center justify-center p-6 text-center">
        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-bounce mb-4 border border-primary/20 shadow-sm">
          <ShieldCheck className="size-7" />
        </div>
        <h2 className="text-lg font-bold text-foreground font-[family-name:var(--font-display)]">
          MinderPay Admin
        </h2>
        <p className="mt-1 text-xs text-muted-foreground max-w-xs">
          A verificar credenciais e permissões de administrador…
        </p>
      </div>
    );
  }

  // Prevent rendering admin layout if unauthenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row max-w-full overflow-x-hidden">
      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Compass className="size-5 text-primary" />
          <span className="font-bold text-foreground">MinderPay Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-1.5 hover:bg-muted text-foreground transition-colors"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-border select-none">
          <Compass className="size-6 text-primary" />
          <span className="font-bold text-foreground text-lg">MinderPay Admin</span>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-border bg-muted/10 flex items-center gap-3">
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="size-5" />
          </div>
          <div className="overflow-hidden">
            <span className="block text-xs font-semibold text-foreground truncate">
              Administrador
            </span>
            <span className="block text-[10px] text-muted-foreground truncate">
              {userEmail || "a carregar…"}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav aria-label="Navegação administrativa" className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="size-4.5" />
            <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        <div className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
