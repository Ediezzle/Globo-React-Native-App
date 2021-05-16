<script src="http://localhost:8097"></script>
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {LogBox } from 'react-native';
import Home from './app/views/Home';
import {Contact} from './app/views/Contact';
import {StackNavigator} from 'react-navigation';

const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home
  },
  ContactRT: {
    screen: Contact
  }
},
{
  initialRouteName: 'HomeRT'
}
);

export default function App() {

  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <MyRoutes />
  );
}


