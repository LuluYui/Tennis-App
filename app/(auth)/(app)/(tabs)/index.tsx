import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import WixCalendar from '@/components/Calendar/WixCalendar';
import ThemedCalendarScreen from '@/components/Calendar/test/_themedCalendarScreen';
import Agenda from '@/components/Calendar/test/_agenda';
import { emu_firebase } from '@/firebase/emu_firebase';

export default function TabOneScreen() {


  useEffect(() => {
      emu_firebase();
  }, []);

  return (
    <View style={styles.separator} >
      {/* <WixCalendar /> */}
      {/* <ThemedCalendarScreen /> */}
      <Agenda />
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
