import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Km Inteligente',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 4000,
      launchAutoHide: true,
      androidScaleType: "CENTER",
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "var(--ion-color-success)", // Cor do spinner
      spinnerStyle: "circular-small", // Tamanho do spinner
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
