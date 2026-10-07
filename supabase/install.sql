-- ============================================================
-- SCRIPT DE INSTALAÇÃO COMPLETO DO BANCO DE DADOS (SUPABASE)
-- Modelo Portal / Blog Profissional com CMS e AdSense
-- ============================================================
-- Instruções:
-- 1. Abra o painel do seu projeto no Supabase (https://supabase.com/dashboard)
-- 2. No menu lateral esquerdo, clique em "SQL Editor"
-- 3. Clique em "+ New query"
-- 4. Cole TODO este arquivo e clique no botão verde "Run"
-- ============================================================

-- 1. Extensões
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Funções auxiliares
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 3. Tipos Enum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_status') THEN
    CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'scheduled', 'archived');
  END IF;
END $$;

-- 4. Tabela Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'own profile read') THEN
    CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'own profile update') THEN
    CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;
END $$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Tabela User Roles
CREATE TABLE IF NOT EXISTS public.user_roles (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'read own roles') THEN
    CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'admins manage roles') THEN
    CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

-- 6. Trigger para novo utilizador (O primeiro utilizador registado torna-se Admin automaticamente)
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
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Tabela Authors
CREATE TABLE IF NOT EXISTS public.authors (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authors' AND policyname = 'authors public read') THEN
    CREATE POLICY "authors public read" ON public.authors FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'authors' AND policyname = 'authors admin write') THEN
    CREATE POLICY "authors admin write" ON public.authors FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS authors_updated_at ON public.authors;
CREATE TRIGGER authors_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Tabela Categories
CREATE TABLE IF NOT EXISTS public.categories (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'categories public read') THEN
    CREATE POLICY "categories public read" ON public.categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'categories admin write') THEN
    CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS categories_updated_at ON public.categories;
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Tabela Tags
CREATE TABLE IF NOT EXISTS public.tags (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tags' AND policyname = 'tags public read') THEN
    CREATE POLICY "tags public read" ON public.tags FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tags' AND policyname = 'tags admin write') THEN
    CREATE POLICY "tags admin write" ON public.tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS tags_updated_at ON public.tags;
CREATE TRIGGER tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Tabela Posts
CREATE TABLE IF NOT EXISTS public.posts (
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
CREATE INDEX IF NOT EXISTS posts_status_published_idx ON public.posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx ON public.posts (category_id);
CREATE INDEX IF NOT EXISTS posts_author_idx ON public.posts (author_id);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'posts public read published') THEN
    CREATE POLICY "posts public read published" ON public.posts FOR SELECT
      USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'posts admin read all') THEN
    CREATE POLICY "posts admin read all" ON public.posts FOR SELECT TO authenticated USING (public.is_admin());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'posts' AND policyname = 'posts admin write') THEN
    CREATE POLICY "posts admin write" ON public.posts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 11. Tabela Post Tags (relação muitos para muitos)
CREATE TABLE IF NOT EXISTS public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
GRANT SELECT ON public.post_tags TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_tags TO authenticated;
GRANT ALL ON public.post_tags TO service_role;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'post_tags' AND policyname = 'post_tags public read') THEN
    CREATE POLICY "post_tags public read" ON public.post_tags FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'post_tags' AND policyname = 'post_tags admin write') THEN
    CREATE POLICY "post_tags admin write" ON public.post_tags FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

-- 12. Tabela Media
CREATE TABLE IF NOT EXISTS public.media (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'media public read') THEN
    CREATE POLICY "media public read" ON public.media FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'media' AND policyname = 'media admin write') THEN
    CREATE POLICY "media admin write" ON public.media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS media_updated_at ON public.media;
CREATE TRIGGER media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 13. Tabela Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE,
  site_name TEXT NOT NULL DEFAULT 'Meu Portal',
  site_description TEXT NOT NULL DEFAULT 'Conteúdo sobre negócios, tecnologia e finanças.',
  site_url TEXT NOT NULL DEFAULT 'https://seusite.com',
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'settings public read') THEN
    CREATE POLICY "settings public read" ON public.site_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'settings admin write') THEN
    CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Tabela Ad Slots (Blocos de Anúncio)
CREATE TABLE IF NOT EXISTS public.ad_slots (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ad_slots' AND policyname = 'ads public read') THEN
    CREATE POLICY "ads public read" ON public.ad_slots FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ad_slots' AND policyname = 'ads admin write') THEN
    CREATE POLICY "ads admin write" ON public.ad_slots FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS ad_slots_updated_at ON public.ad_slots;
CREATE TRIGGER ad_slots_updated_at BEFORE UPDATE ON public.ad_slots FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 15. Tabela Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'newsletter public insert') THEN
    CREATE POLICY "newsletter public insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'newsletter admin read') THEN
    CREATE POLICY "newsletter admin read" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.is_admin());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'newsletter admin delete') THEN
    CREATE POLICY "newsletter admin delete" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.is_admin());
  END IF;
END $$;

-- 16. Tabela Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'contact public insert') THEN
    CREATE POLICY "contact public insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'contact admin manage') THEN
    CREATE POLICY "contact admin manage" ON public.contact_messages FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

