import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CalendarList } from 'react-native-calendars';
import  CalendarListScreen from '@/components/Calendar/test/_calendarList'
import firebase_init from '@/firebase/firebase_init';
import { useEffect, useState } from 'react';
import { emu_firebase } from '@/firebase/emu_firebase';

const image = require('@/assets/images/favicon.png');

export default function TabThreeScreen() {

  return (
    <View style={styles.container}>
      
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
