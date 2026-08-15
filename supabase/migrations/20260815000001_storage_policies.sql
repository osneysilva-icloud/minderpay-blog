-- ============================================================
-- STORAGE POLICIES for the "media" bucket
-- Run this in Supabase SQL Editor → https://supabase.com/dashboard
-- ============================================================

-- 1. Allow authenticated users (admins) to UPLOAD files
INSERT INTO storage.policies (name, bucket_id, operation, definition)
VALUES
  ('Admins can upload media', 'media', 'INSERT',
   '(auth.role() = ''authenticated'')')
ON CONFLICT DO NOTHING;

-- 2. Allow authenticated users to UPDATE/overwrite files
INSERT INTO storage.policies (name, bucket_id, operation, definition)
VALUES
  ('Admins can update media', 'media', 'UPDATE',
   '(auth.role() = ''authenticated'')')
ON CONFLICT DO NOTHING;

-- 3. Allow authenticated users to DELETE files
INSERT INTO storage.policies (name, bucket_id, operation, definition)
VALUES
  ('Admins can delete media', 'media', 'DELETE',
   '(auth.role() = ''authenticated'')')
ON CONFLICT DO NOTHING;

-- 4. Allow EVERYONE (public) to READ/download files (needed to show images on the blog)
INSERT INTO storage.policies (name, bucket_id, operation, definition)
VALUES
  ('Public can read media', 'media', 'SELECT', 'true')
ON CONFLICT DO NOTHING;