-- 17. Tabela Redirects (Redirecionamentos 301)
CREATE TABLE IF NOT EXISTS public.redirects (
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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'redirects' AND policyname = 'redirects public read') THEN
    CREATE POLICY "redirects public read" ON public.redirects FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'redirects' AND policyname = 'redirects admin write') THEN
    CREATE POLICY "redirects admin write" ON public.redirects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

DROP TRIGGER IF EXISTS redirects_updated_at ON public.redirects;
CREATE TRIGGER redirects_updated_at BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 18. Tabela Analytics Events (Métricas de visitantes)
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL DEFAULT 'page_view',
  page_path TEXT,
  post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
  session_id TEXT,
  country TEXT,
  country_code TEXT,
  city TEXT,
  region TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON public.analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON public.analytics_events(country);
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analytics_events' AND policyname = 'anon_can_insert') THEN
    CREATE POLICY anon_can_insert ON public.analytics_events FOR INSERT TO anon WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'analytics_events' AND policyname = 'auth_can_select') THEN
    CREATE POLICY auth_can_select ON public.analytics_events FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- 19. Bucket de Armazenamento para Imagens (Storage "media")
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read media') THEN
    CREATE POLICY "Public can read media" ON storage.objects FOR SELECT TO public USING (bucket_id = 'media');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can upload media') THEN
    CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update media') THEN
    CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete media') THEN
    CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
  END IF;
END $$;

-- 20. Permissões de funções de segurança
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ============================================================
-- DADOS INICIAIS (SEED)
-- ============================================================

INSERT INTO public.site_settings (singleton, site_name, site_description, site_url, default_seo_title, default_seo_description)
VALUES (
  true,
  'Meu Portal de Conteúdo',
  'Artigos práticos sobre negócios, tecnologia, marketing e finanças.',
  'https://seusite.com',
  'Meu Portal — Negócios, Tecnologia e Inovação',
  'O seu portal de referência sobre tecnologia, negócios e estratégias digitais.'
)
ON CONFLICT (singleton) DO NOTHING;

INSERT INTO public.ad_slots (key, label, enabled) VALUES
  ('header', 'Anúncio no cabeçalho', false),
  ('article_top', 'Anúncio no topo do artigo', false),
  ('in_content', 'Anúncio dentro do conteúdo', false),
  ('sidebar', 'Anúncio na barra lateral', false),
  ('article_bottom', 'Anúncio no fim do artigo', false),
  ('related', 'Anúncio junto aos artigos relacionados', false)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.categories (name, slug, description, sort_order) VALUES
  ('Negócios', 'negocios', 'Estratégias de crescimento e gestão.', 1),
  ('Tecnologia', 'tecnologia', 'Inovações, inteligência artificial e ferramentas.', 2),
  ('Finanças', 'financas', 'Finanças, investimentos e gestão de dinheiro.', 3),
  ('Marketing', 'marketing', 'Tráfego orgânico, SEO e marketing digital.', 4),
  ('Tutoriais', 'tutoriais', 'Guias práticos passo a passo.', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.tags (name, slug) VALUES
  ('Guia', 'guia'),
  ('Inovação', 'inovacao'),
  ('SEO', 'seo'),
  ('Produtividade', 'produtividade'),
  ('Estratégia', 'estrategia')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.authors (name, slug, bio, role_title, is_example)
VALUES (
  'Redação',
  'redacao',
  'Equipe editorial responsável pelas publicações do portal.',
  'Editor',
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.posts (
  title, slug, subtitle, excerpt, content, status, published_at, category_id, author_id, reading_time, is_featured, is_example, seo_title, seo_description, primary_keyword
)
VALUES
(
  'Bem-vindo ao seu novo Portal de Conteúdo',
  'bem-vindo-ao-novo-portal-de-conteudo',
  'Este é o seu primeiro artigo modelo. Pode editá-lo ou apagá-lo no painel administrativo.',
  'Parabéns pela instalação! O seu portal já está pronto para publicar artigos e ser monetizado com o Google AdSense.',
  E'<p>Parabéns! Se está a ver esta mensagem, a instalação do seu portal foi concluída com sucesso.</p><h2>Próximos passos recomendados</h2><p>Agora pode aceder à área de administração em <code>/admin</code> e começar a publicar:</p><ul><li>Crie as suas próprias categorias no menu Categorias</li><li>Adicione novos autores na secção correspondente</li><li>Escreva artigos originais otimizados para os motores de busca</li><li>Submeta o seu site ao Google Search Console e Google AdSense</li></ul><p>Boas publicações!</p>',
  'published',
  now(),
  (SELECT id FROM public.categories WHERE slug = 'tecnologia' LIMIT 1),
  (SELECT id FROM public.authors WHERE slug = 'redacao' LIMIT 1),
  3, true, true,
  'Bem-vindo ao seu novo Portal de Conteúdo',
  'Artigo de demonstração para confirmar o funcionamento do portal.',
  'portal de conteudo'
)
ON CONFLICT (slug) DO NOTHING;
