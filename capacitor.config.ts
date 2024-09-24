import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'git.mcmanuliam.tune',
  appName: 'TunedIn',
  plugins: {
    splashScreen: {
      autoHide: false,
    }
  },
  webDir: 'www',
};

export default config;
