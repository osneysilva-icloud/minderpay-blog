import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — MinderPay" },
      { name: "description", content: "Leia as diretrizes e termos sobre a utilização de cookies no portal MinderPay." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/politica-de-cookies") },
    ],
  }),
  component: CookiesPolicyView,
});

function CookiesPolicyView() {
  return (
    <SiteLayout>
      <div className="container-page py-12 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl">
          Política de Cookies
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: 14 de agosto de 2026
        </p>

        <div className="prose prose-stone dark:prose-invert mt-8 max-w-none text-foreground leading-relaxed space-y-6">
          <p>
            Esta é a Política de Cookies do MinderPay, acessível através do URL minderpay.com. Como é prática comum na quase totalidade dos websites profissionais, este site utiliza cookies, que são pequenos ficheiros descarregados para o seu computador, para melhorar a sua experiência.
          </p>

          <h2>O Que São Cookies</h2>
          <p>
            Cookies são ficheiros de texto simples que um website armazena no seu computador ou dispositivo móvel através do seu navegador de Internet (browser) quando o visita. Permitem que o site se lembre das suas ações e preferências (como início de sessão, idioma, tamanho da fonte e outras preferências de visualização) durante um período de tempo.
          </p>

          <h2>Como Utilizamos os Cookies</h2>
          <p>
            Utilizamos cookies por vários motivos detalhados abaixo:
          </p>
          <ul>
            <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento de determinadas funcionalidades de início de sessão e autenticação de segurança.</li>
            <li><strong>Cookies de Análise e Estatísticas:</strong> Fornecidos por parceiros como Google Analytics, que nos ajudam a medir o tráfego e interações no site para que possamos otimizar a experiência de leitura.</li>
            <li><strong>Cookies de Publicidade:</strong> O Google AdSense utiliza cookies para exibir anúncios mais relevantes e limitar o número de vezes que um anúncio lhe é mostrado.</li>
          </ul>

          <h2>Desativar Cookies</h2>
          <p>
            Pode impedir a configuração de cookies ajustando as definições do seu navegador (consulte a Ajuda do seu navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies poderá afetar a funcionalidade deste e de muitos outros websites que visita.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
