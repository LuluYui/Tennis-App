import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import WixCalendar from '@/components/Calendar/WixCalendar';
import ThemedCalendarScreen from '@/components/Calendar/test/_themedCalendarScreen';

export default function TabOneScreen() {

  return (
    <View style={styles.separator} >
      {/* <WixCalendar /> */}
      <ThemedCalendarScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    flex:1,
    width: '100%',
  },
});
