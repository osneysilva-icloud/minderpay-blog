# Content Compass

MINDERPAY — BLOG PROFISSIONAL, SEO-FIRST E CMS ADMINISTRATIVO

Crie uma plataforma de conteúdo profissional chamada MinderPay, com foco em publicação de artigos, crescimento através de tráfego orgânico do Google e futura monetização através de publicidade, especialmente Google AdSense.

O projeto deve ser desenvolvido com arquitetura moderna, responsiva, rápida, segura, escalável e preparada para produção.

IMPORTANTE: não crie apenas uma landing page ou um mockup visual. Quero uma aplicação funcional, com frontend, backend, banco de dados, autenticação, área administrativa, gerenciamento de conteúdo, upload de imagens, SEO técnico e estrutura preparada para publicação real.

1. OBJETIVO DO PROJETO

O MinderPay será um portal/blog de conteúdo.

O objetivo principal é:

Publicar artigos regularmente.

Conseguir tráfego orgânico através dos mecanismos de busca.

Criar uma base de conteúdo escalável.

Preparar o site para monetização através de anúncios.

Permitir que o administrador controle todo o conteúdo através de um painel administrativo privado.

Ter excelente experiência em computadores, tablets e principalmente celulares.

O domínio de produção será:

minderpay.com

O projeto deve ser preparado para posteriormente ser hospedado na Vercel.

2. TECNOLOGIA E ARQUITETURA

Utilize uma arquitetura moderna e adequada para SEO.

Preferências:

Frontend moderno e responsivo.

Supabase como backend.

PostgreSQL através do Supabase.

Supabase Auth para autenticação administrativa.

Supabase Storage para imagens.

GitHub para versionamento.

Vercel para deploy de produção.

Código organizado e facilmente mantível.

Se a stack padrão do Lovable utilizar React/Next.js ou tecnologia equivalente, escolha a opção que ofereça melhor desempenho, SEO e compatibilidade com Vercel.

Não criar dados fictícios como se fossem dados reais.

Onde forem necessários dados iniciais apenas para demonstração, deixe claramente identificados como conteúdo de exemplo e permita removê-los.

3. IDENTIDADE VISUAL

Nome:

MinderPay

Crie uma identidade visual moderna, profissional e confiável.

O design deve transmitir:

tecnologia

informação

negócios

dinheiro

empreendedorismo

credibilidade

Não quero aparência de template genérico.

Quero um design editorial moderno, semelhante à qualidade visual de grandes portais de conteúdo.

Utilize bastante espaço em branco, excelente hierarquia visual, tipografia profissional e componentes consistentes.

O design deve funcionar perfeitamente em:

Desktop

Tablet

Mobile

No mobile, o site deve continuar extremamente fácil de navegar.

4. ESTRUTURA DO SITE PÚBLICO

Criar as seguintes páginas:

Home

/

A página inicial deve conter:

Header

Logo MinderPay

Menu de navegação

Campo de pesquisa

Área de destaque

Artigos recentes

Artigos populares

Categorias

Artigos recomendados

Espaços reservados para publicidade

Newsletter opcional

Footer

A Home deve parecer um portal profissional de conteúdo, e não uma simples página de blog.

5. HEADER

Criar header responsivo.

Desktop:

Logo MinderPay à esquerda.

Menu no centro.

Pesquisa à direita.

Mobile:

Logo.

Botão de menu.

Botão de pesquisa.

O menu deve poder ser alterado posteriormente através do código de forma simples.

Categorias inicialmente sugeridas:

Dinheiro

Negócios

Marketing

Tecnologia

Empreendedorismo

Finanças

Tutoriais

Ferramentas

As categorias devem vir do banco de dados sempre que possível, para que possam ser administradas pelo painel.

6. PÁGINA DE ARTIGO

Criar uma página individual para cada artigo.

Estrutura:

Breadcrumb

Categoria

Título

Subtítulo/resumo

Autor

Data de publicação

Data de atualização

Tempo estimado de leitura

Imagem destacada

Conteúdo do artigo

Compartilhamento social

Espaço publicitário

Artigos relacionados

Artigos da mesma categoria

Exemplo de URL:

/blog/como-ganhar-dinheiro-pela-internet

ou

/como-ganhar-dinheiro-pela-internet

Escolha uma estrutura limpa e consistente.

