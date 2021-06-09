{/* <script src="http://localhost:8097"></script> */}
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import {LogBox } from 'react-native';
import Home from './app/views/Home';
import {Contact} from './app/views/Contact';
import {StackNavigator} from 'react-navigation';
import {Video} from './app/views/Video';
import {VideoDetail} from './app/views/VideoDetail';
import {Register} from './app/views/Register';
import {Login} from './app/views/Login';
import {Quiz} from './app/views/Quiz';
import {QuizFinish} from './app/views/QuizFinish';
import {Blog} from './app/views/Blog';
 
const MyRoutes = StackNavigator({
  HomeRT: {
    screen: Home
  },
  ContactRT: {
    screen: Contact
  },
  LessonsRT: {
    screen: Video
  },
  VideoDetailRT: {
    screen: VideoDetail
  },
  RegisterRT: {
    screen: Register
  },
  LoginRT: {
    screen: Login
  },
  QuizRT: {
    screen: Quiz
  },
  QuizFinishRT: {
    screen: QuizFinish
  },
  BlogRT: {
    screen: Blog
  }
},
{
  initialRouteName: 'HomeRT'
}
);

export default function App() {

  //LogBox.ignoreLogs(['Remote debugger']);
  return (
    <MyRoutes />
  );
}


