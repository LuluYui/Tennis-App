/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Agenda as DefaultAgenda, Calendar as DefaultCalendar, CalendarList as DefaultCalendarList  } from 'react-native-calendars';
import { CalendarProps } from 'react-native-calendars/src/calendar/index';
import { ContextProp } from 'react-native-calendars/src/types'

import Colors from '@/constants/Colors';
import { useColorScheme } from '../../useColorScheme';
import React, { useState, useEffect }from 'react';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export interface themedCalendarProps extends CalendarProps {
  lightColor?: string;
  darkColor?: string;
}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Calendar(props: themedCalendarProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultCalendar key={color} theme={{calendarBackground: color}} {...otherProps} />
}

export function Agenda(props: themedCalendarProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultAgenda key={color} theme={{calendarBackground: color, reservationsBackgroundColor: color}} {...otherProps} />
}