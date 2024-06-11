import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CalendarList } from 'react-native-calendars';
import  CalendarListScreen from '@/components/Calendar/test/_calendarList'
import firebase_init from '@/firebase/firebase_init';
import { useEffect, useState } from 'react';
import { emu_firebase } from '@/firebase/emu_firebase';


export default function TabThreeScreen() {
  // Production Code
  // const [data, setData] = useState(firebase_init());

  // Test Code
  // useEffect(() => {
  //     emu_firebase();
  // }, []);

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      
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
