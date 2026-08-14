/** Utilitários e tipos partilhados pelo painel de administração. */
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Post = Tables<"posts">;
export type Category = Tables<"categories">;
export type Tag = Tables<"tags">;
export type Author = Tables<"authors">;
export type Media = Tables<"media">;
export type SiteSettings = Tables<"site_settings">;
export type AdSlot = Tables<"ad_slots">;
export type ContactMessage = Tables<"contact_messages">;
export type NewsletterSubscriber = Tables<"newsletter_subscribers">;

export const POST_STATUS_LABELS: Record<Post["status"], string> = {
  draft: "Rascunho",
  published: "Publicado",
  scheduled: "Agendado",
  archived: "Arquivado",
};

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function toDateTimeLocalInput(value: string | null | undefined): string {
  const date = value ? new Date(value) : new Date();
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export function fromDateTimeLocalInput(value: string): string {
  return new Date(value).toISOString();
}

/** Verifica se um slug já existe noutro registo da tabela indicada. */
export async function isSlugTaken(
  table: "posts" | "categories",
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  let query = supabase.from(table).select("id").eq("slug", slug).limit(1);
  if (excludeId) query = query.neq("id", excludeId);
  const { data, error } = await query;
  if (error) throw error;
  return Boolean(data && data.length > 0);
}

export function bytesToSize(bytes: number | null | undefined): string {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

export function downloadCsv(filename: string, rows: string[][]): void {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
