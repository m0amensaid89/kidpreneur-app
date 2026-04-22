-- ============================================================
-- KidPreneur Video Infrastructure
-- Run this SQL in Supabase SQL Editor (KidPreneur project)
-- Project: cmtgdolaeaksafzbncpj
-- ============================================================

-- STEP 1: Create private storage bucket for lesson videos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lesson-videos',
  'lesson-videos',
  false,  -- PRIVATE — never public
  26214400,  -- 25MB max per file
  array['video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do nothing;

-- STEP 2: Storage RLS — only authenticated users can READ
create policy "Authenticated users can view lesson videos"
on storage.objects for select
to authenticated
using (bucket_id = 'lesson-videos');

-- STEP 3: Storage RLS — only service_role can upload (CEO uses dashboard)
create policy "Service role can upload lesson videos"
on storage.objects for insert
to service_role
with check (bucket_id = 'lesson-videos');

-- STEP 4: Create lesson_videos table
create table if not exists public.lesson_videos (
  id            uuid default gen_random_uuid() primary key,
  lesson_id     text not null unique,   -- e.g. 'l1', 'l2', 'l38'
  video_path_en text,                   -- e.g. 'en/l1.mp4'
  video_path_ar text,                   -- e.g. 'ar/l1.mp4'
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- STEP 5: RLS on lesson_videos table
alter table public.lesson_videos enable row level security;

create policy "Authenticated users can read lesson videos"
on public.lesson_videos for select
to authenticated
using (true);

create policy "Service role can manage lesson videos"
on public.lesson_videos for all
to service_role
using (true);

-- STEP 6: Index for fast lesson_id lookup
create index if not exists idx_lesson_videos_lesson_id
on public.lesson_videos (lesson_id);

-- ============================================================
-- CEO UPLOAD WORKFLOW (after running this SQL):
-- 1. Produce video in Grok → export MP4 → compress to <20MB
-- 2. Supabase Dashboard → Storage → lesson-videos bucket
-- 3. Create folders: en/ and ar/
-- 4. Upload: en/l1.mp4  (English version of Lesson 1)
-- 5. Table Editor → lesson_videos → insert row:
--    lesson_id: "l1"
--    video_path_en: "en/l1.mp4"
--    video_path_ar: "ar/l1.mp4"  (when Arabic ready)
-- 6. Done — video appears in app automatically
-- ============================================================
