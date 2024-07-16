import React, {Component } from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import { Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { Agenda } from "@/components/Calendar/test/CalendarTheme";
import testIDs from '../testIDs';
import { callfunction, callScores } from '@/components/callfunction';

interface State {
  items?: AgendaSchedule;
  data?: Promise<any>;
}

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    data: undefined
  };

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        renderItem={this.renderItem}
        loadItemsForMonth={this.loadItems}
        renderEmptyDate={this.renderEmptyDate}
        // rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
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
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        renderDay={this.renderDay}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};
    const callfunc = callfunction();
    const callScore = callScores();

    console.log(items)
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }

      const scoreItems: AgendaSchedule = {}
      callScore.then((result) => {
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
          const date = result[key].Date.split('T')[0];
          const location = result[key].Location;
          const loseScore = result[key].LoseScore;
          const loserBH = result[key].LoserBH;
          const loserFH = result[key].LoserFH;
          const matchID = result[key].MatchID;
          const winScore = result[key].WinScore;
          const winnerBH = result[key].WinnerBH;
          const winnerFH = result[key].WinnerFH;
          
          // if (!scoreItems[date]) {
          //   scoreItems[date] = [];
          // }
          // scoreItems[date].push({
          //     name: `Location : ${location} \n ${loserBH} ${loserFH} ${loseScore} : ${winScore} ${winnerBH} ${winnerFH}`,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //     day: date,
          // })
        })
      })

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
        // console.log(newItems)

      });
      this.setState({
        items: newItems
      });
    }, 1000);
  };
  
  convertDate = () => {

  }

  renderDay = (day: any) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem}/>;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';


    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
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
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  }
});