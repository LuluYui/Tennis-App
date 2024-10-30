import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig=> ({
  ...config,
  slug: 'PussyLeague',
  name: 'PussyLeague',
  android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.luluyip.pussyleague",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON
  },
  ios: {
    bundleIdentifier: "com.luluyip.pussyleague"
  }
});
