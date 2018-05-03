import React, { Component } from "react";
import { View, Text } from "react-native";
import { Pages } from "react-native-pages";
import formattingStyles from '../components/styles/formatting';
import CheckInfo from "./CheckInfo";
import AddInfo from "./AddInfo";
import firebase from 'firebase'
class CheckProfile extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.listenFor
  }
  render() {
    return (
      <Pages indicatorColor={"rgb(100, 100, 100)"}>
        <View style={{ flex: 1 }}>
          <CheckInfo />
        </View>
        <View style={{ flex: 1 }}>
          <AddInfo />
        </View>
      </Pages>
    );
  }
}

export default CheckProfile;
