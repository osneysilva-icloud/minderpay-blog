import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — MinderPay" },
      { name: "description", content: "Leia as regras e diretrizes de utilização do portal MinderPay." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/termos-de-uso") },
    ],
  }),
  component: TermsOfUseView,
});

function TermsOfUseView() {
  return (
    <SiteLayout>
      <div className="container-page py-12 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl">
          Termos de Uso
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: 14 de agosto de 2026
        </p>

        <div className="prose prose-stone dark:prose-invert mt-8 max-w-none text-foreground leading-relaxed space-y-6">
          <p>
            Bem-vindo ao MinderPay. Ao aceder e utilizar este website, concorda em cumprir e ficar vinculado aos seguintes Termos de Uso. Se não concordar com alguma parte destes termos, por favor, não utilize o nosso website.
          </p>

          <h2>Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo original publicado no MinderPay (incluindo textos, logótipos e imagens próprias) é propriedade intelectual do portal e está protegido pelas leis de direitos de autor. O uso não autorizado ou a cópia integral de artigos sem autorização prévia por escrito é estritamente proibido.
          </p>

          <h2>Isenção de Responsabilidade Financeira</h2>
          <p>
            Os conteúdos disponibilizados no portal MinderPay têm caráter meramente informativo e educacional. Não constituem aconselhamento financeiro, fiscal, de investimento ou de negócios profissional. Recomenda-se que o utilizador consulte profissionais qualificados antes de tomar qualquer decisão financeira ou de investimento baseada em informações aqui publicadas.
          </p>

          <h2>Limitação de Responsabilidade</h2>
          <p>
            Fazemos todos os esforços para garantir a exatidão da informação publicada, mas não garantimos que a mesma esteja sempre atualizada, completa ou isenta de erros. O MinderPay não será responsável por quaisquer perdas ou danos decorrentes da utilização ou confiança nas informações disponibilizadas neste portal.
          </p>

          <h2>Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, sem aviso prévio. As alterações tornam-se eficazes imediatamente após a sua publicação no site.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
