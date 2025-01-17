import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const TAB_ONE_TITLE = 'Schedule';
  const TAB_TWO_TITLE = 'Statistics';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: TAB_ONE_TITLE,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: TAB_TWO_TITLE,
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
          headerRight: () => (
            <Link href="/notification_test" asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialIcons name="notification-add" 
                    size={25} 
                    color={Colors[colorScheme ?? 'light'].text} 
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* How to fix the add_gameScore thingy */}
      <Tabs.Screen
        name="(screens)/add_gameScore_screen"
        options={{
          title: 'add_gameScore',
          href: null,
          headerLeft: () => (
              <Pressable onPress={()=>{ router.back() }}>
                {({ pressed }) => (
                  <FontAwesome
                    name="arrow-left"
                    icon="fa-thin fa-arrow-left" 
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
          tabBarStyle: { display: 'none'}
        }}
      />
    </Tabs>
  );
}
