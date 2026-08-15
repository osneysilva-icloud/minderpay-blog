import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  Search,
  X,
  Youtube,
  Instagram,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useSite } from "./site-context";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { usePageAnalytics } from "@/hooks/usePageAnalytics";

// ─── Hardcoded social links (always show, not from DB) ───────────────────────
const WHATSAPP_URL = "https://wa.me/258864339593";
const INSTAGRAM_URL = "https://www.instagram.com/minderads/";
const YOUTUBE_URL = "https://www.youtube.com/@MinderAds";

// ─── Logo ─────────────────────────────────────────────────────────────────────
export function Logo({ compact = false }: { compact?: boolean }) {
  const { settings } = useSite();
  const name = settings?.site_name || SITE_NAME;

  if (settings?.logo_url) {
    return (
      <img
        src={settings.logo_url}
        alt={name}
        width={140}
        height={32}
        className="h-8 w-auto"
        decoding="async"
      />
    );
  }

  return (
    <span className="flex items-baseline gap-0 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
      <span className="text-foreground">Minder</span>
      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text px-1 text-transparent font-extrabold">
        Pay
      </span>
      {!compact && <span className="sr-only">{SITE_TAGLINE}</span>}
    </span>
  );
}

// ─── SearchBar ────────────────────────────────────────────────────────────────
export function SearchBar({
  autoFocus = false,
  defaultValue = "",
  onSubmitted,
}: {
  autoFocus?: boolean;
  defaultValue?: string;
  onSubmitted?: () => void;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const term = value.trim();
        if (!term) return;
        onSubmitted?.();
        void navigate({ to: "/pesquisa", search: { q: term, page: 1 } });
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Pesquisar artigos
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="site-search"
        ref={ref}
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Pesquisar artigos…"
        className="h-10 w-full rounded-full border border-border bg-card/80 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
      />
    </form>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const { categories } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      {/* ── Top bar ── */}
      <div className="bg-gray-950 text-gray-300 text-xs">
        <div className="container-page flex h-8 items-center justify-between gap-4">
          <span className="hidden sm:block opacity-60 tracking-wide">
            Expert em vendas de infoprodutos &amp; marketing digital
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="size-3.5" />
              <span className="hidden sm:inline">+258 864 339 593</span>
            </a>
            <span className="opacity-20">|</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram className="size-3.5" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-red-400 transition-colors"
            >
              <Youtube className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-page flex h-16 items-center gap-4">
          <Link to="/" aria-label="MinderPay — página inicial" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Navegação principal" className="hidden flex-1 lg:block">
            <ul className="flex items-center justify-center gap-0.5">
              <li>
                <Link
                  to="/blog"
                  search={{ page: 1, categoria: undefined }}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-primary bg-primary/5" }}
                >
                  Artigos
                </Link>
              </li>
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: category.slug }}
                    search={{ page: 1 }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
                    activeProps={{ className: "text-primary bg-primary/5" }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop search */}
          <div className="ml-auto hidden w-60 lg:block">
            <SearchBar />
          </div>

          {/* Mobile controls */}
          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <button
              type="button"
              aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((open) => !open);
                setMenuOpen(false);
              }}
              className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            >
              {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((open) => !open);
                setSearchOpen(false);
              }}
              className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Gradient accent line at bottom of header */}
        <div className="h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-b border-border bg-card px-4 py-3 lg:hidden">
          <SearchBar autoFocus onSubmitted={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav
          aria-label="Navegação principal (móvel)"
          className="border-b border-border bg-card lg:hidden"
        >
          <ul className="container-page grid gap-1 py-3">
            <li>
              <Link
                to="/blog"
                search={{ page: 1, categoria: undefined }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                <ChevronRight className="size-4 text-primary" />
                Todos os artigos
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  search={{ page: 1 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  <ChevronRight className="size-4 text-primary" />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const { categories, settings } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-950 text-gray-400">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* ── Brand ── */}
        <div className="space-y-5 lg:col-span-1">
          <Link to="/" aria-label="MinderPay — página inicial">
            <span className="flex items-baseline gap-0 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              <span className="text-white">Minder</span>
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text px-1 text-transparent font-extrabold">
                Pay
              </span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            {settings?.site_description ||
              "Conteúdo prático sobre infoprodutos, marketing digital, negócios e tecnologia para empreendedores modernos."}
          </p>

          {/* Social icons — always hardcoded */}
          <div className="flex items-center gap-3">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube — Minder Ads"
              className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-red-600 hover:text-white hover:scale-110"
            >
              <Youtube className="size-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — Minder Ads"
              className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:text-white hover:scale-110"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp — Minder Ads"
              className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-green-600 hover:text-white hover:scale-110"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        {/* ── Categories ── */}
        <nav aria-label="Categorias" className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Categorias
          </h2>
          <ul className="space-y-2.5 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  search={{ page: 1 }}
                  className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
                >
                  <ArrowRight className="size-3.5 shrink-0 text-primary/50" />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── MinderPay links ── */}
        <nav aria-label="Institucional" className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            MinderPay
          </h2>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: "/sobre" as const, label: "Sobre" },
              { to: "/contacto" as const, label: "Contacto" },
              { to: "/politica-de-privacidade" as const, label: "Política de Privacidade" },
              { to: "/politica-de-cookies" as const, label: "Política de Cookies" },
              { to: "/termos-de-uso" as const, label: "Termos de Uso" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
                >
                  <ArrowRight className="size-3.5 shrink-0 text-primary/50" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                search={{ page: 1, categoria: undefined }}
                className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-primary"
              >
                <ArrowRight className="size-3.5 shrink-0 text-primary/50" />
                Todos os artigos
              </Link>
            </li>
          </ul>
        </nav>

        {/* ── Contact ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Contacto
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-green-400"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gray-800 text-green-500">
                  <MessageCircle className="size-3.5" />
                </span>
                <span>+258 864 339 593</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-pink-400"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gray-800 text-pink-500">
                  <Instagram className="size-3.5" />
                </span>
                <span>@minderads</span>
              </a>
            </li>
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-red-400"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-gray-800 text-red-500">
                  <Youtube className="size-3.5" />
                </span>
                <span>@MinderAds</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:suporteminderpay@gmail.com"
                className="flex items-center gap-2.5 text-gray-400 transition-colors hover:text-primary text-xs break-all"
              >
                suporteminderpay@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings?.site_name || SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="text-gray-700">
            Feito com ♥ por{" "}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              Minder Ads
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── SiteLayout ───────────────────────────────────────────────────────────────
export function SiteLayout({ children }: { children: ReactNode }) {
  // Track every public page view for analytics
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  usePageAnalytics(path);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
