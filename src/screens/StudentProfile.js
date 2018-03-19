import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";

const StudentProfile = () => {
  state = {
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
    <ScrollView style={styles.containerStyle}>
      <View style={styles.infoContainerStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={textStyles.headerText}>Elizabeth Pinkham</Text>
          <Text>ep1247@messiah.edu</Text>
        </View>
        <View style={styles.thumbnailContainerStyle}>
          <Image
            style={styles.thumbnailStyle}
            source={{ uri: "../components/img/male-circle-512.png" }}
          />
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
  );
};

const styles = {
  infoContainerStyle: {
    justifyContent: "flex-start",
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
    height: 60,
    width: 60,
    resizeMode: "contain",
    backgroundColor: "red"
  }
};

export default StudentProfile;