Não utilizar IDs numéricos nas URLs.

7. EDITOR DE ARTIGOS

Criar no painel administrativo um editor completo.

O administrador deve poder criar artigos contendo:

Título

Slug

Subtítulo

Conteúdo

Imagem destacada

Categoria

Tags

Autor

Data de publicação

Data de atualização

Status

Meta title

Meta description

Palavra-chave principal

Excerpt/resumo

Alt text da imagem

Canonical URL

Imagem Open Graph

O editor deve permitir:

H1/H2/H3

Negrito

Itálico

Listas

Links

Citações

Imagens

Tabelas

Separadores

Vídeos incorporados

Código quando necessário

O conteúdo deve ser armazenado de forma segura no Supabase.

8. STATUS DOS ARTIGOS

Cada artigo deve possuir:

Draft

Published

Scheduled

Archived

Permitir:

Salvar rascunho.

Publicar imediatamente.

Agendar publicação.

Arquivar.

Editar artigo publicado.

Ao editar um artigo publicado, atualizar automaticamente a data de atualização quando apropriado.

9. ÁREA ADMINISTRATIVA

Criar uma área privada:

/admin

Ela NÃO deve ser acessível publicamente sem autenticação.

Criar:

/admin/login

Após login:

/admin/dashboard

O painel deve ser profissional e responsivo.

10. AUTENTICAÇÃO E SEGURANÇA

Utilizar Supabase Auth.

Somente o administrador autorizado poderá acessar o painel.

Não criar senha fixa dentro do código.

Não armazenar senha em frontend.

Não expor service role key.

Utilizar variáveis de ambiente para credenciais.

Implementar proteção de rotas administrativas.

Se o usuário não estiver autenticado e tentar acessar:

/admin

deve ser redirecionado para:

/admin/login

O administrador deve conseguir fazer logout.

Preparar a arquitetura para Row Level Security (RLS) no Supabase.

11. ADMIN DASHBOARD

Criar dashboard com:

Total de artigos

Publicados

Rascunhos

Agendados

Categorias

Tags

Visualizações, caso posteriormente seja integrado analytics

Últimos artigos publicados

Artigos recentemente editados

Adicionar atalhos:

Novo artigo

Gerenciar artigos

Categorias

Tags

Media

Configurações

12. GERENCIAMENTO DE ARTIGOS

Criar:

/admin/posts

Tabela com:

Título

Categoria

Status

Autor

Data

Data de atualização

Ações

Ações:

Editar

Visualizar

Publicar

Despublicar

Arquivar

Excluir

Adicionar:

Pesquisa

Filtro por categoria

Filtro por status

Ordenação por data

Adicionar confirmação antes de excluir permanentemente.

13. CATEGORIAS

Criar gerenciamento de categorias.

Cada categoria deve possuir:

Nome

Slug

Descrição

Imagem opcional

SEO title

SEO description

URLs:

/categoria/nome-da-categoria

ou estrutura equivalente limpa.

As categorias devem ser administráveis pelo painel.

14. TAGS

Criar gerenciamento de tags.

Cada tag deve possuir:

Nome

Slug

Permitir adicionar múltiplas tags aos artigos.

15. MEDIA LIBRARY

Criar uma biblioteca de mídia.

Utilizar Supabase Storage.

O administrador deve conseguir:

Fazer upload

Visualizar imagens

Copiar/selecionar imagem

Excluir imagens

Utilizar imagens nos artigos

Ao fazer upload, permitir definir:

Nome

Alt text

Descrição opcional

O sistema deve otimizar as imagens sempre que possível.

Evitar imagens excessivamente grandes.

Utilizar formatos modernos quando possível, como WebP/AVIF.

16. SEO — PRIORIDADE MÁXIMA

O site deve ser construído com SEO desde a arquitetura inicial.

Não quero SEO apenas através de meta tags básicas.

Implementar:

Title dinâmico

Meta description dinâmica

Canonical URL

Open Graph

Twitter/X Cards

Robots meta

Sitemap XML

Robots.txt

Breadcrumbs

Dados estruturados

URLs amigáveis

Internal linking

HTML semanticamente correto

17. DADOS ESTRUTURADOS

Implementar Schema.org quando apropriado.

Para artigos:

Article ou BlogPosting.

Incluir:

headline

description

image

datePublished

