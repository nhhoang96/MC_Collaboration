import React, { Component } from "react";
import { View } from 'react-native';
import { Header, Spinner } from './src/components/common';
import firebase from "firebase";

import { StackNavigator } from 'react-navigation';

import LoginForm from "./src/LoginForm";
import ProfessorProfile from "./src/screens/ProfessorProfile";
import StudentProfile from "./src/screens/StudentProfile";
import CheckProfile from "./src/screens/CheckProfile";
import CheckInfo from './src/screens/CheckInfo';
import AddInfo from './src/screens/AddInfo';
import AddClass from './src/screens/AddClass';
import Messaging from "./src/screens/Messaging";

const MainNavigator = StackNavigator(
  {
    login : { screen : LoginForm},
    professor : { screen : ProfessorProfile},
    student : { screen : StudentProfile },
    checkProfile : { screen : CheckProfile},
    checkInfo : { screen : CheckInfo},
    addInfo : { screen : AddInfo},
    addClass : { screen : AddClass},
    chatList : { screen : Messaging}
  },
  {
    initialRouteName: 'checkInfo',
    headerMode: 'none',
  }
)

class App extends Component {
  
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDHVz7tPMw815mbZYn_lEV30IPajF8nXRk",
      authDomain: "mc-collaboration.firebaseapp.com",
      databaseURL: "https://mc-collaboration.firebaseio.com",
      projectId: "mc-collaboration",
      storageBucket: "mc-collaboration.appspot.com",
      messagingSenderId: "724728798440"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <StudentProfile/>;
      case false:
        return <StudentProfile/>;
      default:
        return <Spinner size="large" />;
        // return <CheckInfo/>;
      }
    }

  render() {
    return (
      //<MainNavigator />
      <StudentProfile/>
    );
  }
}

export default App;
