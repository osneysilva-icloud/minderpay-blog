-- ============ helpers ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ roles ============
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin');
$$;

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;

  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ authors ============
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  role_title TEXT,
  website_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  is_example BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.authors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.authors TO authenticated;
GRANT ALL ON public.authors TO service_role;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authors public read" ON public.authors FOR SELECT USING (true);
CREATE POLICY "authors admin write" ON public.authors FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER authors_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ categories ============
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  robots_index BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  is_example BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ tags ============
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tags TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tags TO authenticated;
GRANT ALL ON public.tags TO service_role;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tags public read" ON public.tags FOR SELECT USING (true);
CREATE POLICY "tags admin write" ON public.tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ posts ============
CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'scheduled', 'archived');

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  featured_image_alt TEXT,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status public.post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  robots_index BOOLEAN NOT NULL DEFAULT true,
  robots_follow BOOLEAN NOT NULL DEFAULT true,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  primary_keyword TEXT,
  reading_time INT NOT NULL DEFAULT 1,
  view_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_example BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX posts_status_published_idx ON public.posts (status, published_at DESC);
CREATE INDEX posts_category_idx ON public.posts (category_id);
CREATE INDEX posts_author_idx ON public.posts (author_id);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts public read published" ON public.posts FOR SELECT
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "posts admin read all" ON public.posts FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "posts admin write" ON public.posts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
GRANT SELECT ON public.post_tags TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_tags TO authenticated;
GRANT ALL ON public.post_tags TO service_role;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "post_tags public read" ON public.post_tags FOR SELECT USING (true);
CREATE POLICY "post_tags admin write" ON public.post_tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ media ============
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  description TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media public read" ON public.media FOR SELECT USING (true);
CREATE POLICY "media admin write" ON public.media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ site settings ============
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE,
  site_name TEXT NOT NULL DEFAULT 'MinderPay',
  site_description TEXT NOT NULL DEFAULT 'Conteúdo sobre dinheiro, negócios, marketing e tecnologia.',
  site_url TEXT NOT NULL DEFAULT 'https://minderpay.com',
  logo_url TEXT,
  favicon_url TEXT,
  contact_email TEXT,
  ga_measurement_id TEXT,
  gsc_verification TEXT,
  adsense_publisher_id TEXT,
  ads_enabled BOOLEAN NOT NULL DEFAULT false,
  default_seo_title TEXT,
  default_seo_description TEXT,
  default_og_image TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  social_youtube TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ ad slots ============
CREATE TABLE public.ad_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT false,
  ad_client TEXT,
  ad_unit_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ad_slots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ad_slots TO authenticated;
GRANT ALL ON public.ad_slots TO service_role;
ALTER TABLE public.ad_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ads public read" ON public.ad_slots FOR SELECT USING (true);
CREATE POLICY "ads admin write" ON public.ad_slots FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER ad_slots_updated_at BEFORE UPDATE ON public.ad_slots FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ newsletter ============
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT SELECT, INSERT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "newsletter public insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter admin read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "newsletter admin delete" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.is_admin());

-- ============ contact ============
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact public insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact admin manage" ON public.contact_messages FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ redirects ============
CREATE TABLE public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  old_path TEXT NOT NULL UNIQUE,
  new_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.redirects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "redirects public read" ON public.redirects FOR SELECT USING (true);
CREATE POLICY "redirects admin write" ON public.redirects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER redirects_updated_at BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ storage policies ============
CREATE POLICY "media bucket admin read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media bucket admin insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media bucket admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "media bucket admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());

-- ============ seed ============
INSERT INTO public.site_settings (singleton, contact_email, default_seo_title, default_seo_description)
VALUES (true, 'contacto@minderpay.com', 'MinderPay — Dinheiro, Negócios e Tecnologia', 'Artigos práticos sobre dinheiro, negócios, marketing, tecnologia e empreendedorismo.');

INSERT INTO public.ad_slots (key, label, enabled) VALUES
  ('header', 'Anúncio no cabeçalho', false),
  ('article_top', 'Anúncio no topo do artigo', false),
  ('in_content', 'Anúncio dentro do conteúdo', false),
  ('sidebar', 'Anúncio na barra lateral', false),
  ('article_bottom', 'Anúncio no fim do artigo', false),
  ('related', 'Anúncio junto aos artigos relacionados', false);

INSERT INTO public.categories (name, slug, description, sort_order) VALUES
  ('Dinheiro', 'dinheiro', 'Como ganhar, poupar e gerir dinheiro no dia a dia.', 1),
  ('Negócios', 'negocios', 'Estratégia, gestão e crescimento de negócios.', 2),
  ('Marketing', 'marketing', 'Marketing digital, tráfego e aquisição de clientes.', 3),
  ('Tecnologia', 'tecnologia', 'Ferramentas e tendências tecnológicas aplicadas ao trabalho.', 4),
  ('Empreendedorismo', 'empreendedorismo', 'Criar, validar e escalar projetos próprios.', 5),
  ('Finanças', 'financas', 'Finanças pessoais, investimento e planeamento.', 6),
  ('Tutoriais', 'tutoriais', 'Guias passo a passo, práticos e diretos.', 7),
  ('Ferramentas', 'ferramentas', 'Ferramentas úteis para produtividade e negócios.', 8);

INSERT INTO public.authors (name, slug, bio, role_title, is_example)
VALUES ('Equipa MinderPay', 'equipa-minderpay', 'Conteúdo de exemplo criado durante a configuração do site. Substitua por autores reais.', 'Redação', true);

INSERT INTO public.tags (name, slug) VALUES
  ('Exemplo', 'exemplo'), ('Guia', 'guia'), ('Rendimento', 'rendimento'), ('SEO', 'seo'), ('Produtividade', 'produtividade');

