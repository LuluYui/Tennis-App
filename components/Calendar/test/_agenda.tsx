import React, { Component } from 'react';
import {Alert, Button, TextInput, Modal, Pressable, StyleSheet, TouchableOpacity, Appearance} from 'react-native'; import { Text, View } from '@/components/Themed';
// import { Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { Agenda } from "@/components/Calendar/test/CalendarTheme";
import testIDs from '../testIDs';
import {  callScores, edit_score } from '@/components/callfunction';
import FloatingButton from './_floatingButtonComponent';
import Colors, { appColors } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { create } from 'zustand';

interface State {
  items?: AgendaSchedule;
  data?: AgendaSchedule;
  editFormVisible: boolean;
  player1Score: string; 
  player2Score: string; 
  selectedScore: any;
  datePickerVisible: boolean,
  location: string, 
  winnerBH: string,
  winnerFH: string,
  winScore: number,
  loseScore: number,
  loserBH: string,
  loserFH: string
  date: Date,
  gameID: string,
  refreshKey: number,
  isDarkMode: string | null | undefined
}

export interface AgendaEntryGameScore extends AgendaEntry {
  location: string, 
  winnerBH: string,
  winnerFH: string,
  winScore: number,
  loseScore: number,
  loserBH: string,
  loserFH: string
  date: Date,
  gameID: string,
}

interface BearState {
  bears: number
  increase: () => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 })),
}))

