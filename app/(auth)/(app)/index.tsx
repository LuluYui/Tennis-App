import { Text, View } from 'react-native';

import { useSession } from '../ctx';
import { router } from 'expo-router';
import { useStorageState } from '../useStorageState';

export default function Index() {
  const { signOut } = useSession();
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
          console.log('yolo', session);
        }}>
        Sign Out
      </Text>
    </View>
  );
}
