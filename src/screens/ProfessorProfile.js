import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { Button, Input, CardSection } from "../components/common";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import DisplayImage from "../components/DisplayImage";

class ProfessorProfile extends Component {
  state = {
    self: 1,
    edit: false,
    interests: ["Web Development", "Database Management", "Networking"],
    currentclasses: [
      "[CIS 432] Database Applications",
      "[CIS 191] Web Development: Client Side"
    ],
    pastclasses: [
      "[CIS 291] Web Development: Server Side",
      "[CIS 332] Database Concepts",
      "[CIS 180] Intro to CIS"
    ]
  };
  render() {
  return (
    <View>
    {this.state.edit == false &&(
      <ScrollView style={styles.containerStyle}>
        <View style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Text style={textStyles.headerText}>Scott Weaver</Text>
            <Text>sweaver@messiah.edu</Text>
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
          <View style={styles.thumbnailContainerStyle}>
            <Image
              style={styles.thumbnailStyle}
              source={{ uri: "../components/img/male-circle-512.png" }}
            />
          </View>
        </View>

        <View>
          <Text style={{ paddingTop: 10 }}>Frey 333</Text>
          <Text>Computer and Information Science</Text>
          <Text>Department Chair</Text>
        </View>

        <InfoBlock info={this.state.interests} title="Interests" />

        <InfoBlock info={this.state.currentclasses} title="Current Classes" />

        <InfoBlock info={this.state.pastclasses} title="Previous Classes" />
      </ScrollView>
    )}
    {this.state.edit == true && (
      <ScrollView style={styles.containerStyle}>
        <View style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Input label={"name"} value={"Scott Weaver"} />
            <Input label={"email"} value={"sweaver@messiah.edu"} />
          </View>
          <View>
            <DisplayImage />
          </View>
        </View>

        <View>
          <Input label={'office'} value={"Frey 333"} />
          <Input label={'Department'} value={"Comuter and Information Science"} />
          <Input label={'Position'} value={"Department Chair"} />
        </View>

        <InfoBlock info={this.state.interests} title="Interests" />
        <Icon name="plus-circle" size={30} color="#253A66" />

        <InfoBlock info={this.state.currentclasses} title="Current Classes" />
        <Icon name="plus-circle" size={30} color="#253A66" />

        <InfoBlock info={this.state.pastclasses} title="Previous Classes" />
        <Icon name="plus-circle" size={30} color="#253A66" />
        <View style={{ marginBottom: 30 }}>
          <Button style={{ marginTop: 10 }} onPress={() => this.setState({ edit: false })}>
            <Text>Save Changes</Text>
          </Button>
          <Button style={{ marginTop: 10 }} onPress={() => firebase.auth().signOut()}>
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
