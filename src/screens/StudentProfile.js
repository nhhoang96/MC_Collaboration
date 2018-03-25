import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Input, CardSection } from "../components/common";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import AddInput from "../components/AddInput";
import DisplayImage from "../components/DisplayImage"

const StudentProfile = () => {
  state = {
    self: 0,
    edit: true,
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

  return (
    <View>
      {state.edit == false && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
              <Text style={textStyles.headerText}>Elizabeth Pinkham</Text>
              <Text>ep1247@messiah.edu</Text>
              {state.self == 0 && (
                <TouchableOpacity style={styles.sendMessage}>
                  <Text style={styles.sendMessageText}>Send Message</Text>
                </TouchableOpacity>
              )}
              {state.self == 1 && (
                <View
                  style={{
                    paddingTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity>
                    <Icon name="edit" size={30} color="#2D9AE8" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="cog" size={30} color="#2D9AE8" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.thumbnailContainerStyle}>
        <DisplayImage />
            </View>
          </View>

          <View>
            <Text style={{ paddingTop: 10 }}>Senior</Text>
            <Text>Computer and Information Science</Text>
            <Text>Concentration: Software Development</Text>
            <Text>Minor: Business Administration</Text>
          </View>

          <InfoBlock info={state.interests} title="Interests" />

          <InfoBlock info={state.currentclasses} title="Current Classes" />

          <InfoBlock info={state.prevclasses} title="Previous Classes" />
        </ScrollView>
      )}

      {state.edit == true && (
        <ScrollView style={styles.containerStyle}>
          <View style={styles.infoContainerStyle}>
            <View style={styles.headerContentStyle}>
              <Input label={"name"} value={"Elizabeth Pinkham"} />
              <Input label={"email"} value={"ep1247@messiah.edu"} />
            </View>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={{ uri: "../components/img/male-circle-512.png" }}
              />
            </View>
          </View>

          <View>
            <AddInput text="Class" />
            <CardSection>
              <AddInput text="Major(s)" labels={["1", "2", "3"]} key={0} />
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
                labels={["1", "2", "3"]}
                key={0}
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
              <AddInput text="Minor(s)" labels={["1", "2", "3"]} key={0} />
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

          <InfoBlock info={state.interests} title="Interests" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={state.currentclasses} title="Current Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />

          <InfoBlock info={state.prevclasses} title="Previous Classes" />
          <Icon name="plus-circle" size={30} color="#253A66" />
          <View style={{ marginBottom: 30 }}>
            <Button style={{ marginTop: 10 }}>
              <Text>Save Changes</Text>
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
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
