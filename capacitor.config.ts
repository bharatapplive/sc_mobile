import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sc_app.king',
  appName: 'sc_app',
  webDir: 'www',
  "server": {
    androidScheme: 'http',
    "cleartext": true
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false, // Prevents status bar from rendering over app content
      style: 'DARK',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
