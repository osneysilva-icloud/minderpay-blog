# 🚀 Guia Passo a Passo: Colocando o seu Portal no Ar

Bem-vindo ao modelo oficial de Portal de Conteúdo e Blog Profissional! Este guia ensina como configurar o seu site do zero e colocá-lo no ar em menos de 15 minutos, utilizando serviços 100% gratuitos (GitHub, Supabase e Vercel).

---

## 📋 Pré-requisitos (Crie estas contas gratuitas)
1. **GitHub** ([github.com](https://github.com)) — Para guardar o código do seu site.
2. **Supabase** ([supabase.com](https://supabase.com)) — Para a base de dados, imagens e autenticação.
3. **Vercel** ([vercel.com](https://vercel.com)) — Para hospedar e publicar o site na internet.

---

## ⚡ Passo 1: Criar a sua cópia do Projeto (GitHub)
1. No repositório deste projeto no GitHub, clique no botão verde no topo: **"Use this template"** ➜ **"Create a new repository"**.
2. Dê um nome ao seu repositório (exemplo: `meu-blog-portal`).
3. Escolha **Public** ou **Private** (à sua escolha) e clique em **Create repository**.
4. Pronto! O código agora está na sua conta do GitHub.

---

## 🗄️ Passo 2: Configurar o Banco de Dados (Supabase)
1. Aceda ao [supabase.com](https://supabase.com) e entre na sua conta.
2. Clique em **"New project"**, dê um nome ao projeto (ex: `Meu Blog`) e defina uma senha forte de banco de dados.
3. Escolha a região mais próxima do seu público e clique em **Create new project** (aguarde 1 minuto até ficar pronto).
4. No menu lateral esquerdo, clique no ícone **SQL Editor** (ou prima `S` e `Q`).
5. Clique em **"+ New query"**.
6. Abra o ficheiro [`supabase/install.sql`](supabase/install.sql) deste projeto, copie todo o conteúdo e cole no SQL Editor do Supabase.
7. Clique no botão verde **"Run"**.
   - ✅ Todas as tabelas, permissões, bucket de imagens e artigos de exemplo foram criados instantaneamente!

### 🔑 Guardar as Chaves do Supabase:
No menu do Supabase, vá em **Project Settings** (ícone da engrenagem ⚙️) ➜ **API**.
Copie e guarde no bloco de notas:
* **Project URL** (ex: `https://xyz...supabase.co`)
* **Project API keys: `anon` / `public`** (chave pública)
* **Project API keys: `service_role` / `secret`** (chave secreta)

---

## 🌐 Passo 3: Colocar o Site no Ar (Deploy na Vercel)
1. Aceda ao [vercel.com](https://vercel.com) e faça login com a sua conta GitHub.
2. No painel, clique em **"Add New..."** ➜ **"Project"**.
3. Localize o repositório que você criou no Passo 1 e clique em **"Import"**.
4. Na secção **Environment Variables** (Variáveis de Ambiente), adicione as seguintes variáveis:

| Nome da Variável | Valor a Colocar |
| :--- | :--- |
| `VITE_SUPABASE_URL` | A sua Project URL do Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | A sua chave `anon` do Supabase |
| `SUPABASE_URL` | A sua Project URL do Supabase |
| `SUPABASE_PUBLISHABLE_KEY` | A sua chave `anon` do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | A sua chave `service_role` secreta do Supabase |
| `VITE_SITE_URL` | O domínio do seu site (ou o link provisório da Vercel) |
| `ADMIN_EMAIL` | *(Opcional)* O seu e-mail para ser Administrador |
| `ADMIN_PASSWORD` | *(Opcional)* A sua senha segura para o painel |
| `ADMIN_NAME` | *(Opcional)* O seu nome de autor |

5. Clique no botão azul **"Deploy"** e aguarde cerca de 1 a 2 minutos.
6. 🎉 **Parabéns! O seu site está oficialmente online na internet!**

---

## 🔐 Passo 4: Criar o seu Acesso de Administrador
1. Abra o link do seu site que a Vercel gerou e adicione `/admin/setup` no final da URL.  
   *Exemplo:* `https://seu-site.vercel.app/admin/setup`
2. Você verá a mensagem: **"Administradores criados com sucesso!"**.
3. Agora aceda a `https://seu-site.vercel.app/admin/login` e faça login com:
   * **E-mail:** O e-mail que configurou (ou o e-mail padrão se não alterou).
   * **Senha:** A senha que configurou (ou a senha padrão).
4. No painel administrativo, vá em **Definições / Perfil** e altere os dados para a sua identidade.

---

## 💵 Passo 5: Configurar o Google AdSense (Monetização)
1. Crie ou aceda à sua conta em [adsense.google.com](https://adsense.google.com).
2. Adicione o seu domínio em **Sites** ➜ **Novo Website**.
3. No seu painel em `/admin/settings`, insira o seu **ID de publicador do AdSense** (ex: `pub-XXXXXXXXXXXXXXXX`).
4. No arquivo `public/ads.txt`, coloque a sua linha oficial do AdSense.
5. Ative **Auto Ads** no AdSense e solicite a revisão!

---

*Bons conteúdos e sucesso com o seu novo portal!*
