import React, { Component } from "react";
import { View } from 'react-native';
import { Header, Spinner } from './src/components/common';
import StudentProfile from "./src/screens/StudentProfile";
import firebase from "firebase";
import LoginForm from "./src/LoginForm";
import ProfessorProfile from "./src/screens/ProfessorProfile";
import CheckProfile from "./src/screens/CheckProfile";

class App extends Component {
  
  state = { loggedIn: false };

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
        return <StudentProfile />;
      case false:
        return <LoginForm />;
      // default:
      //   return <LoginForm />;
      }
    }

  render() {
    return (
      <View>
        {/* <Header headerText="MC_Collaboration" /> */}
        {this.renderContent()}
      </View>
    );
  }  
}

export default App;
