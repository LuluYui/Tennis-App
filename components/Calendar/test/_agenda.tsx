import React, { Component } from 'react';
import {Alert, Button, TextInput, Modal, Pressable, StyleSheet, TouchableOpacity, Appearance} from 'react-native';
import { Text, View } from '@/components/Themed';
// import { Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { Agenda } from "@/components/Calendar/test/CalendarTheme";
import testIDs from '../testIDs';
import {  callScores, edit_score } from '@/components/callfunction';
import FloatingButton from './_floatingButtonComponent';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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
}

interface AgendaEntryGameScore extends AgendaEntry {
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
  };

  render() {

    return (
      <>
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          renderItem={this.renderItem}
          loadItemsForMonth={this.loadItems}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          showClosingKnob={true}
          futureScrollRange={50}
          pastScrollRange={50}
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
          // hideExtraDays={false}
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
          // console.log(typeof result[key].Date)
        // console.log(typeof result[key].Date === 'object result[key].Date.toISOString() : () => {})
          let date = ""; 
          typeof result[key].Date === "string" ? date = result[key].Date.split('T')[0] : date = new Date(result[key].Date._seconds * 1000).toISOString().split('T')[0];
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
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!tmp[strTime]) {
          tmp[strTime] = [];
        }
      }

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

      edit_score(this.state.selectedScore.gameID, data)
        .then( (result: any) => {
          console.log('successfully updated ', this.state.selectedScore.gameID)
          console.log(result.data);
        })
        .catch(e => console.log(e))
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({ date: currentDate, datePickerVisible: false });
    }
    console.log(this.state.gameID)

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.editFormVisible}
          onRequestClose={() => this.setState({editFormVisible: false })}
        >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Tennis Scores</Text>
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
            <Text style={styles.modalText}> {this.state.date.toISOString().split('T')[0]}</Text>
            {this.state.datePickerVisible && (
              <DateTimePicker
                value={this.state.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Location Dropdown */}
            <Text style={styles.modalText}>Location:</Text>
            <Picker
              selectedValue={this.state.location}
              style={styles.picker}
              onValueChange={(itemValue) => this.setState({ location: itemValue })}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="LRC" value="LRC" />
              <Picker.Item label="CRC" value="CRC" />
              <Picker.Item label="HKTC" value="HKTC" />
            </Picker>

            {/* Input Fields */}
            <Text style={styles.modalText}>Win BH</Text>
            <TextInput
              placeholder="WinnerBH"
              value={this.state.winnerBH}
              onChangeText={(text) => { this.setState({ winnerBH: text})}}
              style={styles.input}
            />

            <Text style={styles.modalText}>Win FH</Text>
            <TextInput
              placeholder="WinnerFH"
              value={this.state.winnerFH}
              onChangeText={ (text) => { this.setState({ winnerFH: text})}}
              style={styles.input}
            />

            <Text style={styles.modalText}>Win Score</Text>
            <TextInput
              placeholder="Win Score"
              value={this.state.winScore !== undefined ? this.state.winScore.toString() : ''}
              onChangeText={(text) => this.setState({ winScore: text })}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.modalText}>Lose Score</Text>
            <TextInput
              placeholder="Lose Score"
              value={this.state.loseScore !== undefined ? this.state.loseScore.toString() : ''}
              onChangeText={(text) => this.setState({ loseScore: text })}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.modalText}>Loss BH</Text>
            <TextInput
              placeholder="Loser BH"
              value={this.state.loserBH}
              onChangeText={(text) => this.setState({ loserBH: text })}
              style={styles.input}
            />

            <Text style={styles.modalText}>Loss FH</Text>
            <TextInput
              placeholder="Loser FH"
              value={this.state.loserFH}
              onChangeText={(text) => this.setState({ loserFH: text })}
              style={styles.input}
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

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
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
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#87CEFA'
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});