import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mobigarage.mp',
  appName: 'MobiGarage - Retail Tech',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      "style": "DEFAULT",
    "backgroundColor":"#ff6f3f"
    },
  }
};

export default config;