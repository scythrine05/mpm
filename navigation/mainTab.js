import React from 'react';

import {Dimensions, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/home';
import Community from '../screens/community';
import Meet from '../screens/meet';
import Profile from '../screens/profile';
import Signup from '../screens/signup';

const Tab = createBottomTabNavigator();

//Components
import Header from '../components/headers/main2';
import Header2 from '../components/headers/main';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Feeds"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#282c40',
        header: props => <Header {...props} />,
        tabBarStyle: {
          height: windowHeight / 15,
        },
      }}>
      <Tab.Screen
        name="Feeds"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home-filled" color={color} size={size} />
          ),
          header: props => <Header2 {...props} />,
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="people-alt" color={color} size={size} />
          ),
          tabBarStyle: {
            backgroundColor: '#212121',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#636363',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Meetings"
        component={Meet}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-note" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}
