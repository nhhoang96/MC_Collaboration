import React, { Component } from "react";
import { View } from "react-native";
import { Pages } from "react-native-pages";
import CheckInfo from "./CheckInfo";
import AddInfo from "./AddInfo";

class CheckProfile extends Component {
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