import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos — MinderPay" },
      { name: "description", content: "Conheça a história, missão e valores do MinderPay — seu portal de dinheiro, negócios e tecnologia." },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/sobre") },
    ],
  }),
  component: AboutView,
});

function AboutView() {
  return (
    <SiteLayout>
      <div className="container-page py-12 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-700 leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Quem Somos
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          O MinderPay é um portal de informação independente focado em descomplicar os temas de dinheiro, negócios, marketing e tecnologia.
        </p>

        <div className="prose prose-stone dark:prose-invert mt-10 max-w-none text-foreground leading-relaxed space-y-6">
          <h2>A Nossa Missão</h2>
          <p>
            Acreditamos que o acesso a informação financeira e tecnológica clara e acionável é o primeiro passo para o crescimento pessoal e profissional. O nosso objetivo é produzir conteúdos práticos, livres de ruído e jargão técnico excessivo, servindo de bússola para empreendedores, freelancers e profissionais modernos.
          </p>

          <h2>O Que Partilhamos</h2>
          <ul>
            <li><strong>Dinheiro & Finanças:</strong> Dicas e guias práticos sobre poupança, orçamento familiar e planeamento financeiro.</li>
            <li><strong>Negócios & Empreendedorismo:</strong> Ideias de projetos, validação de mercado, estratégias de crescimento e gestão.</li>
            <li><strong>Marketing Digital:</strong> Como atrair tráfego orgânico, melhorar a conversão e criar marcas fortes online.</li>
            <li><strong>Tecnologia & Ferramentas:</strong> Tutoriais e análises das melhores ferramentas digitais para aumentar a produtividade e otimizar processos de trabalho.</li>
          </ul>

          <h2>Independência Editorial</h2>
          <p>
            Todos os nossos artigos e recomendações são baseados em pesquisas aprofundadas, testes de ferramentas e experiências reais da nossa equipa. A publicidade é exibida de forma transparente e claramente separada da área editorial, de forma a garantir a credibilidade e integridade do nosso portal.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
