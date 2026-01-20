import { useState, useEffect } from 'react';
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  getNotificationPermissionStatus,
  startNotificationScheduler,
  stopNotificationScheduler,
  type NotificationSettings as NotificationSettingsType,
} from '@lib/notifications';
import { getDataSource } from '@lib/dataSource';
import { STORAGE_KEYS } from '@lib/constants';

type Props = {
  onClose: () => void;
};

export function NotificationSettings({ onClose }: Props) {
  const [settings, setSettings] = useState<NotificationSettingsType>(getNotificationSettings);
  const [permissionStatus, setPermissionStatus] = useState(getNotificationPermissionStatus);
  const [newTime, setNewTime] = useState('09:00');

  useEffect(() => {
    setPermissionStatus(getNotificationPermissionStatus());
  }, []);

  const handleToggleEnabled = async () => {
    if (!settings.enabled) {
      // Trying to enable - request permission first
      const granted = await requestNotificationPermission();
      setPermissionStatus(getNotificationPermissionStatus());
      if (!granted) {
        return;
      }
      // Start scheduler
      const ds = getDataSource();
      startNotificationScheduler(async () => {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_STATE);
        if (stored) {
          const state = JSON.parse(stored);
          return ds.getEntryByDay(state.currentDay);
        }
        return ds.getEntryByDay(1);
      });
    } else {
      // Stop scheduler
      stopNotificationScheduler();
    }
    const updated = { ...settings, enabled: !settings.enabled };
    setSettings(updated);
    await saveNotificationSettings(updated);
  };

  const handleAddTime = async () => {
    if (settings.times.includes(newTime)) return;
    const updated = { ...settings, times: [...settings.times, newTime].sort() };
    setSettings(updated);
    await saveNotificationSettings(updated);
  };

  const handleRemoveTime = async (time: string) => {
    const updated = { ...settings, times: settings.times.filter(t => t !== time) };
    setSettings(updated);
    await saveNotificationSettings(updated);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-serif text-white">Quote Reminders</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Permission Status */}
          {permissionStatus === 'unsupported' && (
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-200 text-sm">
                Your browser doesn't support notifications. Try using Chrome, Safari, or Firefox.
              </p>
            </div>
          )}

          {permissionStatus === 'denied' && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-200 text-sm">
                Notifications are blocked. Please enable them in your browser settings to receive quote reminders.
              </p>
            </div>
          )}

          {/* Enable Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Enable Reminders</p>
              <p className="text-white/60 text-sm">Receive wisdom quotes throughout the day</p>
            </div>
            <button
              onClick={handleToggleEnabled}
              disabled={permissionStatus === 'unsupported' || permissionStatus === 'denied'}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.enabled
                  ? 'bg-violet-500'
                  : 'bg-white/20'
              } ${permissionStatus === 'unsupported' || permissionStatus === 'denied' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Scheduled Times */}
          {settings.enabled && (
            <>
              <div className="border-t border-white/10 pt-5">
                <p className="text-white font-medium mb-3">Reminder Times</p>
                
                {/* Current times */}
                <div className="space-y-2 mb-4">
                  {settings.times.length === 0 ? (
                    <p className="text-white/40 text-sm italic">No times scheduled</p>
                  ) : (
                    settings.times.map(time => (
                      <div
                        key={time}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
                      >
                        <span className="text-white">{formatTime(time)}</span>
                        <button
                          onClick={() => handleRemoveTime(time)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add new time */}
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-400"
                  />
                  <button
                    onClick={handleAddTime}
                    className="bg-violet-500/80 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Test notification */}
              <button
                onClick={() => {
                  if (Notification.permission === 'granted') {
                    new Notification('Daily Vijnana Wisdom', {
                      body: 'This is a test notification. You will receive wisdom quotes at your scheduled times.',
                      icon: '/icon.svg',
                    });
                  }
                }}
                className="w-full bg-white/10 hover:bg-white/15 text-white/80 py-3 rounded-lg transition-colors text-sm"
              >
                Send Test Notification
              </button>
            </>
          )}

          {/* Install PWA hint */}
          <div className="border-t border-white/10 pt-5">
            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
              <p className="text-violet-200 text-sm font-medium mb-1">📱 Install on Your Phone</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Add this app to your home screen for the best experience:
                <br />
                <strong className="text-white/80">iPhone:</strong> Tap Share → Add to Home Screen
                <br />
                <strong className="text-white/80">Android:</strong> Tap Menu → Install App
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

