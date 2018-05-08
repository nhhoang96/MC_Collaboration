import React, { Component } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CardSection, CardSectionRow, Input, Button, Footer } from '../components/common';
import textStyles from "../components/styles/text";
import formattingStyles from '../components/styles/formatting';
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";
import DropDownInput from "../components/DropDownInput";
import firebase from 'firebase';

class AddClass extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
      this.userRef = firebase.database().ref('users/' + this.props.navigation.state.params.ID);
      this.courseRef = firebase.database().ref('course/');
  }

  state = {currentUser: [], course: []};
  componentDidMount() {
    this.listenForCurrentUserValues(this.userRef);
    this.listenForClass(this.courseRef);
  }

  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  };

  listenForClass (courseRef) {
    courseRef.on('value', (dataSnapshot) => {
      var course = [];
      dataSnapshot.forEach((child) => {
            course.push(child.val());
           
      });
      this.setState({
        course: course
      });

    });
  }


  render() {
    return (
      <View style={formattingStyles.container}>
        <ScrollView style={styles.infoContainerStyle}>
          <View>
            <Text style={textStyles.headerText}>{"Welcome, " + this.state.currentUser.firstname + "!"}</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>

          <CardSection>
          <DropDownInput title={"Previous Classes"} options={this.state.course}/>
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
          <DropDownInput title={"Current Classes"} options={this.state.course}/>
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
        <CardSectionRow>
        <View style={{ paddingTop: 10, paddingLeft: 20, flexDirection: 'row', width: 315, justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('addInfo',this.props.navigation.state.params)}>
              <Text style={textStyles.label}>Back</Text>
              <Icon name="arrow-circle-left" size={30} style={{ color: "#253A66" }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('student',this.props.navigation.state.params)}>
              <Text style={textStyles.label}>Next</Text>
              <Icon name="arrow-circle-right" size={30} style={{ color: "#253A66" }}/>
            </TouchableOpacity>
          </View>
        </CardSectionRow>
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
