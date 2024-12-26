import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSession } from '@/components/Authentication/ctx';
import { router } from 'expo-router';

export default function ModalScreen() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      
      {/* handle the messageing options */}
      <Pressable
        onPress={async () => {
          try {
            const finished = await signOut();
          } catch (err) {
            console.log(err)
          } finally {
            router.dismissAll();
            router.replace('/')
          }
        }}
      >
        <Text style={{ fontSize: 30,}}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
