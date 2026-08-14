import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — MinderPay" },
      {
        name: "description",
        content:
          "Saiba como o MinderPay utiliza cookies essenciais, de análise (Google Analytics) e de publicidade (Google AdSense) e como as pode gerir.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/politica-de-cookies") }],
  }),
  component: CookiesPolicyView,
});

function CookiesPolicyView() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="border-b border-border bg-gradient-to-br from-muted/60 to-background py-14">
        <div className="container-page max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Informação Legal
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Política de Cookies
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Última atualização:{" "}
            <time dateTime="2026-08-01">agosto de 2026</time>
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="container-page py-14 max-w-3xl">
        <div className="prose prose-stone dark:prose-invert max-w-none text-foreground leading-relaxed space-y-10">

          {/* Intro */}
          <section>
            <p>
              Esta Política de Cookies descreve como o <strong>MinderPay</strong> (acessível em{" "}
              <strong>minderpay.com</strong>), gerido por <strong>Minder Ads</strong>, utiliza
              cookies e tecnologias semelhantes quando visita o nosso website. Explica o que são
              esses cookies, porque os utilizamos e quais são os seus direitos em relação ao seu
              uso.
            </p>
            <p>
              Em certos casos, utilizamos cookies para garantir que o site funcione corretamente
              e, noutros, para nos ajudar a compreender como os visitantes o utilizam e para
              exibir anúncios relevantes. A sua privacidade é uma prioridade para nós.
            </p>
          </section>

          {/* O que são cookies */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              1. O Que São Cookies?
            </h2>
            <p>
              Cookies são pequenos ficheiros de texto que um website coloca no seu dispositivo
              (computador, smartphone ou tablet) quando o visita. Estes ficheiros são armazenados
              pelo seu navegador de Internet (browser) e permitem que o site se lembre de
              informações sobre a sua visita, como as suas preferências de idioma ou sessão de
              início de sessão.
            </p>
            <p>
              Os cookies podem ser <strong>de sessão</strong> (eliminados quando fecha o browser)
              ou <strong>persistentes</strong> (permanecem no dispositivo por um período definido).
              Podem ser definidos por nós (<em>cookies primários</em>) ou por serviços de
              terceiros que integramos no site (<em>cookies de terceiros</em>).
            </p>
          </section>

          {/* Tipos de cookies */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              2. Que Tipos de Cookies Utilizamos?
            </h2>

            {/* Essenciais */}
            <div className="rounded-2xl border border-border bg-card p-5 mb-4 not-prose">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 text-base">
                  🔒
                </span>
                <div>
                  <h3 className="font-bold text-foreground">Cookies Essenciais / Funcionais</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Estes cookies são estritamente necessários para o funcionamento básico do
                    site. Sem eles, determinadas funcionalidades, como a autenticação segura na
                    área de administração, não funcionariam corretamente. Estes cookies não
                    recolhem qualquer informação pessoal identificável e <strong>não podem ser
                    desativados</strong> sem comprometer a utilização do site.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <strong>Base legal:</strong> Interesse legítimo / necessidade contratual.
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="rounded-2xl border border-border bg-card p-5 mb-4 not-prose">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400 text-base">
                  📊
                </span>
                <div>
                  <h3 className="font-bold text-foreground">
                    Cookies de Análise e Estatísticas (Google Analytics)
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Utilizamos o <strong>Google Analytics</strong> para recolher informações
                    anónimas sobre como os visitantes utilizam o nosso site, incluindo páginas
                    visitadas, tempo de permanência, fontes de tráfego e interações com o
                    conteúdo. Estes dados ajudam-nos a melhorar a experiência de leitura e a
                    produzir conteúdo mais relevante.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Os dados recolhidos são anonimizados e não permitem identificar utilizadores
                    individualmente. O Google pode transferir estas informações para terceiros nos
                    termos exigidos por lei ou quando esses terceiros processem as informações em
                    nome do Google.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <strong>Cookies principais:</strong> _ga, _gid, _gat | <strong>Duração:</strong>{" "}
                    até 2 anos | <strong>Base legal:</strong> Consentimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Publicidade */}
            <div className="rounded-2xl border border-border bg-card p-5 not-prose">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 text-base">
                  📣
                </span>
                <div>
                  <h3 className="font-bold text-foreground">
                    Cookies de Publicidade (Google AdSense)
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    O nosso site utiliza o <strong>Google AdSense</strong> para exibir anúncios
                    publicitários. O Google utiliza cookies para exibir anúncios com base nas
                    suas visitas anteriores ao nosso site ou a outros sites da Internet. A
                    utilização destes cookies permite ao Google e aos seus parceiros apresentar
                    anúncios mais relevantes para os seus interesses e limitar o número de vezes
                    que o mesmo anúncio lhe é mostrado.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pode optar por não participar na publicidade personalizada acedendo às{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      Definições de Anúncios do Google
                    </a>
                    .
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <strong>Cookies principais:</strong> IDE, DSID, FLC, AID, TAID |{" "}
                    <strong>Duração:</strong> até 13 meses | <strong>Base legal:</strong>{" "}
                    Consentimento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies de terceiros */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              3. Cookies de Terceiros (Google)
            </h2>
            <p>
              O nosso site incorpora serviços fornecidos pela Google LLC, uma empresa sediada nos
              Estados Unidos da América. Como resultado, cookies pertencentes ao domínio{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.google.com</code> e outros
              domínios associados podem ser colocados no seu dispositivo.
            </p>
            <p>
              A Google possui as suas próprias políticas de privacidade e de cookies que
              recomendamos que leia:
            </p>
            <ul className="mt-3 space-y-2 text-sm pl-5 list-disc">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Política de Privacidade da Google
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Como a Google utiliza cookies
                </a>
              </li>
              <li>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Definições de anúncios da Google
                </a>
              </li>
            </ul>
          </section>

          {/* Gerir cookies */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              4. Como Gerir e Desativar Cookies
            </h2>
            <p>
              Tem o direito de aceitar ou recusar cookies não essenciais. A maioria dos
              navegadores permite que controle os cookies através das suas definições. Abaixo
              encontrará instruções para os principais browsers:
            </p>

            <div className="mt-4 not-prose grid gap-3 sm:grid-cols-2">
              {[
                {
                  name: "Google Chrome",
                  url: "https://support.google.com/chrome/answer/95647",
                },
                {
                  name: "Mozilla Firefox",
                  url: "https://support.mozilla.org/pt-PT/kb/cookies-informacao-guardada-por-websites",
                },
                {
                  name: "Safari (macOS/iOS)",
                  url: "https://support.apple.com/pt-pt/guide/safari/sfri11471",
                },
                {
                  name: "Microsoft Edge",
                  url: "https://support.microsoft.com/pt-pt/microsoft-edge/eliminar-cookies-no-microsoft-edge",
                },
              ].map((browser) => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <span>{browser.name}</span>
                  <span className="text-primary text-xs">Ver instruções →</span>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30 not-prose">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                ⚠️ <strong>Atenção:</strong> A desativação de cookies pode afetar a
                funcionalidade de partes deste site e de outros websites que visita. Algumas
                funcionalidades podem deixar de funcionar corretamente.
              </p>
            </div>
          </section>

          {/* Opt-out Google Analytics */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              5. Opt-out do Google Analytics
            </h2>
            <p>
              Para evitar especificamente a recolha de dados pelo Google Analytics, pode
              instalar o{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                Add-on de Opt-out do Google Analytics
              </a>{" "}
              disponível para os principais browsers. Este complemento impede que o JavaScript
              do Google Analytics (ga.js, analytics.js e dc.js) partilhe dados de visita com o
              Google Analytics.
            </p>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              6. Alterações a Esta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir alterações
              nos cookies que utilizamos ou por outras razões operacionais, legais ou
              regulamentares. Recomendamos que reveja esta página regularmente para se manter
              informado sobre a nossa utilização de cookies.
            </p>
            <p>
              A data da última atualização encontra-se no topo desta página.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">
              7. Contacto
            </h2>
            <p>
              Se tiver quaisquer dúvidas sobre esta Política de Cookies ou sobre a forma como
              tratamos os seus dados pessoais, contacte-nos através dos seguintes meios:
            </p>

            <div className="mt-4 not-prose rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-foreground w-28 shrink-0">Email:</span>
                <a
                  href="mailto:suporteminderpay@gmail.com"
                  className="text-primary hover:underline underline-offset-2 break-all"
                >
                  suporteminderpay@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-foreground w-28 shrink-0">WhatsApp:</span>
                <a
                  href="https://wa.me/258864339593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-2"
                >
                  +258 864 339 593
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-foreground w-28 shrink-0">Responsável:</span>
                <span className="text-muted-foreground">Minder Ads</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
