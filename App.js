import React, { Component } from "react";
import StudentProfile from "./src/screens/StudentProfile";
import firebase from "firebase";
import LoginForm from "./src/LoginForm";
import ProfessorProfile from "./src/screens/ProfessorProfile";
import CheckProfile from "./src/screens/CheckProfile";

class App extends Component {
  
  render() {
    

    var config = {
      apiKey: "AIzaSyDHVz7tPMw815mbZYn_lEV30IPajF8nXRk",
      authDomain: "mc-collaboration.firebaseapp.com",
      databaseURL: "https://mc-collaboration.firebaseio.com",
      projectId: "mc-collaboration",
      storageBucket: "mc-collaboration.appspot.com",
      messagingSenderId: "724728798440"
    };
    firebase.initializeApp(config);
    
    //return <LoginForm />;
    return <StudentProfile />;
    
  }
}

export default App;
