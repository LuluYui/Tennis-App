import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { TextInput, Button, Modal } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useColorScheme } from "react-native";
import { appColors } from "@/constants/Colors";


export default function ADDGameScoreScreen({visible, onClose}: any) {
  const isDark = useColorScheme();
  const today_at_zero = new Date();
  today_at_zero.setHours(0,0,0,0);
  const [date, setDate] = useState(today_at_zero);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const venue = useState(['None', 'LRC', 'CRC', 'HKTC']);
  const [selectedLocation, setSelectedLocation] = useState();
  const [location, setLocation] = useState('');
  const [winnerBH, setWinnerBH] = useState('');
  const [winnerFH, setWinnerFH] = useState('');
  const [winScore, setWinScore] = useState('');
  const [losingScore, setLosingScore] = useState('');
  const [loserBH, setLoserBH] = useState('');
  const [loserFH, setLoserFH] = useState('');

  const handleSubmit = () => {
    // Validate and process the data
    console.log({ winnerBH, winnerFH, winScore, losingScore, loserBH, loserFH });
    console.log(selectedLocation)
    onClose(); // Close the modal after submission
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  }

  return (
    // <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text>Date :</Text>
        <Button title="Show Date Picker" onPress={() => setShowDatePicker(true)} />
        <Text> selected: {date.toLocaleString()}</Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text>Location: </Text>
        <Picker
          selectedValue={selectedLocation}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="LRC" value="LRC" />
          <Picker.Item label="CRC" value="CRC" />
          <Picker.Item label="HKTC" value="HKTC" />
        </Picker>

        <Text>Winner BH:</Text>
        <TextInput value={winnerBH} onChangeText={setWinnerBH} style={styles.input} />
        
        <Text>Winner FH:</Text>
        <TextInput value={winnerFH} onChangeText={setWinnerFH} style={styles.input} />
        
        <Text>Win Score:</Text>
        <TextInput value={winScore} onChangeText={setWinScore} style={styles.input} keyboardType="numeric" />
        
        <Text>Losing Score:</Text>
        <TextInput value={losingScore} onChangeText={setLosingScore} style={styles.input} keyboardType="numeric" />
        
        <Text>Loser BH:</Text>
        <TextInput value={loserBH} onChangeText={setLoserBH} style={styles.input} />
        
        <Text>Loser FH:</Text>
        <TextInput value={loserFH} onChangeText={setLoserFH} style={styles.input} />
        
        <View style={styles.button}> 
          <Button title="Submit" onPress={handleSubmit} />
          {/* <Button title="Close" onPress={onClose}/> */}
        </View>
      </View>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    $dark: {
      color: '#ffffff', // White text for picker items
    }
  },
  button: { 
    paddingTop: 20,
    justifyContent: 'space-between',
    minHeight: 110,
  },
  picker: {
    justifyContent: 'center',
    $dark: {
      backgroundColor: appColors.viewBackground.dark,
      color: '#ffffff', // White text for picker items
    },
    color: '#000000', // White text for picker items
    borderColor: '#ffffff', // White border for contrast
    borderWidth: 1, // Border width
    borderRadius: 5, // Rounded corners
    height: 50, 
  }
});
