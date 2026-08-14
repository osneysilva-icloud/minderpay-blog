import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — MinderPay" },
      { name: "description", content: "Conheça a política de privacidade e proteção de dados pessoais do MinderPay." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/politica-de-privacidade") },
    ],
  }),
  component: PrivacyPolicyView,
});

function PrivacyPolicyView() {
  return (
    <SiteLayout>
      <div className="container-page py-12 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: 14 de agosto de 2026
        </p>

        <div className="prose prose-stone dark:prose-invert mt-8 max-w-none text-foreground leading-relaxed space-y-6">
          <p>
            No MinderPay, acessível a partir de minderpay.com, uma das nossas principais prioridades é a privacidade dos nossos visitantes. Este documento de Política de Privacidade contém tipos de informações que são recolhidas e registadas pelo MinderPay e como as utilizamos.
          </p>

          <h2>Recolha de Informações</h2>
          <p>
            Recolhemos informações de identificação pessoal apenas quando nos envia mensagens através do nosso formulário de contacto ou subscreve a nossa newsletter (geralmente o seu nome e endereço de email).
          </p>

          <h2>Utilização dos Dados</h2>
          <p>
            Utilizamos as informações recolhidas para:
          </p>
          <ul>
            <li>Operar, manter e melhorar o nosso portal de conteúdo;</li>
            <li>Enviar emails e newsletters periódicas (caso tenha consentido explicitamente);</li>
            <li>Responder a emails de contacto e solicitações de parcerias;</li>
            <li>Monitorizar o tráfego do site e analisar padrões de utilização de forma anónima.</li>
          </ul>

          <h2>Ficheiros de Registo (Logs)</h2>
          <p>
            O MinderPay segue um procedimento padrão de utilização de ficheiros de registo. Estes ficheiros registam os visitantes quando estes visitam websites. As informações recolhidas incluem endereços IP, tipo de navegador, Provedor de Serviços de Internet (ISP), carimbo de data e hora, páginas de referência/saída e, possivelmente, o número de cliques. Estes dados não estão associados a nenhuma informação que seja pessoalmente identificável.
          </p>

          <h2>Parceiros Publicitários (Google AdSense)</h2>
          <p>
            O Google é um dos fornecedores terceiros no nosso site. Ele utiliza cookies, conhecidos como cookies DART, para veicular anúncios aos visitantes do nosso site com base nas suas visitas a minderpay.com e a outros sites na Internet. Poderá optar por recusar o uso de cookies DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.
          </p>

          <h2>Segurança</h2>
          <p>
            Empregamos medidas de segurança técnicas e administrativas razoáveis para proteger as suas informações contra perda, roubo, acesso não autorizado ou divulgação.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
