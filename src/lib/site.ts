/**
 * Configuração central do site.
 * O URL de produção é definido pela variável de ambiente VITE_SITE_URL
 * (valor de produção: https://minderpay.com).
 */
export const SITE_URL = (
  import.meta.env["VITE_SITE_URL"] || "https://www.minderpay.com"
).replace(/\/$/, "");

export const SITE_NAME = "MinderPay";
export const SITE_TAGLINE = "Dinheiro, negócios e tecnologia, sem ruído.";
export const SITE_DESCRIPTION =
  "Artigos práticos sobre dinheiro, negócios, marketing, tecnologia, finanças e empreendedorismo.";
export const SITE_LOCALE = "pt_PT";

/** Constrói um URL absoluto a partir de um caminho relativo. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function postPath(slug: string) {
  return `/blog/${slug}`;
}

export function categoryPath(slug: string) {
  return `/categoria/${slug}`;
}

export function authorPath(slug: string) {
  return `/autor/${slug}`;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-PT", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function formatDate(value?: string | null): string {
  if (!value) return "";
  return DATE_FORMATTER.format(new Date(value));
}

export function formatDateShort(value?: string | null): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export const POST_STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  published: "Publicado",
  scheduled: "Agendado",
  archived: "Arquivado",
};
