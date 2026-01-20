/**
 * User Preferences Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';

export interface UserPreferencesSync {
  currentDay: number;
  textSize: string;
  notificationEnabled: boolean;
  notificationTime: string | null;
}

export async function syncUserPreferences(user: User | null): Promise<UserPreferencesSync> {
  if (!user) {
    const storedState = localStorage.getItem(STORAGE_KEYS.USER_STATE);
    const storedTextSize = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE);
    const storedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);

    return {
      currentDay: storedState ? JSON.parse(storedState).currentDay : 1,
      textSize: storedTextSize || 'medium',
      notificationEnabled: storedNotifications ? JSON.parse(storedNotifications).enabled : false,
      notificationTime: storedNotifications ? JSON.parse(storedNotifications).time : null,
    };
  }

  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    const storedState = localStorage.getItem(STORAGE_KEYS.USER_STATE);
    return {
      currentDay: storedState ? JSON.parse(storedState).currentDay : 1,
      textSize: localStorage.getItem(STORAGE_KEYS.TEXT_SIZE) || 'medium',
      notificationEnabled: false,
      notificationTime: null,
    };
  }

  const prefs: UserPreferencesSync = {
    currentDay: data.current_day,
    textSize: data.text_size,
    notificationEnabled: data.notification_enabled,
    notificationTime: data.notification_time,
  };

  localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify({ currentDay: prefs.currentDay }));
  localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, prefs.textSize);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify({
    enabled: prefs.notificationEnabled,
    time: prefs.notificationTime,
  }));

  return prefs;
}

export async function saveUserPreferences(
  user: User | null,
  prefs: Partial<UserPreferencesSync>
): Promise<void> {
  if (prefs.currentDay !== undefined) {
    localStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify({ currentDay: prefs.currentDay }));
  }
  if (prefs.textSize !== undefined) {
    localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, prefs.textSize);
  }
  if (prefs.notificationEnabled !== undefined || prefs.notificationTime !== undefined) {
    const current = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    const currentParsed = current ? JSON.parse(current) : { enabled: false, time: null };
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify({
      enabled: prefs.notificationEnabled ?? currentParsed.enabled,
      time: prefs.notificationTime ?? currentParsed.time,
    }));
  }

  if (user) {
    await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        current_day: prefs.currentDay,
        text_size: prefs.textSize,
        notification_enabled: prefs.notificationEnabled,
        notification_time: prefs.notificationTime,
      });
  }
}
