import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Agenda from '@/components/Calendar/test/_agenda';
import { appColors } from '@/constants/Colors';
import ADDGameScoreScreen from '@/components/Calendar/test/_agenda_action/add_gameScore_modal';
import { router } from 'expo-router';

export default function add_gameScore() {
  
  return (
    <View style={styles.separator} darkColor={appColors.viewBackground.dark}>
        <ADDGameScoreScreen onClose={()=> { router.back() }} /> 
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
