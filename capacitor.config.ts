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
      launchShowDuration: 2500,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: '#1e3a5f',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'horizontal',
      iosSpinnerStyle: 'large',
      spinnerColor: '#f59e0b',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1e3a5f'
    }
  }
};

export default config;
