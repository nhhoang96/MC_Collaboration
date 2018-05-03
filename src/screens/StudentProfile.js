import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Button, Input, CardSection } from "../components/common";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import formattingStyles from '../components/styles/formatting'
import firebase from 'firebase';
import DropDownInput from "../components/DropDownInput";
import DisplayImage from "../components/DisplayImage";

var index = 1;
var indexMin = 1;
var indexCon = 1;

class StudentProfile extends Component {
  constructor(props) {
    super(props);
    var userID = this.props.navigation.state.params.ID;
    this.userRef = firebase.database().ref('users/' + userID);
    //this.userRef = firebase.database().ref('users/ep1247/');
    this.interestRef = firebase.database().ref('interests/');
    this.courseRef = firebase.database().ref('course/');
    this.majorRef = firebase.database().ref('majors/');
    this.minorRef = firebase.database().ref('minors/');
    this.concentrationRef = firebase.database().ref('concentrations/');
  };

  state = {
    self: 1,
    edit: false,
    count: [],
    currentUser: [],
    year: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    majors: [],
    curMaj:[],
    curMinor:[],
    curConcen:[],
    minors: [],
    concentrations: [],
    interests: [
      "Artificial Intelligence",
      "Human Computer Interaction",
      "Web Development",
      "Mobile Development"
    ],
    currentclasses: [
      "[CIS 412] System Analysis and Design Applications",
      "[CIS 418] Artificial Intelligence"
    ],
    prevclasses: [
      "[CIS 411] Systems Analysis and Design Concepts",
      "[CIS 291] Web Development: Server Side",
      "[CIS 432] Database Applications"
    ]
  };

json_function = () => {
    var json_fragment = this.userRef.concentration;
    Alert.alert(
      'Json_text', json_fragment
    );
}

  componentDidMount() {
    this.listenForCurrentUserValues(this.userRef);
    this.listenForMajors(this.majorRef);
    this.listenForMinors(this.minorRef);
    this.listenForConcentration(this.concentrationRef);
  }
  listenForCourses (courseRef) {
    courseRef.on('value', (dataSnapshot) => {
      var curCourse = [];
      dataSnapshot.forEach((child) => {
            curCourse.push(child.val());
      });
      this.setState({

      });

    });
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

  listenForConcentration (concentrationRef) {
    concentrationRef.on('value', (dataSnapshot) => {
      var concentrations = [];
      dataSnapshot.forEach((child) => {
          concentrations.push(child.val());
      });
      this.setState({
        concentrations: concentrations
      });

    });
  }


  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  }

  _addMajor() {
    let temp = this.index ++;
    this.state.curMaj.push(temp);
    this.setState({
        curMaj: this.state.curMaj
    });

  }

  _subtractMajor() {
    let temp = this.index --;
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

  _addConcen() {
    let temp = this.indexCon ++;
    this.state.curConcen.push(temp);
    this.setState({
      curConcen: this.state.curConcen
    });
  }

  _subtractConcen() {
    let temp = this.indexCon --;
    this.state.curConcen.pop();
    this.setState({
        curConcen: this.state.curConcen
    });
  }

  updateState = () => {
    this.setState({ edit: false })
 }

  render() {
    let curMaj = this.state.curMaj.map((a, i) => {
      return <DropDownInput title={"Major"} options={this.state.majors} key={i}/>
    });

    let curMinor = this.state.curMinor.map((a, i) => {
      return <DropDownInput title={"Minor"} options={this.state.minors} key={i}/>
    });

    let curConcen = this.state.curConcen.map((a, i) => {
      return <DropDownInput title={"Concentration"} options={this.state.concentrations} key={i}/>
    });

  return (
    <View>
      {this.state.edit == false && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
              <Text style={textStyles.headerText}>{this.state.currentUser.firstname + ' ' + this.state.currentUser.lastname}</Text>
              <Text>{this.state.currentUser.email}</Text>
              {this.state.self == 0 && (
                <TouchableOpacity style={styles.sendMessage}>
                  <Text style={styles.sendMessageText}>Send Message</Text>
                </TouchableOpacity>
              )}
              {this.state.self == 1 && (
                <View
                  style={{
                    paddingTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity onPress={() => {this.setState({ edit: true })}}>
                    <Icon name="edit" size={30} color="#2D9AE8" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="cog" size={30} color="#2D9AE8" />
                  </TouchableOpacity>
                </View>
              )}

            </View>
            <View >
              <DisplayImage id ={this.userID}  />
            </View>
          </View>

          <View>
            <Text style={{ paddingTop: 10 }}>{this.state.currentUser.year}</Text>
            <Text>{"Major: " + this.state.currentUser.major}</Text>
            <Text>{"Concentration: " + this.state.currentUser.concentration}</Text>
            <Text>{"Minor: " + this.state.currentUser.minor}</Text>
          </View>

          <InfoBlock info={this.state.currentUser.interest + ', ' + this.state.currentUser.interest2} title="Interests" />

          <InfoBlock info={this.state.currentUser.currentClass + ', ' + this.state.currentUser.currentClass2} title="Current Classes" />

          <InfoBlock info={this.state.currentUser.pastClass + ', ' + this.state.currentUser.pastClass2} title="Previous Classes" />

          <View style={{ width: 100, marginTop: 12 }}>
            <Button onPress={() => this.props.navigation.navigate('chatList')}>Messages</Button>
          </View>
        </ScrollView>
      )}

      {this.state.edit == true && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
              <Input label={"Name"} value={
                this.state.currentUser.firstname + ' ' + this.state.currentUser.lastname
              } />
              <Input label={"Email"} value={this.state.currentUser.email} />

            </View>
            <View >
              <DisplayImage />
            </View>
          </View>

          <View>
            <DropDownInput title={"Year"} options={this.state.year}/>
            <CardSection>
              <DropDownInput title={"Major"} options={this.state.majors} key={0}/>
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
              <DropDownInput title={"Concentration"} options={this.state.concentrations} key={0}/>
              {curConcen}
            <TouchableOpacity
                onPress={() => {
                  this._addConcen()
                  {curConcen}
                }}
                style={{ alignSelf: "flex-end" 
              }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this._subtractConcen()}
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
          </View>

          <InfoBlock info={this.state.currentUser.interest + ', ' + this.state.currentUser.interest2} title="Interests" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={this.state.currentUser.currentClass + ', ' + this.state.currentUser.currentClass2} title="Current Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={this.state.currentUser.pastClass + ', ' + this.state.currentUser.pastClass2} title="Previous Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />
          <View style={{ marginBottom: 30 }}>
            <Button style={{ marginTop: 10 }} onPress={() => this.setState({edit: false})}>
              <Text>Save Changes</Text>
            </Button>
            <Button style={{ marginTop: 10 }} onPress={() => firebase.auth().signOut()}>
              <Text>Sign Out</Text>
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
}

const styles = {
  infoContainerStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
    position: "relative"
  },
  containerStyle: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 20
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 10
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
    marginRight: 20,
    resizeMode: "contain",
    alignSelf: "flex-end",
    backgroundColor: "gray",
    borderRadius: 5
  },
  sendMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2D9AE8",
    marginTop: 5,
    borderRadius: 5,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5
  },
  sendMessageText: {
    color: "#ffffff",
    paddingRight: 10,
    fontSize: 15,
    alignSelf: "center"
  }
};

export default StudentProfile;
