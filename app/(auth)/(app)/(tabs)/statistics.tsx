import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CalendarList } from 'react-native-calendars';
import  CalendarListScreen from '@/components/Calendar/test/_calendarList'
import { CartesianChart, Bar,  Line, useChartPressState} from "victory-native";
import { inter } from "@/assets/fonts/SpaceMono-Regular.ttf";
import { Circle, useFont } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

function MyChart() {
  const font = useFont(inter, 12)

  return (
    <View style={{ height: 300 }}>
      {/* <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} /> */}
      <CartesianChart data={DATA} xKey="x" yKeys={["y"]}>
      {({ points, chartBounds }) => (
        //👇 pass a PointsArray to the Bar component, as well as options.
        <Bar
          points={points.y}
          chartBounds={chartBounds}
          color="red"
          roundedCorners={{ topLeft: 10, topRight: 10 }}
        />
      )}
    </CartesianChart>
      {/* <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} axisOptions={{ font }}>
        {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <Line points={points.highTmp} color="red" strokeWidth={3} />
        )}
      </CartesianChart> */}
    </View>
  );
}

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}> Statistics </Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      {/* <CalendarListScreen /> */}
      <MyChart /> 
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
