import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useSite } from "./site-context";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

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
    <span className="flex items-baseline gap-[0.1rem] font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground">
      <span className="font-semibold">Minder</span>
      <span className="rounded-sm bg-primary px-1.5 py-0.5 text-lg font-semibold text-primary-foreground">
        Pay
      </span>
      {!compact && <span className="sr-only">{SITE_TAGLINE}</span>}
    </span>
  );
}

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
        className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
      />
    </form>
  );
}

export function Header() {
  const { categories } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" aria-label="MinderPay — página inicial" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            <li>
              <Link
                to="/blog"
                search={{ page: 1, categoria: undefined }}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-primary" }}
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
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-primary" }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden w-64 lg:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button
            type="button"
            aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMenuOpen(false);
            }}
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
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
            className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <SearchBar autoFocus onSubmitted={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <nav
          aria-label="Navegação principal (móvel)"
          className="border-t border-border bg-card lg:hidden"
        >
          <ul className="container-page grid gap-1 py-3">
            <li>
              <Link
                to="/blog"
                search={{ page: 1, categoria: undefined }}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
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
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
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

export function Footer() {
  const { categories, settings } = useSite();
  const year = new Date().getFullYear();
  const socials = [
    { href: settings?.social_facebook, label: "Facebook" },
    { href: settings?.social_instagram, label: "Instagram" },
    { href: settings?.social_twitter, label: "X" },
    { href: settings?.social_linkedin, label: "LinkedIn" },
    { href: settings?.social_youtube, label: "YouTube" },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {settings?.site_description ||
              "Conteúdo prático sobre dinheiro, negócios, marketing e tecnologia."}
          </p>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Categorias">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Categorias</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: category.slug }}
                  search={{ page: 1 }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">MinderPay</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/sobre" className="text-muted-foreground hover:text-primary">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="text-muted-foreground hover:text-primary">
                Contacto
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                search={{ page: 1, categoria: undefined }}
                className="text-muted-foreground hover:text-primary"
              >
                Todos os artigos
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/politica-de-privacidade" className="text-muted-foreground hover:text-primary">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/politica-de-cookies" className="text-muted-foreground hover:text-primary">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link to="/termos-de-uso" className="text-muted-foreground hover:text-primary">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings?.site_name || SITE_NAME}. Todos os direitos reservados.
          </p>
          {settings?.contact_email && <p>{settings.contact_email}</p>}
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
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
