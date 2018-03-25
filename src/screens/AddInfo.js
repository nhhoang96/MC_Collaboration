import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Header,
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";

class AddInfo extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <ScrollView style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Text style={textStyles.headerText}>Welcome, Elizabeth!</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>
          <CardSection>
            <AddInput text="Minor(s)" placeholder="ex.: Math" />
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
            <AddInput
              text="Concentration(s)"
              placeholder="ex.: Web Management"
            />
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
            <AddInput text="Interest(s)" placeholder="ex.: iOS Development" />
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
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.next}>
            <Text style={{ marginRight: 10, marginBottom: 5 }}>Save</Text>
            <Icon name="chevron-circle-right" size={25} />
          </View>
        </View>
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

export default AddInfo;
