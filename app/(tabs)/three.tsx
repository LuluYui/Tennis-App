import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CalendarList } from 'react-native-calendars';
import  CalendarListScreen from '@/components/Calendar/test/_calendarList'
import firebase_init from '@/firebase/firebase_init';
import { useState } from 'react';

export default function TabThreeScreen() {
  const [data, setData] = useState(firebase_init());

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
