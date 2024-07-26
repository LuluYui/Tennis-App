import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import  ScoreChart from '@/components/Chart/ScoreChart';

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <ScoreChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
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
