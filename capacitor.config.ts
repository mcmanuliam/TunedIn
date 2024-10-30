import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'git.mcmanuliam.tune',
  appName: 'TunedIn',
  plugins: {
    splashScreen: {
      launchAutoHide: false,
    }
  },
  server: {
    iosScheme: 'git.mcmanuliam.tune',
  },
  webDir: 'www',
};

export default config;
