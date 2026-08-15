import { useEffect, useState } from "react";
import { Download, X, Share, PlusSquare, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("[PWA] Service Worker registrado com sucesso."))
        .catch((err) => console.log("[PWA] Erro ao registrar SW:", err));
    }

    // Check if already in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem("minderpay_pwa_dismissed");
    if (dismissedAt) {
      const days = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (days < 7) return; // Don't show again for 7 days
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    if (isIosDevice) {
      setShowBanner(true);
    }

    // Listen for Android/Desktop install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIosGuide(false);
    localStorage.setItem("minderpay_pwa_dismissed", Date.now().toString());
  };

  if (isInstalled || !showBanner) return null;

  return (
    <>
      {/* Floating Bottom PWA Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-gray-950/95 p-3.5 text-white shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 text-white font-bold text-lg shadow-md">
              MP
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">Instalar MinderPay</p>
              <p className="text-xs text-gray-300 truncate">Acesso rápido no seu ecrã principal</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              <Download className="size-3.5" />
              <span>Instalar</span>
            </button>
            <button
              onClick={handleDismiss}
              aria-label="Fechar"
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Guide for iOS Safari */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl text-foreground space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="size-5 text-primary" />
                <h3 className="font-bold text-base">Instalar no iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              No Safari, siga estes 2 passos simples para adicionar o MinderPay ao seu ecrã principal:
            </p>

            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  1
                </div>
                <div className="flex items-center gap-2">
                  <span>Toque no botão </span>
                  <Share className="size-4 text-primary shrink-0" />
                  <span className="font-bold text-foreground">Partilhar</span>
                  <span> na barra inferior.</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  2
                </div>
                <div className="flex items-center gap-2">
                  <span>Selecione </span>
                  <PlusSquare className="size-4 text-primary shrink-0" />
                  <span className="font-bold text-foreground">Adicionar ao Ecrã Principal</span>
                  <span>.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
