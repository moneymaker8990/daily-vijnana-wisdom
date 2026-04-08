/**
 * User Preferences Sync
 */

import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@lib/constants';
import { getPrimaryNotificationTime, getNotificationSettings, buildNotificationSettings, saveNotificationSettings } from '@lib/notifications';
import { loadUserState, saveUserState } from '@lib/storage';

export interface UserPreferencesSync {
  currentDay: number;
  textSize: string;
  notificationEnabled: boolean;
  notificationTime: string | null;
}

export async function syncUserPreferences(user: User | null): Promise<UserPreferencesSync> {
  if (!user) {
    const storedTextSize = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE);
    const storedState = loadUserState();
    const storedNotifications = getNotificationSettings();

    return {
      currentDay: storedState?.currentDay ?? 1,
      textSize: storedTextSize || 'medium',
      notificationEnabled: storedNotifications.enabled,
      notificationTime: getPrimaryNotificationTime(storedNotifications),
    };
  }

  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    const storedState = loadUserState();
    const storedNotifications = getNotificationSettings();
    return {
      currentDay: storedState?.currentDay ?? 1,
      textSize: localStorage.getItem(STORAGE_KEYS.TEXT_SIZE) || 'medium',
      notificationEnabled: storedNotifications.enabled,
      notificationTime: getPrimaryNotificationTime(storedNotifications),
    };
  }

  const prefs: UserPreferencesSync = {
    currentDay: data.current_day,
    textSize: data.text_size,
    notificationEnabled: data.notification_enabled,
    notificationTime: data.notification_time,
  };

  const existingState = loadUserState();
  saveUserState({
    currentDay: prefs.currentDay,
    lastVisited: existingState?.lastVisited ?? new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, prefs.textSize);
  await saveNotificationSettings(buildNotificationSettings(prefs.notificationEnabled, prefs.notificationTime));

  return prefs;
}

export async function saveUserPreferences(
  user: User | null,
  prefs: Partial<UserPreferencesSync>
): Promise<void> {
  if (prefs.currentDay !== undefined) {
    const existingState = loadUserState();
    saveUserState({
      currentDay: prefs.currentDay,
      lastVisited: existingState?.lastVisited ?? new Date().toISOString(),
    });
  }
  if (prefs.textSize !== undefined) {
    localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, prefs.textSize);
  }
  if (prefs.notificationEnabled !== undefined || prefs.notificationTime !== undefined) {
    const currentSettings = getNotificationSettings();
    await saveNotificationSettings(
      buildNotificationSettings(
        prefs.notificationEnabled ?? currentSettings.enabled,
        prefs.notificationTime ?? getPrimaryNotificationTime(currentSettings)
      )
    );
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
