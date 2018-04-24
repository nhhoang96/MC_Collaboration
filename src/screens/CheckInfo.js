import React from "react";
import { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Picker,
  TouchableOpacity,
  ProgressBar
} from "react-native";
import textStyles from "../components/styles/text";
import formattingStyles from '../components/styles/formatting';
import { CardSection, Input, Button } from "../components/common";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";
import { StackNavigator } from "react-navigation";

class CheckInfo extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    majors: [<AddInput text={"Major"} labels={["1", "2", "3"]} key={0} />],
    classes: ["First Year", "Sophomore", "Junoir", "Senior"]
  };
  render() {
    return (
      <View style={formattingStyles.container}>
        <ScrollView style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Text style={textStyles.headerText}>Welcome, Elizabeth!</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>
          <View>
            <CardSection>
              <Input label="Name" placeholder="Elizabeth Pinkham" />
            </CardSection>
            <CardSection>
              <AddInput text="Class" labels={this.state.classes} />
            </CardSection>
            <CardSection>
              <Input label="Phone Number" placeholder="(123) 456-7890" />
            </CardSection>
            <CardSection>
              {this.state.majors}
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
          </View>
        </ScrollView>
        <CardSection>
          <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('addInfo')}>
              <Text style={textStyles.label}>Next</Text>
              <Icon name="arrow-circle-right" size={30} style={{ color: "#253A66" }}/>
            </TouchableOpacity>
          </View>
        </CardSection>
      </View>
    );
  };
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
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
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 10
  },
  thumbnailStyle: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    backgroundColor: "red"
  }
};

export default CheckInfo;
