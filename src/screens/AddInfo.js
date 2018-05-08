import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
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

var indexMaj = 1;
var indexMin = 1;
var indexInt = 1;

class AddInfo extends Component {
  constructor(props){
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer'
      ];

    var userID = this.props.navigation.state.params.ID;
    this.userRef = firebase.database().ref('users/' + userID);
    this.interestRef = firebase.database().ref('interests/');
    this.majorRef = firebase.database().ref('majors/');
    this.minorRef = firebase.database().ref('minors/');
  }

  state = { majors: [], 
    minors: [], 
    interests: [], 
    currentUser:[], 
    curMaj:[],
    curMinor:[], 
    curInterest:[], 
    updatedMajor:'', 
    updatedMinor:'', 
    updatedInterest:'' 
  };

  updateValueBeforeAdd() {
    this.setState({
      updatedMajor: this.state.currentUser.major,
      updatedMinor: this.state.currentUser.minor,
      updatedInterest: this.state.currentUser.interest,
    }); 
    
    
};

  componentDidMount(){
    this.listenForCurrentUserValues(this.userRef);
    this.listenForMajors(this.majorRef);
    this.listenForMinors(this.minorRef);
    this.listenForInterests(this.interestRef);
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
    // this.userRef.update({
    //     major: this.state.major,
    //     minor: this.state.minor,
    //     interests: this.state.interest,
    // });
    this.props.navigation.navigate('addClass', this.props.navigation.state.params);
  };

  

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

  _addMajor() {
    let temp = this.indexMaj ++;
    this.state.curMaj.push(temp);
    this.setState({
        curMaj: this.state.curMaj
    });
    this.updateValueBeforeAdd();
  }

  _subtractMajor() {
    let temp = this.indexMaj --;
    this.state.curMaj.pop();
    this.setState({
        curMaj: this.state.curMaj
    });
  }


  _addMinor() {
    let temp = this.indexMin ++;
    this.state.curMinor.push(temp);
    this.setState({
        curMinor: this.state.curMinor
    });
  }

  _subtractMinor() {
    let temp = this.indexMinor --;
    this.state.curMinor.pop();
    this.setState({
        curMinor: this.state.curMinor
    });
  }

  _addInterest() {
    let temp = this.indexInt ++;
    this.state.curInterest.push(temp);
    this.setState({
      curInterest: this.state.curInterest
    });
  }

  _subtractInterest() {
    let temp = this.indexInt --;
    this.state.curInterest.pop();
    this.setState({
        curInterest: this.state.curInterest
    });
  }


  render() {
    let curMaj = this.state.curMaj.map((a, i) => {
      return <DropDownInput 
                title={"Major"} 
                options={this.state.majors} 
                key={i} 
                getValue ={returnValue => {this.state.updatedMajor = returnValue }}/>
    });

    let curMinor = this.state.curMinor.map((a, i) => {
      return <DropDownInput title={"Minor"} options={this.state.minors} key={i}/>
    });

    let curInterest = this.state.curInterest.map((a, i) => {
      return <DropDownInput title={"Interest"} options={this.state.interests} key={i}/>
    });
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
          <DropDownInput 
                title={"Major"} 
                options={this.state.majors} 
                key={0} 
                getValue ={returnValue => {this.state.updatedMajor = returnValue }}/>
              {curMaj}
              <TouchableOpacity
                onPress={() => {
                  this._addMajor()
                  {curMaj}
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._subtractMajor()}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="minus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
            
            <CardSection>
            <DropDownInput title={"Minor"} options={this.state.minors} key={0}/>
            {curMinor}
            <TouchableOpacity
                onPress={() => {
                  this._addMinor()
                  {curMinor}
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._subtractMinor()}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="minus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
            
            <CardSection>
              <DropDownInput title={"Interests"} options={this.state.interests} key={0}/>
              {curInterest}
            <TouchableOpacity
                onPress={() => {
                  this._addInterest()
                  {curInterest}
                }}
                style={{ alignSelf: "flex-end" 
              }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._subtractInterest()}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="minus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
          </View>
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
