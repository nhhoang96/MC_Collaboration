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
import formattingStyles from '../components/styles/formatting';
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";
import DropDownInput from "../components/DropDownInput";
import firebase from "firebase";

class AddInfo extends Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];

    this.userRef = firebase.database().ref('users/' + this.props.navigation.state.params.ID);
    this.interestRef = firebase.database().ref('interests/');
    this.majorRef = firebase.database().ref('majors/');
    this.minorRef = firebase.database().ref('minors/');
  }


  state = { majors: [], minors: [], interests: [], currentUser:[], };

  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  };

  onButtonPress() {
    // userRef.update({
    //     major: this.state.major,
    //     minor: this.state.minor,
    //     interests: this.state.interest,
    // });
    this.props.navigation.navigate('addInfo', this.props.navigation.state.params);
  };

  componentDidMount(){
    this.listenForCurrentUserValues(this.userRef)
    this.listenForMajors(this.majorRef);
    this.listenForMinors(this.minorRef);
    this.listenForInterests(this.interestRef);
  }

  listenForMajors (majorRef) {
    majorRef.on('value', (dataSnapshot) => {
      var majors = [];
      dataSnapshot.forEach((child) => {
            majors.push(child.val());
      });
      this.setState({
        majors: majors
      });

    });
  }

  listenForMinors (minorRef) {
    minorRef.on('value', (dataSnapshot) => {
      var minors = [];
      dataSnapshot.forEach((child) => {
            minors.push(child.val());
      });
      this.setState({
        minors: minors
      });

    });
  }

  listenForInterests (interestRef) {
    interestRef.on('value', (dataSnapshot) => {
      var interests = [];
      dataSnapshot.forEach((child) => {
            interests.push(child.val());
      });
      this.setState({
        interests: interests
      });

    });
  }

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
          <CardSection>
          <DropDownInput title={"Major"} options={this.state.majors} key ={0}/>
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
          <DropDownInput title={"Minors"} options={this.state.minors}/>
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
          <DropDownInput title={"Interests"} options={this.state.interests} key ={0}/>
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
        <Button onPress={this.onButtonPress.bind(this)} >Submit</Button>
        </CardSection>
        </ScrollView>
        <CardSection>
          <View style={{ paddingTop: 10, paddingLeft: 20, flexDirection: 'row', width: 315, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('checkInfo',this.props.navigation.state.params)}>
            <Text style={textStyles.label}>Back</Text>
            <Icon name="arrow-circle-left" size={30} style={{ color: "#253A66" }}/>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('addClass',this.props.navigation.state.params)}>
              <Text style={textStyles.label}>Next</Text>
              <Icon name="arrow-circle-right" size={30} style={{ color: "#253A66" }}/>
            </TouchableOpacity>
          </View>
        </CardSection>
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
