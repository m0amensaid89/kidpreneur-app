-- ============================================================
-- KidPreneur Video Infrastructure
-- Project: cmtgdolaeaksafzbncpj
-- Run in Supabase SQL Editor — safe to re-run (idempotent)
-- Last updated: Sprint I — April 2026
-- ============================================================

-- STEP 1: Create private storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lesson-videos',
  'lesson-videos',
  false,
  26214400,
  array['video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do nothing;

-- STEP 2: RLS — authenticated users can read from bucket
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'objects'
    and policyname = 'Authenticated users can view lesson videos'
  ) then
    execute 'create policy "Authenticated users can view lesson videos"
    on storage.objects for select to authenticated
    using (bucket_id = ''lesson-videos'')';
  end if;
end $$;

-- STEP 3: RLS — service_role can upload to bucket
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'objects'
    and policyname = 'Service role can upload lesson videos'
  ) then
    execute 'create policy "Service role can upload lesson videos"
    on storage.objects for insert to service_role
    with check (bucket_id = ''lesson-videos'')';
  end if;
end $$;

-- STEP 4: Create lesson_videos table
-- Uses video_url_en / video_url_ar (full direct URLs — paste from anywhere)
create table if not exists public.lesson_videos (
  id               uuid default gen_random_uuid() primary key,
  lesson_id        text not null unique,   -- e.g. 'l1', 'l2' ... 'l38'
  world_id         text,                   -- e.g. 'w1', 'w2', 'w3', 'w4', 'w5'
  video_url_en     text,                   -- full URL to English video
  video_url_ar     text,                   -- full URL to Arabic video
  is_active        boolean default true,   -- false = hides from app
  duration_seconds int4 default 0,
  thumbnail_url    text,
  created_at       timestamptz default now()
);

-- STEP 5: RLS on lesson_videos table
alter table public.lesson_videos enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'lesson_videos'
    and policyname = 'Authenticated users can read lesson videos'
  ) then
    execute 'create policy "Authenticated users can read lesson videos"
    on public.lesson_videos for select to authenticated using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'lesson_videos'
    and policyname = 'Service role can manage lesson videos'
  ) then
    execute 'create policy "Service role can manage lesson videos"
    on public.lesson_videos for all to service_role using (true)';
  end if;
end $$;

-- STEP 6: Index for fast lesson_id lookup
create index if not exists idx_lesson_videos_lesson_id
on public.lesson_videos (lesson_id);

-- ============================================================
-- CEO UPLOAD WORKFLOW (after running this SQL):
-- 1. Produce video in Grok → export MP4 → keep under 20MB
-- 2. Table Editor → lesson_videos → Insert row:
--    lesson_id:    'l1'     (leave id empty — auto-generated)
--    world_id:     'w1'
--    is_active:    TRUE
--    video_url_en: paste full video URL
--    video_url_ar: paste Arabic version URL (or leave empty)
-- 3. Done — video appears in lesson page automatically
-- ============================================================
