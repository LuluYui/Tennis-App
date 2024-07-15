import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Agenda from '@/components/Calendar/test/_agenda';
import callfunctions from '@/components/Authentication/callfunctions';
import {callfunction} from '@/components/callfunction';

export default function TabOneScreen() {

  return (
    <View style={styles.separator} >
      {/* <WixCalendar /> */}
      {/* <ThemedCalendarScreen /> */}
      <Button 
        onPress={() => {
          const callfunc = callfunction();
          callfunc
          .then((result) => {
            console.log(result)
          })
          
        }}
        title='Call Functions'
        />
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
