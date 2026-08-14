import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { sendContactMessage } from "@/lib/public.functions";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — MinderPay" },
      { name: "description", content: "Entre em contacto com a equipa do MinderPay para parcerias, sugestões ou dúvidas." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/contacto") },
    ],
  }),
  component: ContactView,
});

function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await sendContactMessage({ name, email, subject, message });
      toast.success("Mensagem enviada com sucesso! Responderemos o mais breve possível.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Não foi possível enviar a sua mensagem. Tente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <div className="container-page py-12">
        <div className="border-b border-border pb-6">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl">
            Contacto
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tem alguma sugestão, proposta de parceria ou dúvida? Escreva-nos.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Information Column */}
          <div className="space-y-6 lg:col-span-1">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-700 text-foreground">
              Canais de Contacto
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tentamos responder a todas as mensagens legítimas no prazo máximo de 48 horas úteis.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Email Geral</span>
                  <a href="mailto:contacto@minderpay.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contacto@minderpay.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Sede</span>
                  <span className="text-muted-foreground">Porto, Portugal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
                    Nome Completo <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder="O seu nome…"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
                    Email de Contacto <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-xs font-semibold text-foreground">
                  Assunto da Mensagem <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={loading}
                  placeholder="Sobre o que deseja falar…"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
                  Mensagem <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                  placeholder="Escreva a sua mensagem em detalhe…"
                  className="resize-y"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full sm:w-auto h-11 rounded-lg px-8 font-semibold">
                {loading ? "A enviar…" : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