dateModified

author

publisher

mainEntityOfPage

Também implementar:

BreadcrumbList

Website

SearchAction quando apropriado.

Os dados estruturados devem ser válidos e não devem conter informações falsas.

18. SITEMAP

Criar sitemap XML automaticamente.

O sitemap deve incluir apenas URLs públicas e indexáveis.

Não incluir:

/admin

/admin/login

páginas privadas

rascunhos

conteúdo arquivado

URLs que estejam explicitamente marcadas como noindex

Quando um novo artigo for publicado, o sitemap deve refletir a nova URL automaticamente.

19. ROBOTS.TXT

Criar robots.txt adequado.

Bloquear a indexação de:

/admin

/admin/*

e outras áreas privadas.

Permitir rastreamento das páginas públicas.

Incluir referência ao sitemap.

20. CONTROLE SEO POR ARTIGO

No painel, o administrador deve conseguir definir:

SEO Title

Meta Description

Canonical URL

Robots:

index/noindex

follow/nofollow

Open Graph title

Open Graph description

Open Graph image

Primary keyword

Slug

Alt text

Não obrigar o administrador a preencher tudo manualmente quando não for necessário.

Criar valores automáticos inteligentes baseados no título e conteúdo, mas permitir edição manual.

21. SEO DE CATEGORIAS

Cada categoria deve possuir:

SEO Title

SEO Description

Slug

Descrição

Controle index/noindex.

22. PESQUISA

Criar sistema de pesquisa.

Página:

/pesquisa?q=termo

ou estrutura equivalente.

Pesquisar por:

título

resumo

conteúdo

tags

categorias

Mostrar resultados relevantes.

Criar página de resultados limpa e rápida.

A pesquisa deve funcionar bem no mobile.

23. ARTIGOS RELACIONADOS

No final de cada artigo mostrar:

"Leia também"

Selecionar artigos relacionados com base em:

categoria

tags

relevância

Evitar recomendar o próprio artigo.

24. LINKS INTERNOS

Criar estrutura que facilite links internos.

Os artigos devem poder linkar para outros artigos.

No futuro quero construir uma grande rede de conteúdo.

A arquitetura deve facilitar isso.

25. VELOCIDADE

Performance é prioridade.

O site deve:

minimizar JavaScript desnecessário

otimizar imagens

utilizar lazy loading

utilizar cache quando apropriado

evitar bibliotecas pesadas desnecessárias

carregar fontes de maneira eficiente

evitar layout shift

otimizar Core Web Vitals

Objetivo:

Excelente desempenho no Google PageSpeed Insights.

26. MOBILE FIRST

Construir pensando primeiro no celular.

O site deve ser:

totalmente responsivo

fácil de tocar

menus adequados

fontes legíveis

imagens adaptáveis

botões suficientemente grandes

sem elementos quebrando horizontalmente

O artigo deve ter excelente experiência de leitura no celular.

27. MONETIZAÇÃO POR ANÚNCIOS

Preparar o site para Google AdSense.

Não inserir anúncios falsos como se já estivessem ativos.

Criar componentes reutilizáveis:

AdSlot

que posteriormente poderão receber o código real do AdSense.

Criar posições:

Header ad

Top article ad

In-content ad

Sidebar ad

Bottom article ad

Related articles ad

Os componentes devem ser facilmente ativados/desativados.

Criar configuração administrativa para controlar se determinados espaços de publicidade estão ativos.

IMPORTANTE:

Não implementar mecanismos para gerar cliques artificiais.

Não incentivar cliques em anúncios.

Não utilizar técnicas que violem políticas de publicidade.

28. GOOGLE ANALYTICS

Preparar integração com Google Analytics.

Criar configuração para inserir:

GA Measurement ID

através de variável de ambiente ou configuração segura.

Não colocar IDs fictícios.

Se o ID não estiver configurado, não carregar Analytics.

29. GOOGLE SEARCH CONSOLE

Preparar o site para verificação do Google Search Console.

Não inventar códigos de verificação.

Criar estrutura que permita posteriormente adicionar:

Google Search Console verification

através de configuração apropriada.

30. PÁGINAS INSTITUCIONAIS

Criar:

/sobre

/contacto

/politica-de-privacidade

/politica-de-cookies

/termos-de-uso

Essas páginas devem possuir design consistente com o resto do site.

O conteúdo deve ser facilmente editável posteriormente.

31. CONTACTO

Criar página de contacto profissional.

Campos:

Nome

Email

Assunto

Mensagem

Botão Enviar.

Adicionar validação.

Não expor credenciais.

Caso ainda não exista serviço de envio de emails configurado, criar a estrutura preparada para integração futura.

32. FOOTER

Footer profissional contendo:

Logo MinderPay

Descrição curta

Categorias

Links institucionais

Política de Privacidade

Termos

Contacto

Redes sociais, caso configuradas

Copyright dinâmico.

33. AUTOR

Criar sistema de autor.

Cada artigo deve possuir:

Nome

Foto

Biografia

Slug

Links sociais opcionais

Página do autor:

/autor/nome

Mostrar artigos publicados pelo autor.

34. NEWSLETTER

Preparar uma área de newsletter.

Não precisa necessariamente estar integrada inicialmente.

Criar componente que possa futuramente ser conectado a:

Brevo

Mailchimp

ConvertKit

ou outro serviço.

Não criar inscrições falsas.

35. CONTEÚDO

Não quero conteúdo Lorem Ipsum.

Criar alguns artigos de demonstração apenas para validar o design, claramente identificados como exemplos.

Depois, o administrador poderá excluir esses artigos e começar a publicar os artigos reais.

36. ESTRUTURA DO BANCO SUPABASE

Criar uma estrutura adequada.

Tabelas sugeridas:

profiles

posts

categories

tags

post_tags

media

authors

site_settings

advertisement_slots

newsletter_subscribers

contact_messages

redirects

analytics_settings

Cada tabela deve possuir:

ID

created_at

updated_at

Quando apropriado.

37. POSTS

A tabela posts deve possuir campos equivalentes a:

id

title

slug

excerpt

content

featured_image

featured_image_alt

author_id

category_id

status

published_at

updated_at

seo_title

seo_description

canonical_url

robots_index

robots_follow

og_title

og_description

og_image

reading_time

created_at

updated_at

38. SLUGS

Garantir que os slugs sejam únicos.

Exemplo:

/como-ganhar-dinheiro-online

Não permitir duas páginas públicas com o mesmo slug.

Quando um slug de artigo publicado for alterado, considerar criação de redirect 301 do slug antigo para o novo.

Criar tabela:

redirects

com:

old_path

new_path

status_code

39. RLS E SEGURANÇA DO SUPABASE

Implementar Row Level Security corretamente.

Visitantes públicos podem:

ler artigos publicados

ler categorias públicas

ler tags públicas

ler autores públicos

Visitantes NÃO podem:

criar artigos

editar artigos

excluir artigos

acessar dados administrativos

acessar mensagens privadas

acessar configurações privadas

Somente o administrador autenticado poderá gerenciar o conteúdo.

40. ADMINISTRADOR

Inicialmente haverá somente um administrador.

Não criar sistema aberto de registro administrativo.

Não mostrar botão "Criar conta de administrador" publicamente.

O administrador será criado/configurado de forma segura através do Supabase Auth.

Criar possibilidade futura de adicionar outros administradores sem precisar reconstruir a aplicação.

41. CONFIGURAÇÕES DO SITE

Criar:

/admin/settings

Configurações:

Nome do site

Descrição

Logo

Favicon

Email de contacto

URL do site

Google Analytics ID

Google Search Console verification

AdSense Publisher ID

Redes sociais

Default SEO Title

Default SEO Description

Default OG Image

Essas configurações devem ser armazenadas no Supabase quando apropriado.

42. FAVICON E BRANDING

Preparar:

favicon

logo

Open Graph default image

ícones necessários

Se ainda não houver logo fornecido, criar uma versão textual elegante "MinderPay" que possa posteriormente ser substituída.

43. 404

Criar uma página 404 profissional.

Mensagem amigável.

Botão:

Voltar para início.

Sugestões de artigos.

Não deixar páginas de erro com aparência quebrada.

44. REDIRECTS

Criar suporte para redirects 301 através da tabela redirects.

Isso será importante para SEO quando URLs forem alteradas.

45. INDEXAÇÃO

Somente conteúdo publicado deve ser indexável.

Rascunhos:

noindex

Páginas administrativas:

noindex

Resultados internos de pesquisa:

avaliar noindex para evitar indexação de páginas de baixa utilidade.

Criar canonical correto para páginas públicas.

46. ACESSIBILIDADE

Implementar:

HTML semântico

labels

alt text

navegação por teclado

contraste adequado

aria-label quando necessário

foco visível

botões acessíveis

47. SEGURANÇA

Não expor:

Supabase service role key

credenciais

tokens privados

segredos

Não colocar credenciais diretamente no código.

Utilizar environment variables.

Sanitizar conteúdo quando necessário.

Proteger formulários contra abuso.

Validar uploads.

Limitar tipos de arquivos permitidos.

48. SEO INTERNACIONAL

Preparar o projeto para português.

Idioma principal:

pt

ou pt-PT conforme apropriado.

Utilizar:

lang="pt"

e estrutura correta de idioma.

Preparar arquitetura para futuramente adicionar outros idiomas sem precisar reconstruir todo o site.

49. ESTRUTURA DE URL

Priorizar URLs curtas e descritivas.

Exemplo:

minderpay.com/

minderpay.com/blog/

minderpay.com/blog/como-ganhar-dinheiro-online

minderpay.com/categoria/marketing

minderpay.com/autor/nome

Evitar:

/post?id=123

URLs com parâmetros desnecessários.

50. BLOG INDEX

Criar:

/blog

Mostrar:

artigos recentes

filtros por categoria

paginação

busca

cards de artigos

A paginação deve ser SEO-friendly.

Evitar carregar centenas de artigos de uma só vez.

51. PAGINAÇÃO

Implementar paginação adequada.

Exemplo:

/blog?page=2

ou equivalente.

Não utilizar apenas infinite scroll se isso prejudicar descoberta e navegação.

52. IMAGENS

Todas as imagens devem possuir:

alt text

width

height

quando possível.

Evitar layout shift.

Imagens devem ser responsivas.

53. COMPONENTES REUTILIZÁVEIS

Criar componentes reutilizáveis para:

Header

Footer

ArticleCard

FeaturedArticle

CategoryCard

SearchBar

Breadcrumbs

AuthorBox

RelatedPosts

AdSlot

Newsletter

SocialShare

Pagination

SEOHead

54. ADMIN UX

O painel administrativo deve ser simples.

Eu não quero um painel excessivamente complicado.

Fluxo principal:

Dashboard

↓

Novo artigo

↓

Escrever

↓

SEO

↓

Imagem

↓

Preview

↓

Publicar

O processo de publicação deve ser rápido.

55. PREVIEW

Adicionar botão:

"Visualizar"

Antes de publicar.

O administrador deve conseguir ver como o artigo ficará no site público.

56. AUTOSAVE

Se possível, implementar autosave de rascunho.

Evitar perda de conteúdo caso o navegador seja fechado acidentalmente.

Se autosave não puder ser implementado de forma confiável, implementar aviso de alterações não salvas.

57. CONFIRMAÇÕES

Antes de:

Excluir artigo

Excluir categoria

Excluir imagem

Despublicar artigo

mostrar confirmação.

58. ERROS

Mostrar mensagens claras.

Exemplo:

"Artigo publicado com sucesso."

"Não foi possível salvar o artigo."

"Imagem enviada com sucesso."

Não mostrar mensagens técnicas desnecessárias ao usuário.

Registrar erros técnicos no console apenas quando apropriado.

59. BANCO E MIGRAÇÕES

Criar as tabelas e relações necessárias no Supabase.

Não apenas simular o banco no frontend.

A aplicação precisa realmente persistir os dados.

Criar migrations quando apropriado.

60. VERCEL

O projeto deve ser preparado para deploy na Vercel.

Não utilizar recursos incompatíveis com Vercel sem necessidade.

Todas as configurações sensíveis devem estar em environment variables.

Preparar:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

e demais variáveis necessárias.

Nunca expor chaves privadas.

61. DOMÍNIO

O domínio de produção será:

minderpay.com

Preparar a aplicação para funcionar corretamente nesse domínio.

Não hardcodar localhost como URL definitiva.

Criar configuração para:

NEXT_PUBLIC_SITE_URL

Valor de produção:

https://minderpay.com

Usar essa variável para:

canonical

sitemap

Open Graph

Schema

URLs absolutas

redirects quando necessário

62. PRODUÇÃO

Antes de considerar o projeto concluído, verificar:

autenticação

Supabase

CRUD de artigos

categorias

tags

upload

SEO

sitemap

robots

páginas públicas

responsividade

performance

segurança

redirects

404

variáveis de ambiente

63. CHECKLIST DE SEO

Antes de finalizar, verificar:

[ ] Cada página possui title único.

[ ] Cada página importante possui meta description.

[ ] Artigos possuem canonical.

[ ] Artigos possuem Article/BlogPosting schema.

[ ] Breadcrumbs possuem schema.

[ ] Sitemap funciona.

[ ] Robots.txt funciona.

[ ] /admin está bloqueado para indexação.

[ ] Rascunhos não são indexáveis.

[ ] URLs são amigáveis.

[ ] Imagens possuem alt text.

[ ] Site possui boa estrutura de headings.

[ ] Site é responsivo.

[ ] Links internos funcionam.

[ ] Links quebrados não existem.

[ ] Página 404 funciona.

[ ] Open Graph funciona.

[ ] Favicon está configurado.

[ ] Site possui configuração de domínio.

[ ] Google Search Console poderá ser configurado.

[ ] Google Analytics poderá ser configurado.

[ ] AdSense poderá ser configurado.

64. IMPORTANTE SOBRE GOOGLE E SEO

Não utilizar técnicas de black hat SEO.

Não gerar páginas automaticamente de baixa qualidade.

Não criar conteúdo duplicado.

Não esconder palavras-chave.

Não criar keyword stuffing.

Não criar páginas falsas exclusivamente para mecanismos de busca.

A arquitetura deve favorecer conteúdo original, útil e de alta qualidade.

65. DESIGN DOS ARTIGOS

O artigo deve priorizar leitura.

Não quero excesso de elementos.

Usar:

largura confortável para leitura

tipografia adequada

espaçamento generoso

títulos claros

parágrafos curtos

imagens bem posicionadas

caixas de destaque quando apropriado

citações

listas

No mobile, a experiência deve ser excelente.

66. PUBLICIDADE SEM PREJUDICAR UX

Os anúncios devem ser inseridos de forma que não destruam a experiência de leitura.

Não colocar anúncios:

sobre o texto

sobre botões

escondidos

de forma enganosa

em excesso

Criar espaços reservados claramente separados do conteúdo.

67. PREPARAÇÃO PARA ESCALA

A arquitetura deve suportar inicialmente centenas e posteriormente milhares de artigos.

Não criar lógica que dependa de dados hardcoded.

Categorias, tags, autores e artigos devem vir do banco.

O frontend público deve buscar apenas os dados necessários.

68. ENTREGA

Ao finalizar, quero uma aplicação funcional.

Não quero somente telas estáticas.

Verifique todos os fluxos principais.

Corrija erros encontrados.

Não deixe botões sem função.

Não deixe links quebrados.

Não use dados falsos como se fossem reais.

Se alguma integração externa exigir uma chave que ainda não foi fornecida, criar a estrutura correta e deixar claramente indicado onde a chave será adicionada posteriormente.

69. PRIORIDADE DE IMPLEMENTAÇÃO

Implemente nesta ordem:

FASE 1
Arquitetura + design + páginas públicas.

FASE 2
Supabase + banco de dados.

FASE 3
Autenticação + segurança.

FASE 4
Admin Dashboard.

FASE 5
CMS de artigos.

FASE 6
Categorias + tags + autores.

FASE 7
Media Library + Supabase Storage.

FASE 8
SEO técnico completo.

FASE 9
Sitemap + robots + Schema.

FASE 10
Publicidade + Analytics.

FASE 11
Performance + acessibilidade.

FASE 12
Preparação para GitHub + Vercel + domínio.

70. REGRA FINAL

Antes de implementar qualquer funcionalidade, priorize:

Segurança

SEO

Performance

Experiência do usuário

Escalabilidade

Facilidade de administração

O resultado final deve parecer um portal de conteúdo profissional, e não um projeto experimental criado por IA.

O MinderPay deve estar preparado para crescer através de conteúdo orgânico, receber tráfego do Google e posteriormente ser monetizado com anúncios.

Comece pela implementação da aplicação completa e funcional seguindo toda a especificação acima.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/067e8cae-9147-4761-9092-9ba79455772d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
