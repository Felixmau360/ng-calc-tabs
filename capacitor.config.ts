import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Km Inteligente',
  webDir: 'www',

  android: {
    backgroundColor: "#FFFFFF",
    overrideUserAgent: "native",
    appendUserAgent: "custom",
    initialFocus: true
  },


};

export default config;
