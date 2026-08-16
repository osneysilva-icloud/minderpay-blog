import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X, Check } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or rejected cookies
    const consent = localStorage.getItem("minderpay_cookie_consent");
    if (!consent) {
      // Show banner after 1.5s delay for smooth entrance animation
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("minderpay_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("minderpay_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-2xl text-card-foreground">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-primary">
            <Cookie className="size-5 shrink-0 animate-bounce" />
            <h3 className="font-semibold text-sm text-foreground">Valorizamos a sua privacidade</h3>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Fechar aviso de cookies"
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
          Utilizamos cookies essenciais, analíticos e de publicidade (incluindo Google AdSense) para melhorar a sua experiência de navegação e apresentar conteúdos personalizados. Saiba mais na nossa{" "}
          <Link to="/politica-de-cookies" className="text-primary underline hover:text-primary/80 font-medium">
            Política de Cookies
          </Link>{" "}
          e{" "}
          <Link to="/politica-de-privacidade" className="text-primary underline hover:text-primary/80 font-medium">
            Política de Privacidade
          </Link>.
        </p>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-xl px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
          >
            Apenas Essenciais
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            <Check className="size-3.5" />
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
