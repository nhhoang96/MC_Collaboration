import React from "react";
import { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Picker,
  TouchableOpacity,
  ProgressBar,
  Alert
} from "react-native";
import textStyles from "../components/styles/text";
import formattingStyles from '../components/styles/formatting';
import { CardSection, CardSectionRow, Input, Button } from "../components/common";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";
import { StackNavigator } from "react-navigation";
import firebase from 'firebase';

class CheckInfo extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
    var userID = this.props.navigation.state.params.ID;
    this.userRef = firebase.database().ref('users/' + userID);
    
  }

  state = {
    majors: [<AddInput text={"Major"} labels={["1", "2", "3"]} key={0} />],
    classes: ["First Year", "Sophomore", "Junoir", "Senior"],
    currentUser: [],
    updatedFirstName : "",
    updatedLastName: "",
    updatedYear : "",
    updatedPhone : "",

    
  };

  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  };

  onButtonPress() {
    
    userRef.update({
        firstname: this.state.updatedFirstName,
        lastname: this.state.updatedLastName,
        year: this.state.updatedYear,
        phonenumber: this.state.updatedPhone,
    });
    this.props.navigation.navigate('addInfo');
    // Alert.alert('Button pressed',this.state.updatedYear );
  };

  

  componentDidMount() {
    this.listenForCurrentUserValues(this.userRef);
  };

  render() {
    return (
      <View style={formattingStyles.container}>
        <ScrollView style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Text style={textStyles.headerText}>{"Welcome, " + this.state.currentUser.firstname + "!"}</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>
          <View>
            <CardSection>
              <Input 
                label="Name" 
                placeholder={this.state.currentUser.firstname + ' ' + this.state.currentUser.lastname} 
                onChangeText = {(value) => {
                  this.setState({updatedFirstName: value.split(' ')[0]});
                  this.setState({updatedLastName: value.split(' ')[1]})}}
                />
              
            </CardSection>
            <CardSection>
              <Input 
                label="Year" 
                placeholder={this.state.currentUser.year} 
                onChangeText = {(value) => {this.setState({updatedYear: value})}}
                />
            </CardSection>
            <CardSection>
              <Input 
                label="Phone Number" 
                placeholder={this.state.currentUser.phonenumber} 
                onChangeText = {(value) => {this.setState({updatedPhone: value})}}
                />
            </CardSection>
            <Button onPress={this.onButtonPress.bind(this)} >Submit</Button>
          </View>
        </ScrollView>
        <CardSection>
        <View style={{ paddingTop: 10, paddingLeft: 20, flexDirection: 'row', width: 315, justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => {
                
                this.props.navigation.navigate('addInfo');

                }}>
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
