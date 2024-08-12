import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import  ScoreChart from '@/components/Chart/ScoreChart';
import TestChart from '@/components/Chart/TestChart';

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      {/* <ScoreChart /> */}
      <TestChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
