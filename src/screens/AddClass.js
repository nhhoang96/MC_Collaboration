import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { CardSection, Input, Button } from '../components/common';
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";

class AddClass extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text style={textStyles.headerText}>Welcome, Elizabeth!</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>

        <CardSection>
        <Button>Submit</Button>
        </CardSection>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('student')}>
            <Text style={textStyles.label}>Next</Text>
            <Icon name="arrow-circle-right" size={30} style={{ color: "#253A66" }}/>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  infoContainerStyle: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 20
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  footerContainer: {
    height: 20,
    flex: 1,
    flexDirection: "row"
  },
  next: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 10
  }
};

export default AddClass;
