import { Button, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CalendarList } from 'react-native-calendars';
import  CalendarListScreen from '@/components/Calendar/test/_calendarList'
import { useState } from 'react';

import React from 'react';
import { VictoryBar } from 'victory';

import { CartesianChart, Line } from "victory-native";

export function MyChart() {
  const [DATA, setData] = useState(Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  })));

  return (
      <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
          {/* 👇 render function exposes various data, such as points. */}
          {({ points }) => (
            // 👇 and we'll use the Line component to render a line path.
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.highTmp} color="red" strokeWidth={3} />
          )}
      </CartesianChart>
  );
}

export default function TabTwoScreen() {
  const [DATA, setData] = useState(Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  })));
  return (
    <View style={styles.container}>
      {/* <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
          {({ points }) => (
            // 👇 and we'll use the Line component to render a line path.
            <Line points={points.highTmp} color="red" strokeWidth={3} />
          )}
      </CartesianChart> */}
      <MyChart />
      {/* <Text> Hello </Text> */}
      {/* <Text style={styles.title}> Statistics </Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      {/* <CalendarListScreen /> */}
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
