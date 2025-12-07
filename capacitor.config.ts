import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stillpoint.app',
  appName: 'Stillpoint',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#8B5CF6',
      sound: 'bell.wav',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    BackgroundRunner: {
      label: 'com.stillpoint.app.background',
      src: 'background.js',
      event: 'meditationTimer',
      repeat: false,
      interval: 1,
      autoStart: false,
    },
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#0f172a',
  },
  android: {
    backgroundColor: '#0f172a',
    allowMixedContent: true,
  },
};

export default config;


