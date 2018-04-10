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
        <ScrollView style={styles.infoContainerStyle}>
          <View>
            <Text style={textStyles.headerText}>Welcome, Elizabeth!</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>

          <CardSection>
            <AddInput text="Previous Classes" placeholder="ex. [CIS 180] Intro to Computer Science" />
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                this.state.majors.push(
                  <AddInput
                    text="Major(s)"
                    labels={["1", "2", "3"]}
                    key={this.state.majors.length}
                  />
                );
              }}
            >
              <Icon name="plus-circle" size={30} color="#253A66" />
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <AddInput text="Current Classes" placeholder="ex. [CIS 191] Web Development I" />
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                this.state.majors.push(
                  <AddInput
                    text="Major(s)"
                    labels={["1", "2", "3"]}
                    key={this.state.majors.length}
                  />
                );
              }}
            >
              <Icon name="plus-circle" size={30} color="#253A66" />
            </TouchableOpacity>
          </CardSection>


          <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('addInfo')}>
            <Text style={textStyles.label}>Back</Text>
            <Icon name="arrow-circle-left" size={30} style={{ color: "#253A66" }}/>
          </TouchableOpacity>
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
