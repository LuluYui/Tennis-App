import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig=> ({
  ...config,
  slug: 'my-nav-app',
  name: 'my-nav-app',
  android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.luluyip.mynavapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON
  },
  ios: {
    bundleIdentifier: "com.luluyip.mynavapp"
  }
});
