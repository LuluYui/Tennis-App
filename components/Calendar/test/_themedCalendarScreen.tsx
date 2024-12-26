import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
import { CalendarUtils, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types'
import { Feather } from '@expo/vector-icons';
import { View, Text } from '@/components/Themed'
import testIDs from '../testIDs';

import { Calendar } from './CalendarTheme';

const INITIAL_DATE = new Date().toISOString().split('T')[0];


const ThemedCalendarScreen = () => {
  const [selected, setSelected] = useState('');
  
  // init the calendar to today's date 
  // @parem Theme settings

  // Set background color with Expo ColorScheme

  //  ---------- separate line --------------
  const getDate = (count: number) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [getDate(-1)]: {
        dotColor: 'red',
        marked: true
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red'
      }
    };
  }, [selected]);

  const renderThemedCalendarWithSelectableDate = () => {
    return (
      <View>
        <Text style={styles.text}>Calendar with selectable date</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          enableSwipeMonths
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </View>
    );
  };

  const renderExamples = () => {
    return (
      <Fragment>
        {renderThemedCalendarWithSelectableDate()}
      </Fragment>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
        {renderExamples()}
    </ScrollView>
    
  );
};

export default ThemedCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  calendar: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  switchText: {
    margin: 10,
    fontSize: 16
  },
  text: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16
  },
  disabledText: {
    color: 'pink'
  },
  defaultText: {
    color: 'green',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  customDay: {
    textAlign: 'left'
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2'
  }
});
