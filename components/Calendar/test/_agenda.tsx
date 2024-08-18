import React, {Component } from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from '@/components/Themed';
// import { Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { Agenda } from "@/components/Calendar/test/CalendarTheme";
import testIDs from '../testIDs';
import {  callScores } from '@/components/callfunction';
import { appColors } from '@/constants/Colors';
import { app } from '@/firebase/authentication';

interface State {
  items?: AgendaSchedule;
  data?: AgendaSchedule;
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
        items={this.state.data}
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
      />
    );
  }

  loadItems = (day: DateData) => {
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
          const date = result[key].Date.split('T')[0];
          const location = result[key].Location;
          const loseScore = result[key].LoseScore;
          const loserBH = result[key].LoserBH;
          const loserFH = result[key].LoserFH;
          const matchID = result[key].MatchID;
          const winScore = result[key].WinScore;
          const winnerBH = result[key].WinnerBH;
          const winnerFH = result[key].WinnerFH;

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
          })
        })

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!tmp[strTime]) {
          tmp[strTime] = [];
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
        Object.keys(tmp).forEach(key => {
          scoreItems[key] = tmp[key];
        });
        this.setState({
          data: tmp
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

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 21 : 18;
    const color = isFirst ? 'black' : '#43515f';

    // Handle the rendering style of the items
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}
      >
        {/* make a score chart here  */}
        <Text style={{fontSize, color}}> Location : {reservation.location}</Text>
        <View darkColor='#87CEFA' lightColor='#87CEFA' style={{ flexDirection: 'row', justifyContent: 'center'}}> 
          <Text style={{fontSize, color}}> {reservation.winnerBH} {reservation.winnerFH} </Text>
          <Text style={{fontSize, color}}> {reservation.winScore} - {reservation.loseScore} </Text>
          <Text style={{fontSize, color}}> {reservation.loserBH} {reservation.loserFH} </Text>
        </View>
        {/* <Text style={{fontSize, color}}>{reservation.name}</Text> */}
      </TouchableOpacity>
    );
  };

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
    color: '#87CEFA',
    fontFamily: 'monospace'
  },
  dayItem: {
    marginLeft: 76
  }
});