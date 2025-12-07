// Notification service for quote reminders

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

export function saveNotificationSettings(settings: NotificationSettings): void {
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving notification settings:', e);
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
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





