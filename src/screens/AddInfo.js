import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import {
  Header,
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import AddInput from "../components/AddInput";
import firebase from "firebase";

class AddInfo extends Component {
  state = { minor: "", concentration: "", interest: ""};
  onButtonPress() {
    const { minor, concentration, interest } = this.state;
    var db = firebase.database();
    var ref = db.ref();
    var userRef = ref.child('users');
    userRef.set({
      ep1247: {
        minor: this.state.minor,
        concentration: this.state.concentration,
        interest: this.state.interest 
      }
    })
    // database.ref('users/hn1174').set({
    //   user
    // });
    //this.setState({ error: "", loading: true });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(email, password)
    //       .then(this.onLoginSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }

  render() {
    return (
      <View>
        <Header headerText="Add Information" />
        <CardSection>
          <AddInput 
            text="Minor(s)" 
            placeholder="ex.: Math" 
            value={this.state.minor}
            onChangeText={minor => this.setState({ minor })}
          />
        </CardSection>
        <CardSection>
          <AddInput 
            text="Concentration(s)" 
            placeholder="ex.: Web Management"
            value={this.state.concentration}
            onChangeText={concentration => this.setState({ concentration })} 
          />
        </CardSection>
        <CardSection>
          <AddInput 
            text="Interest(s)" 
            placeholder="ex.: iOS Development"
            value={this.state.interest}
            onChangeText={interest => this.setState({ interest })}  
          />
        </CardSection>
        <CardSection>
        <Button onPress={this.onButtonPress.bind(this)} >Submit</Button>
        </CardSection>
      </View>
    );
  }
}

export default AddInfo;
