-- Multi-kid profiles: one parent → up to 6 kids
-- Run in KidPreneur Supabase (cmtgdolaeaksafzbncpj)

-- Kid profiles table (parent can have up to 6)
CREATE TABLE IF NOT EXISTS kid_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age_range text NOT NULL DEFAULT '8-11', -- '8-11' | '12-15'
  avatar_index integer NOT NULL DEFAULT 0, -- 0-7 (avatar choices)
  color text NOT NULL DEFAULT '#FF6340',
  xp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  streak_days integer NOT NULL DEFAULT 0,
  last_active_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT max_6_kids CHECK (
    (SELECT COUNT(*) FROM kid_profiles WHERE parent_user_id = parent_user_id) <= 6
  )
);

-- RLS: parent can only see/manage their own kids
ALTER TABLE kid_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parent_owns_kids" ON kid_profiles
  USING (parent_user_id = auth.uid())
  WITH CHECK (parent_user_id = auth.uid());

-- Active kid session — which kid is currently playing
CREATE TABLE IF NOT EXISTS active_kid_session (
  parent_user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  active_kid_id uuid REFERENCES kid_profiles(id) ON DELETE SET NULL,
  switched_at timestamptz DEFAULT now()
);

ALTER TABLE active_kid_session ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parent_owns_session" ON active_kid_session
  USING (parent_user_id = auth.uid())
  WITH CHECK (parent_user_id = auth.uid());
