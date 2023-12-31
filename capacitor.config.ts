import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins:{
    GoogleAuth:{
       scopes:['profile','email'],
       serverClientId:'77832034966-4182jg7us6se69jdpkrkngbgp7mvkr3u.apps.googleusercontent.com',
       forceCodeForRefreshToken:true,
    },
  },
  appId: 'com.app.hello',
  appName: 'Vanilla',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
