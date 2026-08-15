-- Create analytics_events table for real-time visitor tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL DEFAULT 'page_view',
  page_path text,
  post_id uuid REFERENCES public.posts(id) ON DELETE SET NULL,
  session_id text,
  country text,
  country_code text,
  city text,
  region text,
  latitude double precision,
  longitude double precision,
  referrer text,
  user_agent text,
  device_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_path ON public.analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON public.analytics_events(country);

-- Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert (track page views from public visitors)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='analytics_events' AND policyname='anon_can_insert') THEN
    CREATE POLICY anon_can_insert ON public.analytics_events FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

-- Authenticated users (admins) can read all
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='analytics_events' AND policyname='auth_can_select') THEN
    CREATE POLICY auth_can_select ON public.analytics_events FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- Enable realtime on this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events;
