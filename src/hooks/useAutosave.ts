/**
 * useAutosave – Real-time database autosave hook for the post editor.
 *
 * Strategy:
 *  - Debounce: saves to Supabase 5 seconds after the user stops typing.
 *  - Heartbeat: forces a save every 15 seconds regardless, so no more than
 *    15 seconds of work is ever lost even if the user types continuously.
 *  - localStorage backup: also mirrors to localStorage as an offline fallback.
 *  - Returns { status, lastSavedAt } so the UI can show a live indicator.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AutosaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

interface AutosavePayload {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  categoryId: string;
  authorId: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
}

interface UseAutosaveOptions {
  postId: string | undefined;     // undefined = new post (will use localStorage only until first real save)
  storageKey: string;
  payload: AutosavePayload;
  enabled: boolean;               // only autosave when there is actual content
}

const DEBOUNCE_MS = 5_000;   // 5 seconds after last change
const HEARTBEAT_MS = 15_000; // force save every 15 seconds

export function useAutosave({ postId, storageKey, payload, enabled }: UseAutosaveOptions) {
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingRef = useRef(false);
  const payloadRef = useRef(payload);

  // Keep payloadRef always up to date without triggering effects
  useEffect(() => {
    payloadRef.current = payload;
  });

  const persistToDb = useCallback(async () => {
    if (!postId) return; // New (unsaved) posts: only localStorage
    const p = payloadRef.current;

    // Only save if there's something meaningful
    if (!p.title && !p.content) return;

    setStatus("saving");
    try {
      const { error } = await supabase
        .from("posts")
        .update({
          title: p.title || null,
          slug: p.slug || null,
          subtitle: p.subtitle || null,
          excerpt: p.excerpt || null,
          content: p.content || null,
          featured_image: p.featuredImage || null,
          featured_image_alt: p.featuredImageAlt || null,
          category_id: p.categoryId || null,
          author_id: p.authorId || null,
          seo_title: p.seoTitle || null,
          seo_description: p.seoDescription || null,
          primary_keyword: p.primaryKeyword || null,
          updated_at: new Date().toISOString(),
          // We never change status to "published" during autosave –
          // status is only changed when the user clicks "Guardar"
        })
        .eq("id", postId);

      if (error) throw error;

      setLastSavedAt(new Date());
      setStatus("saved");
      pendingRef.current = false;

      // Mirror to localStorage as offline backup
      localStorage.setItem(storageKey, JSON.stringify({ ...p, autosavedAt: Date.now() }));
    } catch (err) {
      console.warn("[Autosave] DB save failed:", err);
      setStatus("error");
      // Fallback to localStorage silently
      try {
        localStorage.setItem(storageKey, JSON.stringify({ ...payloadRef.current, autosavedAt: Date.now() }));
      } catch { /* ignore storage errors */ }
    }

    setTimeout(() => setStatus(s => s === "saved" ? "idle" : s), 3000);
  }, [postId, storageKey]);

  const persistToLocalStorage = useCallback(() => {
    const p = payloadRef.current;
    if (!p.title && !p.content) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...p, autosavedAt: Date.now() }));
    } catch { /* ignore */ }
  }, [storageKey]);

  // Trigger a debounced save whenever payload changes
  useEffect(() => {
    if (!enabled) return;

    setStatus("pending");
    pendingRef.current = true;

    // Always save to localStorage immediately (zero-latency fallback)
    persistToLocalStorage();

    // Debounced DB save
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void persistToDb();
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    payload.title, payload.slug, payload.subtitle, payload.excerpt,
    payload.content, payload.featuredImage, payload.featuredImageAlt,
    payload.categoryId, payload.authorId, payload.status,
    payload.seoTitle, payload.seoDescription, payload.primaryKeyword,
    enabled,
  ]);

  // Heartbeat: force a save every 15 seconds if there are pending changes
  useEffect(() => {
    if (!enabled || !postId) return;

    heartbeatRef.current = setInterval(() => {
      if (pendingRef.current) {
        void persistToDb();
      }
    }, HEARTBEAT_MS);

    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, [enabled, postId, persistToDb]);

  // Save before the user leaves the page (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pendingRef.current) {
        persistToLocalStorage();
        e.preventDefault();
        e.returnValue = "Existem alterações não guardadas. Tem a certeza que quer sair?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [persistToLocalStorage]);

  return { status, lastSavedAt };
}