export { useBearStore };

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    data: undefined,
    editFormVisible: false,
    player1Score: '', 
    player2Score: '', 
    selectedScore: {},
    datePickerVisible: false,
    date: new Date(),
    location: 'none',
    winnerBH: '',
    winnerFH: '',
    winScore: 0,
    loseScore: 0,
    loserBH: '',
    loserFH: '',
    gameID: '',
    refreshKey: useBearStore.getState().bears,
    isDarkMode: Appearance.getColorScheme() ?? 'light'
  };
  unsubscribe = ()=>{};
  subscription: any;

  componentDidMount(): void {
    this.unsubscribe = useBearStore.subscribe(
      ( state )  => this.setState({ refreshKey: state.bears }),
    );
      // Add listener for appearance changes
    this.subscription = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ isDarkMode: colorScheme === 'dark' });
    });
  }
  
  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.subscription.remove();
  }

  render() {

    return (
      <>
        <Agenda
          key={this.state.refreshKey}
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          renderItem={this.renderItem}
          loadItemsForMonth={this.loadItems}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          futureScrollRange={12}
          pastScrollRange={500}
          overScrollMode='always'
          // initialDate='2024-05-06'
          selected={'2023-05-05'}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{reservationsBackgroundColor: appColors.viewBackground.dark}}
          renderDay={this.renderDay}
          hideExtraDays={false}
          // showOnlySelectedDayItems
          // reservationsKeyExtractor={this.reservationsKeyExtractor}
          hideKnob={false}
        >
          </Agenda>
          {this.renderEditFormModel()}
        <FloatingButton />
      </>
    );
  }

  loadItems = async (day: DateData) => {
    const callScore = callScores();
    const items = this.state.items || {};

    setTimeout(() => {
      // my programme
      let tmp: any = {};
      let scoreItems: AgendaSchedule = {}

      // Generate dates for the past year and the next year
      const startDate = new Date(day.timestamp - 183 * 24 * 60 * 60 * 1000); // 1 year ago
      const endDate = new Date(day.timestamp + 1 * 24 * 60 * 60 * 1000); // 1 year from now

      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const strTime = this.timeToString(date.getTime());
        if (!tmp[strTime]) {
          tmp[strTime] = [];
        }
      }

      callScore.then((result) => {
        if (result) {
        Object.keys(result).forEach(key => {
          /**
           *2Fx2WJcni6GX8xUwudM2WK :
                  Date : "2024-05-20T00:00:00.000"
                  Location : "LRC"
                  LoseScore : 4
                  LoserBH : "Mike"
                  LoserFH : "Chi"
                  MatchID : "3wmpFX3F9qsKn9Jat2dkHY"
                  WinScore : 6
                  WinnerBH : "WM"
                  WinnerFH : "Cadol"
          */
          let date = ""; 

          typeof result[key].Date === "string" ? date = result[key].Date.split('T')[0] : date = this.toLocaleISOString(new Date(result[key].Date._seconds * 1000)).split('T')[0];
          const location = result[key].Location;
          const loseScore = result[key].LoseScore;
          const loserBH = result[key].LoserBH;
          const loserFH = result[key].LoserFH;
          const matchID = result[key].MatchID;
          const winScore = result[key].WinScore;
          const winnerBH = result[key].WinnerBH;
          const winnerFH = result[key].WinnerFH;
          const gameID = key;

          if (!tmp[date]) {
            tmp[date] = [];
          }
          tmp[date].push({
              name: `Location : ${location} \n ${loserBH} ${loserFH} ${loseScore} : ${winScore} ${winnerBH} ${winnerFH}`,
              height: 75,
              location: location,
              loseScore: loseScore, 
              loserBH: loserBH, 
              loserFH: loserFH, 
              matchID: matchID, 
              winScore: winScore, 
              winnerBH: winnerBH, 
              winnerFH: winnerFH, 
              day: date,
              gameID: gameID
          })
        })

      // fill-in empty date items
      // for (let i = -30; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!tmp[strTime]) {
      //     tmp[strTime] = [];
      //     console.log('set date', strTime)
      //   }
      // }

      // O(n)
      Object.keys(tmp).forEach(key => {
        scoreItems[key] = tmp[key];
      });
      // O(1)
      this.setState({
        items: scoreItems
      });
      }
    })
    }, 1000);
  };


  renderDay = (day: any) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    if (day) {
      return <Text style={styles.customDay}>{`${weekdays[day.getDay()]} \n ${day.getDate()}`}</Text>;
    }
    // return <Text style={styles.customDay}>{`${weekdays[day.getDay()]} \n ${day.getDate()}`}</Text>;
    return <View style={styles.dayItem} />;
  };

  increase = () => {
    useBearStore.getState().increase();
  }

  renderItem = (reservation: AgendaEntryGameScore, isFirst: boolean) => {
    const fontSize = isFirst ? 21 : 18;
    const color = isFirst ? 'black' : '#43515f';

    const renderItemScoreBoard = () => {
        return (
          <>
            <Text style={{fontSize, color}}> Location : {reservation.location}</Text>
            <View darkColor='#87CEFA' lightColor='#87CEFA' style={{ flexDirection: 'row', justifyContent: 'center'}}> 
              <Text style={{fontSize, color}}> {reservation.winnerBH} {reservation.winnerFH} </Text>
              <Text style={{fontSize, color}}> {reservation.winScore} - {reservation.loseScore} </Text>
              <Text style={{fontSize, color}}> {reservation.loserBH} {reservation.loserFH} </Text>
            </View>
          </>
        );
      }

        // Handle the rendering style of the items
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => { this.setState({ 
          editFormVisible: true, 
          date: this.stringToDate(reservation.day),
          gameID: reservation.gameID, 
          location: reservation.location,
          loseScore: reservation.loseScore, 
          winScore: reservation.winScore,
          winnerBH: reservation.winnerBH, 
          winnerFH: reservation.winnerFH,
          loserBH: reservation.loserBH,
          loserFH: reservation.loserFH,
        })}}
      >
        {/* make a score chart here  */}
        {renderItemScoreBoard()}
        {/* <Text style={{fontSize, color}}>{reservation.name}</Text> */}
      </TouchableOpacity>
    );
  };

  renderEditFormModel = () => {
    const handleSubmit = () => {
      // turn off the form visibility 
      this.setState({
        editFormVisible: false, 
      });
      
      // add the content to cloud 
      // time string is not stored correctly, need thorough study on firestore date storage behaviours 
      const data = {
         date : this.state.date,
         gameID: this.state.gameID, 
         location: this.state.location,
         loseScore: this.state.loseScore, 
         winScore: this.state.winScore,
         winnerBH: this.state.winnerBH, 
         winnerFH: this.state.winnerFH,
         loserBH: this.state.loserBH,
         loserFH: this.state.loserFH,
      }

      edit_score(data)
        .then( (result: any) => {
          this.increase();
        })
        .catch(e => console.log(e))
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({ date: currentDate, datePickerVisible: false });
    }

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.editFormVisible}
          onRequestClose={() => this.setState({editFormVisible: false })}
        >
        <View style={this.state.isDarkMode ? styles.modalViewDark: styles.modalViewLight}>
          <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Edit Tennis Scores</Text>
           {/* Date Picker */}
           {/* <Button title="Select Date" onPress={() => this.setState({ datePickerVisible: true })} /> */}
           <Pressable 
                style={styles.buttonContainer} 
                onPress={ () => {
                  this.setState({
                    datePickerVisible: true,
                  })
                }}
           >
            <Text style={styles.buttonText}>Selected Date </Text>
           </Pressable >
            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}> {this.state.date.toLocaleString().split('T')[0]}</Text>
            {this.state.datePickerVisible && (
              <DateTimePicker
                value={this.state.date}
                // timeZoneName={'Asia/Hong_Kong'}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Location Dropdown */}
            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Location:</Text>
            <Picker
              selectedValue={this.state.location}
              style={this.state.isDarkMode ? styles.pickerDark : styles.pickerLight}
              onValueChange={(itemValue) => this.setState({ location: itemValue })}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="LRC" value="LRC" />
              <Picker.Item label="CRC" value="CRC" />
              <Picker.Item label="HKTC" value="HKTC" />
            </Picker>

            {/* Input Fields */}
            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Win BH</Text>
            <TextInput
              placeholder="WinnerBH"
              value={this.state.winnerBH}
              onChangeText={(text) => { this.setState({ winnerBH: text})}}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
            />

            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Win FH</Text>
            <TextInput
              placeholder="WinnerFH"
              value={this.state.winnerFH}
              onChangeText={ (text) => { this.setState({ winnerFH: text})}}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
            />

            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Win Score</Text>
            <TextInput
              placeholder="Win Score"
              value={this.state.winScore !== undefined ? this.state.winScore.toString() : ''}
              onChangeText={(text) => this.setState({ winScore: text })}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
              keyboardType="numeric"
            />

            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Lose Score</Text>
            <TextInput
              placeholder="Lose Score"
              value={this.state.loseScore !== undefined ? this.state.loseScore.toString() : ''}
              onChangeText={(text) => this.setState({ loseScore: text })}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
              keyboardType="numeric"
            />

            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Loss BH</Text>
            <TextInput
              placeholder="Loser BH"
              value={this.state.loserBH}
              onChangeText={(text) => this.setState({ loserBH: text })}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
            />

            <Text style={this.state.isDarkMode ? styles.modalTextDark: styles.modalTextLight}>Loss FH</Text>
            <TextInput
              placeholder="Loser FH"
              value={this.state.loserFH}
              onChangeText={(text) => this.setState({ loserFH: text })}
              style={this.state.isDarkMode ? styles.inputDark : styles.inputLight}
            />
            
            <Pressable 
              style={styles.buttonContainer}
              onPress={handleSubmit} >
              <Text style={styles.buttonText}> Submit</Text>
            </Pressable>

          </View>
        </Modal>
    );
  }


  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate} >
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  stringToDate(dateString: string) {
    // Split the string into components
    const [year, month, day] = dateString.split('-').map(Number);
     
    // Create a new Date object (month is zero-based)
    const date = new Date(year, month - 1, day);

    return date;
  }

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


  // Custom formattor to output the correct locale date
  toLocaleISOString = (date: Date) => {
    // [LIMITATIONS] : Time  cannot be set, no decimal places, storage has string instead of timestamp
    // Get the locale date string
    const localeDate = date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit', // '2-digit' for numeric month
      day: '2-digit',
    });
  
    // Get the locale time string
    const localeTime = date.toLocaleTimeString('en-HK', {
      hour: '2-digit',
      minute: '2-digit',
      second: 'numeric',
      fractionalSecondDigits: 2,
      hour12: false, // Set to true for 12-hour format
    });
// Format the date and time to create an ISO-like string
    return `${localeDate.replace(/\//g, '-')}T${localeTime}`;
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#87CEFA",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: '#87CEFA',
    fontFamily: 'monospace'
  },
  dayItem: {
    marginLeft: 76
  },
  modalViewLight: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewDark: {
    margin: 20,
    backgroundColor: appColors.viewBackground.dark,
    borderRadius: 10,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextLight: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
  modalTextDark: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white'
  },
  inputLight: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingLeft: 10,
  },
  inputDark: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingLeft: 10,
    color: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#87CEFA'
  },
  pickerLight: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  pickerDark: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    color: 'white'
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

