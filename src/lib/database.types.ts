/**
 * Database Types for Supabase
 * 
 * Type definitions for all database tables.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          content: string;
          mood: string | null;
          mood_intensity: number | null;
          gratitudes: string[] | null;
          tags: string[] | null;
          prompt: string | null;
          is_private: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          content: string;
          mood?: string | null;
          mood_intensity?: number | null;
          gratitudes?: string[] | null;
          tags?: string[] | null;
          prompt?: string | null;
          is_private?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          content?: string;
          mood?: string | null;
          mood_intensity?: number | null;
          gratitudes?: string[] | null;
          tags?: string[] | null;
          prompt?: string | null;
          is_private?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dream_entries: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          content: string;
          date: string;
          mood: string | null;
          interpretation: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          content: string;
          date: string;
          mood?: string | null;
          interpretation?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          content?: string;
          date?: string;
          mood?: string | null;
          interpretation?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      reading_progress: {
        Row: {
          id: string;
          user_id: string;
          source_id: string;
          verse_id: string;
          verse_index: number;
          chapter: number | null;
          verse_number: number | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source_id: string;
          verse_id: string;
          verse_index: number;
          chapter?: number | null;
          verse_number?: number | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          source_id?: string;
          verse_id?: string;
          verse_index?: number;
          chapter?: number | null;
          verse_number?: number | null;
          updated_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          source_id: string;
          verse_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          source_id: string;
          verse_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          source_id?: string;
          verse_id?: string;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          day_number: number;
          source: string;
          title: string;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          day_number: number;
          source: string;
          title: string;
          text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          day_number?: number;
          source?: string;
          title?: string;
          text?: string;
          created_at?: string;
        };
      };
      study_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          current_lesson: string | null;
          completed_lessons: string[];
          started_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          current_lesson?: string | null;
          completed_lessons?: string[];
          started_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          current_lesson?: string | null;
          completed_lessons?: string[];
          started_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          created_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          current_day: number;
          text_size: string;
          notification_enabled: boolean;
          notification_time: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_day?: number;
          text_size?: string;
          notification_enabled?: boolean;
          notification_time?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_day?: number;
          text_size?: string;
          notification_enabled?: boolean;
          notification_time?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}



