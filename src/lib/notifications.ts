// Notification service for quote reminders
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export type NotificationSettings = {
  enabled: boolean;
  times: string[]; // Array of times in "HH:MM" format
  lastNotifiedDay: number;
};

const NOTIFICATION_STORAGE_KEY = 'vijnana_notification_settings';
const DEFAULT_TIMES = ['08:00', '12:00', '20:00'];

export function getNotificationSettings(): NotificationSettings {
  try {
    const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading notification settings:', e);
  }
  return {
    enabled: false,
    times: DEFAULT_TIMES,
    lastNotifiedDay: 0,
  };
}

export async function saveNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
    
    // Schedule or cancel native daily reminders
    if (Capacitor.isNativePlatform()) {
      if (settings.enabled && settings.times.length > 0) {
        await scheduleDailyReminders(settings.times);
      } else {
        await cancelDailyReminders();
      }
    }
  } catch (e) {
    console.error('Error saving notification settings:', e);
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  // Native platform
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (e) {
      console.error('Error requesting native notification permission:', e);
      return false;
    }
  }
  
  // Web platform
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Schedule daily notifications at specified times (native only)
export async function scheduleDailyReminders(times: string[]): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  
  try {
    // Cancel all existing daily reminder notifications (IDs 1-10)
    await LocalNotifications.cancel({
      notifications: times.map((_, i) => ({ id: i + 1 })),
    });
    
    const notifications = times.map((time, index) => {
      const [hour, minute] = time.split(':').map(Number);
      
      // Create a date for today at the specified time
      const scheduleDate = new Date();
      scheduleDate.setHours(hour, minute, 0, 0);
      
      // If the time has already passed today, schedule for tomorrow
      if (scheduleDate.getTime() <= Date.now()) {
        scheduleDate.setDate(scheduleDate.getDate() + 1);
      }
      
      return {
        id: index + 1,
        title: 'Stillpoint 🧘',
        body: 'Time for your daily wisdom and meditation practice.',
        schedule: {
          at: scheduleDate,
          repeats: true,
          every: 'day' as const,
        },
        channelId: 'daily-reminders',
        sound: 'bell.wav',
      };
    });
    
    await LocalNotifications.schedule({ notifications });
    console.log('Daily reminders scheduled:', times);
  } catch (e) {
    console.error('Error scheduling daily reminders:', e);
  }
}

// Cancel all daily reminder notifications
export async function cancelDailyReminders(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  
  try {
    // Cancel notifications with IDs 1-10 (daily reminders)
    await LocalNotifications.cancel({
      notifications: Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })),
    });
  } catch (e) {
    console.error('Error canceling daily reminders:', e);
  }
}

export function getNotificationPermissionStatus(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export function showNotification(title: string, body: string, tag?: string): void {
  if (Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification(title, {
    body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: tag || 'vijnana-quote',
    requireInteraction: false,
    silent: false,
  } as NotificationOptions);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  // Auto-close after 10 seconds
  setTimeout(() => notification.close(), 10000);
}

// Get a random quote from the day's entry for notification
export function getRandomQuoteForNotification(entry: {
  theme: string;
  vijnanaText?: string;
  taoText?: string;
  upanishadText?: string;
  gitaText?: string;
  ashtavakraText?: string;
  yogaSutraText?: string;
  shivaSutraText?: string;
}): { source: string; quote: string } | null {
  const quotes: { source: string; quote: string }[] = [];

  if (entry.vijnanaText) {
    quotes.push({ source: 'Vijnana Bhairava', quote: entry.vijnanaText });
  }
  if (entry.taoText) {
    quotes.push({ source: 'Tao Te Ching', quote: entry.taoText });
  }
  if (entry.upanishadText) {
    quotes.push({ source: 'Upanishads', quote: entry.upanishadText });
  }
  if (entry.gitaText) {
    quotes.push({ source: 'Bhagavad Gita', quote: entry.gitaText });
  }
  if (entry.ashtavakraText) {
    quotes.push({ source: 'Ashtavakra Gita', quote: entry.ashtavakraText });
  }
  if (entry.yogaSutraText) {
    quotes.push({ source: 'Yoga Sutras', quote: entry.yogaSutraText });
  }
  if (entry.shivaSutraText) {
    quotes.push({ source: 'Shiva Sutras', quote: entry.shivaSutraText });
  }

  if (quotes.length === 0) return null;

  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Schedule checker - runs periodically to check if it's time to show a notification
let schedulerInterval: ReturnType<typeof setInterval> | null = null;

export function startNotificationScheduler(
  getCurrentEntry: () => Promise<{
    dayNumber: number;
    theme: string;
    vijnanaText?: string;
    taoText?: string;
    upanishadText?: string;
    gitaText?: string;
    ashtavakraText?: string;
    yogaSutraText?: string;
    shivaSutraText?: string;
  } | null>
): void {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
  }

  const checkAndNotify = async () => {
    const settings = getNotificationSettings();
    if (!settings.enabled) return;
    if (Notification.permission !== 'granted') return;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Check if current time matches any scheduled time (within 1 minute window)
    const shouldNotify = settings.times.some(time => {
      const [schedHour, schedMin] = time.split(':').map(Number);
      const [currHour, currMin] = currentTime.split(':').map(Number);
      return schedHour === currHour && Math.abs(schedMin - currMin) <= 1;
    });

    if (!shouldNotify) return;

    // Check if we already notified for this minute
    const notificationKey = `vijnana_notified_${now.toDateString()}_${currentTime.slice(0, 4)}`;
    if (localStorage.getItem(notificationKey)) return;

    const entry = await getCurrentEntry();
    if (!entry) return;

    const quote = getRandomQuoteForNotification(entry);
    if (!quote) return;

    showNotification(
      `Day ${entry.dayNumber}: ${entry.theme}`,
      `"${quote.quote}" — ${quote.source}`,
      `vijnana-${now.toISOString()}`
    );

    // Mark as notified
    localStorage.setItem(notificationKey, 'true');
    
    // Clean up old notification markers (keep only today's)
    const today = now.toDateString();
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('vijnana_notified_') && !key.includes(today)) {
        localStorage.removeItem(key);
      }
    });
  };

  // Check every 30 seconds
  schedulerInterval = setInterval(checkAndNotify, 30000);
  
  // Also check immediately
  checkAndNotify();
}

export function stopNotificationScheduler(): void {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
}





