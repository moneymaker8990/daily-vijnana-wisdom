-- Stillpoint Database Schema
-- Run this SQL in your Supabase SQL Editor to create all necessary tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Journal Entries Table
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT,
  mood_intensity INTEGER DEFAULT 3,
  gratitudes TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  prompt TEXT,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dream Entries Table
CREATE TABLE IF NOT EXISTS dream_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  mood TEXT,
  interpretation JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reading Progress Table
CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source_id TEXT NOT NULL,
  verse_id TEXT NOT NULL,
  verse_index INTEGER NOT NULL,
  chapter INTEGER,
  verse_number INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, source_id)
);

-- Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source_id TEXT NOT NULL,
  verse_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, source_id, verse_id)
);

-- Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, day_number, source)
);

-- Study Progress Table
CREATE TABLE IF NOT EXISTS study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  current_lesson TEXT,
  completed_lessons TEXT[] DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Chat Messages Table (for Spiritual Guide)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_day INTEGER DEFAULT 1,
  text_size TEXT DEFAULT 'medium',
  notification_enabled BOOLEAN DEFAULT false,
  notification_time TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data

-- Journal Entries Policies
CREATE POLICY "Users can view own journal entries" ON journal_entries
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal entries" ON journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal entries" ON journal_entries
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal entries" ON journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Dream Entries Policies
CREATE POLICY "Users can view own dream entries" ON dream_entries
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dream entries" ON dream_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dream entries" ON dream_entries
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dream entries" ON dream_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Reading Progress Policies
CREATE POLICY "Users can view own reading progress" ON reading_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reading progress" ON reading_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reading progress" ON reading_progress
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reading progress" ON reading_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks Policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Favorites Policies
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Study Progress Policies
CREATE POLICY "Users can view own study progress" ON study_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own study progress" ON study_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own study progress" ON study_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat Messages Policies
CREATE POLICY "Users can view own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Preferences Policies
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dream_entries_user_id ON dream_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_dream_entries_date ON dream_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_reading_progress_user_id ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_study_progress_user_id ON study_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dream_entries_updated_at
  BEFORE UPDATE ON dream_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reading_progress_updated_at
  BEFORE UPDATE ON reading_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_progress_updated_at
  BEFORE UPDATE ON study_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

