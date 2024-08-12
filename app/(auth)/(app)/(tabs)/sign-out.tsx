import { Text, View} from '@/components/Themed';

import { useSession } from '../../../../components/Authentication/ctx';
import { router } from 'expo-router';
import { useStorageState } from '../../../../components/Authentication/useStorageState';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function Index() {
  const { signOut } = useSession();
  const [[isLoading, session], setSession] = useStorageState('session');
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
