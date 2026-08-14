/** Utilitários de conteúdo partilhados entre o site público e o painel. */

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90)
    .replace(/^-|-$/g, "");
}

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tempo estimado de leitura em minutos (200 palavras por minuto). */
export function readingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function truncate(text: string, max = 160): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

const ALLOWED_TAGS = new Set([
  "p","br","hr","h1","h2","h3","h4","h5","h6","strong","b","em","i","u","s","del",
  "ul","ol","li","blockquote","a","img","figure","figcaption","table","thead","tbody",
  "tr","th","td","pre","code","iframe","span","div","small","sup","sub",
]);

const ALLOWED_ATTRS = new Set([
  "href","src","alt","title","width","height","target","rel","colspan","rowspan",
  "loading","allow","allowfullscreen","frameborder","class","decoding",
]);

/**
 * Sanitização de HTML sem dependências: remove scripts, handlers inline,
 * URLs javascript: e etiquetas/atributos fora da lista permitida.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style|object|embed|form|input|link|meta)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|object|embed|form|input|link|meta)\b[^>]*\/?>/gi, "");

  out = out.replace(/<\s*(\/?)([a-zA-Z0-9-]+)((?:\s+[^<>]*)?)\/?>/g, (match, closing: string, rawTag: string, rawAttrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (closing) return `</${tag}>`;

    const attrs: string[] = [];
    const attrRegex = /([a-zA-Z0-9:_-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let m: RegExpExecArray | null;
    while ((m = attrRegex.exec(rawAttrs)) !== null) {
      const name = m[1]!.toLowerCase();
      const value = (m[3] ?? m[4] ?? "").trim();
      if (name.startsWith("on")) continue;
      if (!ALLOWED_ATTRS.has(name)) continue;
      if ((name === "href" || name === "src") && /^\s*(javascript|data|vbscript):/i.test(value)) continue;
      attrs.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
    }
    if (tag === "a" && attrs.some((a) => a.startsWith('target="_blank"'))) {
      attrs.push('rel="noopener noreferrer"');
    }
    if (tag === "img") {
      if (!attrs.some((a) => a.startsWith("loading="))) attrs.push('loading="lazy"');
      if (!attrs.some((a) => a.startsWith("decoding="))) attrs.push('decoding="async"');
    }
    const selfClosing = tag === "br" || tag === "hr" || tag === "img";
    return `<${tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}${selfClosing ? " /" : ""}>`;
  });

  return out;
}
