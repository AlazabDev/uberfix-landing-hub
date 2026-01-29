import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1a771ec37ddf420a86aefb3bbbcbc74b',
  appName: 'uberfix-eg',
  webDir: 'dist',
  server: {
    url: 'https://1a771ec3-7ddf-420a-86ae-fb3bbbcbc74b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e3a5f',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      spinnerColor: '#f59e0b'
    }
  }
};

export default config;
