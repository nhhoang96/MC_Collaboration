import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { Button, Input, CardSection } from "../components/common";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import DisplayImage from "../components/DisplayImage";
import DropDownInput from "../components/DropDownInput"
import firebase from 'firebase';

var indexInterest = 1;
var indexConClass = 1;
var indexPastClass = 1;

class ProfessorProfile extends Component {
  constructor(props) {
    super(props);
    this.userRef = firebase.database().ref('users/' + this.props.navigation.state.params.ID);
    this.interestRef = firebase.database().ref('interests/');
    this.courseRef = firebase.database().ref('course/');
  };

  state = {
    self: 1,
    currentUser: [],
    edit: false,
    interests: [],
    courses: [],
    curConCourse: [],
    curPastCourse: [],
    curInterest: [],

  };

  componentDidMount(){
    this.listenForCurrentUserValues(this.userRef);
    this.listenForInterests(this.interestRef);
    this.listenForCourses(this.courseRef);
  };

  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  };

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

  listenForCourses (courseRef) {
    courseRef.on('value', (dataSnapshot) => {
      var courses = [];
      dataSnapshot.forEach((child) => {
            courses.push(child.val());
      });
      this.setState({
        courses: courses
      });
    });
  };

  _addCurrentClass() {
    let temp = this.indexConClass ++;
    this.state.curConCourse.push(temp);
    this.setState({
      curConCourse: this.state.curConCourse
    });

  }
  _addPastClass() {
    let temp = this.indexPastClass ++;
    this.state.curPastCourse.push(temp);
    this.setState({
        curPastCourse: this.state.curPastCourse
    });

  }

  _addInterest() {
    let temp = this.indexInterest ++;
    this.state.curInterest.push(temp);
    this.setState({
        curInterest: this.state.curInterest
    });

  }

  render() {
    let curInterest = this.state.curInterest.map((a, i) => {
      return <DropDownInput title={"Interest"} options={this.state.interests} key={i}/>
    });

    let curConCourse = this.state.curConCourse.map((a, i) => {
      return <DropDownInput title={"Current Classes"} options={this.state.courses} key={i}/>
    });

    let curPastCourse = this.state.curPastCourse.map((a, i) => {
      return <DropDownInput title={"Previous Classes"} options={this.state.courses} key={i}/>
    });
  return (
    <View>
    {this.state.edit == false &&(
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

            <View style={{ width: 100, marginTop: 12 }}>
            <Button onPress={() => this.props.navigation.navigate('chatList', this.props.navigation.state.params)}>Messages</Button>
            </View>
            
          </View>

          <View>
            <DisplayImage id ={this.props.navigation.state.params.ID}  />
          </View>
        </View>

        <View>
          <Text style={{ paddingTop: 10 }}>{this.state.currentUser.office}</Text>
          <Text>{this.state.currentUser.Department}</Text>
          <Text>{this.state.currentUser.Position}</Text>
        </View>

        <InfoBlock info={this.state.currentUser.interest + ', ' + this.state.currentUser.interest2} title="Interests" />

        <InfoBlock info={this.state.currentUser.currentClass + ', ' + this.state.currentUser.currentClass2} title="Current Classes" />

        <InfoBlock info={this.state.currentUser.pastClass + ', ' + this.state.currentUser.pastClass2} title="Previous Classes" />
        
        <Button style={{ marginTop: 10 }} onPress={() => {
            firebase.auth().signOut();
            this.props.navigation.navigate('login');
            }}>
            <Text>Sign Out </Text>
          </Button>

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
          <View>
          <DisplayImage id ={this.props.navigation.state.params.ID}  />
          </View>
        </View>

        <View>
          <Input label={'Office'} value={this.state.currentUser.office} />
          <Input label={'Department'} value={this.state.currentUser.Department} />
          <Input label={'Position'} value={this.state.currentUser.Position} />
        </View>
        
        <CardSection>
            <DropDownInput title={"Interest"} options={this.state.interests} key={0}/>
            {curInterest}
            <TouchableOpacity
                onPress={() => {
                  this._addInterest()
                  {curInterest}
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
          
            <CardSection>
            <DropDownInput title={"Current Classes"} options={this.state.courses} key={0}/>
            {curConCourse}
            <TouchableOpacity
                onPress={() => {
                  this._addCurrentClass()
                  {curConCourse}
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>

            <CardSection>
            <DropDownInput title={"Previous Classes"} options={this.state.courses} key={0}/>
              {curPastCourse}
            <TouchableOpacity
                onPress={() => {
                  this._addPastClass()
                  {curPastCourse}
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>

        {/* <InfoBlock info={this.state.currentUser.interest + ', ' + this.state.currentUser.interest2} title="Interests" />
        <Icon name="plus-circle" size={30} color="#253A66" />

        <InfoBlock info={this.state.currentUser.currentClass + ', ' + this.state.currentUser.currentClass2} title="Current Classes" />
        <Icon name="plus-circle" size={30} color="#253A66" />

        <InfoBlock info={this.state.currentUser.pastClass + ', ' + this.state.currentUser.pastClass2} title="Previous Classes" />
        <Icon name="plus-circle" size={30} color="#253A66" />
         */}
        <View style={{ marginBottom: 30 }}>
          <Button style={{ marginTop: 10 }} onPress={() => this.setState({ edit: false })}>
            <Text>Save Changes</Text>
          </Button>
          <Button style={{ marginTop: 10 }} onPress={() => {
            firebase.auth().signOut();
            this.props.navigation.navigate('login', this.props.navigation.state.params);
            }}>
            <Text>Sign Out </Text>
          </Button>
        </View>
      </ScrollView>
    )}
    </View>
  )};
};

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
  buttonContainer: {
    height: 40,
    width: 90,
    justifyContent: "flex-end"
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-between"
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
    backgroundColor: "gray"
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

export default ProfessorProfile;