INSERT INTO public.posts (title, slug, subtitle, excerpt, content, status, published_at, category_id, author_id, reading_time, is_featured, is_example, seo_title, seo_description, primary_keyword)
VALUES
(
  '[EXEMPLO] Como organizar as suas finanças pessoais em 30 dias',
  'exemplo-organizar-financas-pessoais-30-dias',
  'Um plano simples e realista para ganhar controlo sobre o seu dinheiro.',
  'Conteúdo de exemplo. Um plano mensal para mapear despesas, criar um fundo de emergência e definir metas financeiras claras.',
  E'<p><strong>Este é um artigo de exemplo</strong> criado automaticamente para validar o design do site. Pode apagá-lo no painel de administração.</p><h2>Semana 1 — Mapear o que entra e o que sai</h2><p>Antes de cortar despesas, é preciso saber para onde vai o dinheiro. Registe todas as entradas e saídas durante sete dias.</p><ul><li>Anote todas as despesas, mesmo as pequenas</li><li>Separe despesas fixas de despesas variáveis</li><li>Identifique subscrições que já não usa</li></ul><h2>Semana 2 — Definir um orçamento realista</h2><p>Um orçamento que não sobrevive à primeira semana não é um orçamento. Comece com metas modestas e ajuste.</p><blockquote>Poupar 10% de forma consistente vale mais do que poupar 40% durante um mês.</blockquote><h2>Semana 3 — Criar o fundo de emergência</h2><p>O objetivo inicial é reunir o equivalente a um mês de despesas essenciais numa conta separada.</p><h2>Semana 4 — Automatizar</h2><p>Configure transferências automáticas no dia em que recebe. O que é automático não depende de disciplina.</p>',
  'published', now() - interval '3 days',
  (SELECT id FROM public.categories WHERE slug = 'financas'),
  (SELECT id FROM public.authors WHERE slug = 'equipa-minderpay'),
  5, true, true,
  'Como organizar as finanças pessoais em 30 dias | Exemplo',
  'Plano de 30 dias para mapear despesas, criar um fundo de emergência e automatizar poupanças.',
  'organizar finanças pessoais'
),
(
  '[EXEMPLO] 7 formas legítimas de gerar rendimento online',
  'exemplo-formas-legitimas-gerar-rendimento-online',
  'Modelos de rendimento reais, com esforço real e prazos realistas.',
  'Conteúdo de exemplo. Uma visão honesta sobre modelos de rendimento online e o que cada um exige em tempo e competências.',
  E'<p><strong>Artigo de exemplo.</strong> Substitua por conteúdo original antes de publicar o site.</p><h2>1. Serviços especializados</h2><p>Vender competências é o caminho mais rápido para o primeiro euro: escrita, design, contabilidade, programação.</p><h2>2. Conteúdo próprio</h2><p>Blogs, newsletters e vídeo constroem audiência ao longo do tempo e monetizam por publicidade ou produtos.</p><h2>3. Produtos digitais</h2><p>Cursos, modelos e ebooks têm custo marginal quase nulo, mas exigem audiência prévia.</p><h2>4. Comércio eletrónico</h2><p>Requer capital e logística, mas escala bem quando o produto encontra procura.</p><h2>5. Consultoria</h2><p>Transformar experiência em aconselhamento pago é um modelo de margem elevada.</p><h2>6. Software e ferramentas</h2><p>Exige competências técnicas ou uma equipa, mas tem o melhor potencial de escala.</p><h2>7. Afiliação responsável</h2><p>Recomende apenas o que conhece e divulgue sempre a relação comercial.</p>',
  'published', now() - interval '6 days',
  (SELECT id FROM public.categories WHERE slug = 'dinheiro'),
  (SELECT id FROM public.authors WHERE slug = 'equipa-minderpay'),
  7, true, true,
  '7 formas legítimas de gerar rendimento online | Exemplo',
  'Modelos de rendimento online realistas, com o esforço e o prazo que cada um exige.',
  'rendimento online'
),
(
  '[EXEMPLO] SEO para quem está a começar: o guia essencial',
  'exemplo-seo-para-quem-esta-a-comecar',
  'Os fundamentos que realmente movem o ponteiro no tráfego orgânico.',
  'Conteúdo de exemplo. Fundamentos de SEO técnico, intenção de pesquisa e estrutura de conteúdo para novos sites.',
  E'<p><strong>Artigo de exemplo.</strong> Serve apenas para demonstrar a formatação de conteúdo.</p><h2>Intenção de pesquisa vem primeiro</h2><p>Antes de escrever, perceba o que a pessoa quer resolver ao pesquisar aquele termo.</p><h2>Estrutura e legibilidade</h2><ul><li>Um H1 por página</li><li>Subtítulos descritivos</li><li>Parágrafos curtos</li></ul><h2>SEO técnico mínimo</h2><p>URLs limpos, sitemap, dados estruturados, imagens otimizadas e velocidade de carregamento.</p><h2>Links internos</h2><p>Ligue artigos relacionados entre si para distribuir autoridade e ajudar a navegação.</p>',
  'published', now() - interval '10 days',
  (SELECT id FROM public.categories WHERE slug = 'marketing'),
  (SELECT id FROM public.authors WHERE slug = 'equipa-minderpay'),
  6, false, true,
  'SEO para iniciantes: o guia essencial | Exemplo',
  'Fundamentos de SEO: intenção de pesquisa, estrutura de conteúdo, SEO técnico e links internos.',
  'seo para iniciantes'
);

INSERT INTO public.post_tags (post_id, tag_id)
SELECT p.id, t.id FROM public.posts p CROSS JOIN public.tags t
WHERE p.is_example AND t.slug IN ('exemplo', 'guia');
