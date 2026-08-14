import { useState } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/public.functions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Newsletter({ source = "home" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await subscribeToNewsletter({ email, source });
      toast.success("Subscrição concluída com sucesso! Obrigado.");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Erro ao efetuar a subscrição.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 md:p-8">
      <h3 className="font-[family-name:var(--font-display)] text-xl font-700 tracking-tight text-foreground md:text-2xl">
        Mantenha-se informado
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Receba os melhores artigos sobre dinheiro, negócios e tecnologia diretamente no seu email. Sem spam.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Endereço de email
          </label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="O seu endereço de email…"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="h-11 w-full rounded-lg bg-background"
          />
        </div>
        <Button type="submit" disabled={loading} className="h-11 rounded-lg px-6 font-semibold">
          {loading ? "A subscrever…" : "Subscrever"}
        </Button>
      </form>
    </div>
  );
}
