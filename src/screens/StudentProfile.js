import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Input, CardSection } from "../components/common";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import firebase from 'firebase';
import AddInput from "../components/AddInput";
import DisplayImage from "../components/DisplayImage";

var index = 1;
var indexMin = 1;
var indexCon = 1;
//var index = 2;
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    state = {
      self: 0,
      edit: true,
      count: [],
      studentval: [],
      year: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
      majors: ['Computer Science', 'Business', 'Accounting'],
      curMaj:[],
      curMinor:[],
      curConcen:[],
      minors: ['Mathematics', 'English', 'Biology'],
      concentrations: ['Computer Science', 'Software Development', 'Web Development', 'Business Information System'],
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
    this.userRef = firebase.database().ref('users').child('ep1247');
  };
  
  componentDidMount() {
    this.listenForTasks(this.userRef);
    
  }

  listenForTasks(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var studentval =[];
      dataSnapshot.forEach((child) => {
        studentval.push({
          name: child.val().name,
          _key: child.key
        });
    });
    this.setState({
      studentval: studentval
    });
  });

//   updateUser = (snapshot) => {
//     //this.setState({ studentval: snapshot.child('concentration').val() });
//     return snapshot.child('concentration').val();
//  }
//   async get_firebase_list(){
//     return firebase.database().ref('users').once('value').then(function(snapshot) {
//         var items = [];
//         snapshot.forEach(function(childSnapshot) {
//           var childKey = childSnapshot.key;
//           var childData = childSnapshot.val();
//           items.push(childData);
//           <Text>childData</Text>
//         }); 
//         console.log("items_load: " + items);
        
//         return items;
//     });
  };
  
  _addMajor() {
    let temp = this.index ++;
    state.curMaj.push(temp);
    this.setState({
        curMaj: state.curMaj
    });
  }

  _addMinor() {
    let temp = this.indexMin ++;
    state.curMinor.push(temp);
    this.setState({
        curMinor: state.curMinor
    });
  }

  _addConcen() {
    let temp = this.indexCon ++;
    state.curConcen.push(temp);
    this.setState({
      curConcen: state.curConcen
    });
  }
  render() {
    let curMaj = state.curMaj.map((a, i) => {
      return <AddInput title={"Major"} options={state.majors} key={i}/>                      
    })

    let curMinor = state.curMinor.map((a, i) => {
      return <AddInput title={"Concentration"} options={state.minors} key={i}/>                      
    })
    
    let curConcen = state.curConcen.map((a, i) => {
      return <AddInput title={"Minor"} options={state.concentrations} key={i}/>                      
    })
  return (
    <View>
      {this.state.edit == false && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
              <Text style={textStyles.headerText}>Elizabeth Pinkham</Text>
              <Text>ep1247@messiah.edu</Text>
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
          </View>

          <View>
            <Text style={{ paddingTop: 10 }}>Senior</Text>
            <Text>Computer and Information Science</Text>
            <Text>Concentration: Software Development</Text>
            <Text>Minor: Business Administration</Text>
          </View>

          <InfoBlock info={this.state.interests} title="Interests" />

          <InfoBlock info={this.state.currentclasses} title="Current Classes" />

          <InfoBlock info={this.state.prevclasses} title="Previous Classes" />

          <View style={{ width: 100, marginTop: 12 }}>
            <Button onPress={() => this.props.navigation.navigate('chatList')}>Messages</Button>
          </View>
        </ScrollView>
      )}

      {this.state.edit == true && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
            
              <Text>{ state.studentval.name }</Text>
              <Input label={"Name"} value={ "Test"
                // userRoot.once('value').then(function(snapshot) {
                //   this.setState({ studentval: snapshot.val() });
                //   return String(snapshot.child('name').val());
                // })
                //state.studentval
              } />
              <Input label={"Email"} value={"ep1247@messiah.edu"} />
              {/* <View>{username}</View> */}
             
            </View>
            <View >
              <DisplayImage />
            </View>
          </View>

          <View>
            <AddInput title={"Year"} options={state.year}/>
            <CardSection>
              {curMaj}
              <TouchableOpacity
                onPress={() => this._addMajor()}
                style={{ alignSelf: "flex-end" }}
              >
              
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
            <CardSection>
              {curConcen}
            <TouchableOpacity
                onPress={() => this._addConcen()}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>

            <CardSection>
            {curMinor}
            <TouchableOpacity
                onPress={() => this._addMinor()}
                style={{ alignSelf: "flex-end" }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
            </CardSection>
          </View>

          <InfoBlock info={this.state.interests} title="Interests" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={this.state.currentclasses} title="Current Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={this.state.prevclasses} title="Previous Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />
          <View style={{ marginBottom: 30 }}>
            <Button style={{ marginTop: 10 }} onPress={() => this.setState({ edit: false })}>
              <Text>Save Changes</Text>
            </Button>
            <Button style={{ marginTop: 10 }} onPress={() => firebase.auth().signOut()}>
              <Text>Sign Out</Text>
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  )};
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
