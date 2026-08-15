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

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_WIDTH = 1600;

export class MediaUploadError extends Error {}

function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new MediaUploadError("Não foi possível ler a imagem."));
    };
    img.src = url;
  });
}

async function maybeResizeToWebp(
  file: File,
  width: number,
  height: number,
): Promise<{ blob: Blob; name: string; type: string; width: number; height: number }> {
  const canConvert = typeof document !== "undefined" && file.type !== "image/svg+xml" && file.type !== "image/gif";
  if (!canConvert || width <= MAX_WIDTH) {
    return { blob: file, name: file.name, type: file.type, width, height };
  }
  const scale = MAX_WIDTH / width;
  const targetWidth = MAX_WIDTH;
  const targetHeight = Math.round(height * scale);

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { blob: file, name: file.name, type: file.type, width, height };
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), "image/webp", 0.85),
  );
  if (!blob) return { blob: file, name: file.name, type: file.type, width, height };

  const newName = file.name.replace(/\.[a-zA-Z0-9]+$/, "") + ".webp";
  return { blob, name: newName, type: "image/webp", width: targetWidth, height: targetHeight };
}

export interface UploadMediaOptions {
  file: File;
  altText?: string;
  description?: string;
  uploadedBy?: string | null;
}

export async function uploadMediaFile({
  file,
  altText,
  description,
  uploadedBy,
}: UploadMediaOptions): Promise<Media> {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new MediaUploadError("Formato de imagem não suportado.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new MediaUploadError("A imagem excede o limite de 5 MB.");
  }

  let width = 0;
  let height = 0;
  if (file.type !== "image/svg+xml") {
    const dims = await readImageDimensions(file);
    width = dims.width;
    height = dims.height;
  }

  const resized = await maybeResizeToWebp(file, width, height);

  const safeName = resized.name.replace(/[^a-zA-Z0-9.\-_]/g, "-").toLowerCase();
  const storagePath = `${crypto.randomUUID()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storagePath, resized.blob, { contentType: resized.type, upsert: false });
  if (uploadError) throw new MediaUploadError(uploadError.message);

  const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(storagePath);

  const { data, error } = await supabase
    .from("media")
    .insert({
      file_name: file.name,
      storage_path: storagePath,
      public_url: publicUrl,
      alt_text: altText ?? null,
      description: description ?? null,
      mime_type: resized.type,
      size_bytes: resized.blob.size,
      width: resized.width || null,
      height: resized.height || null,
      uploaded_by: uploadedBy ?? null,
    })
    .select()
    .single();

  if (error) {
    await supabase.storage.from("media").remove([storagePath]);
    throw new MediaUploadError(error.message);
  }

  return data;
}

export async function deleteMediaFile(media: Media): Promise<void> {
  const { error: storageError } = await supabase.storage.from("media").remove([media.storage_path]);
  if (storageError) throw new Error(storageError.message);
  const { error } = await supabase.from("media").delete().eq("id", media.id);
  if (error) throw new Error(error.message);
}
