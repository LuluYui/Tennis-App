import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import WixCalendar from '@/components/Calendar/WixCalendar';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <WixCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
