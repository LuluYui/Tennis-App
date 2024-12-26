import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
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
