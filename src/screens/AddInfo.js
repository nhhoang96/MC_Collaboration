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

class AddInfo extends Component {
  render() {
    return (
      <View>
        <Header headerText="Add Information" />
        <CardSection>
          <AddInput text="Minor(s)" placeholder="ex.: Math" />
        </CardSection>
        <CardSection>
          <AddInput text="Concentration(s)" placeholder="ex.: Web Management" />
        </CardSection>
        <CardSection>
          <AddInput text="Interest(s)" placeholder="ex.: iOS Development" />
        </CardSection>
      </View>
    );
  }
}

export default AddInfo;
