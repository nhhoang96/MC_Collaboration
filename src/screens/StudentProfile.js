import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import InfoBlock from "../components/InfoBlock";
import textStyles from "../components/styles/text";
import DisplayImage from "../components/DisplayImage"

const StudentProfile = () => {
  
  return (
    <ScrollView style={styles.containerStyle}>
      <View style={styles.infoContainerStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={textStyles.headerText}>Elizabeth Pinkham</Text>
          <Text>ep1247@messiah.edu</Text>
        </View>
          {/* <Image
            style={styles.thumbnailStyle}
            source={{ uri: "../components/img/male-circle-512.png" }}
          />  */}
        <DisplayImage />
      </View>

      <View>
        <Text style={{ paddingTop: 10 }}>Senior</Text>
        <Text>Computer and Information Science</Text>
        <Text>Concentration: Software Development</Text>
        <Text>Minor: Business Administration</Text>
      </View>

      <InfoBlock title={"Interests"} />

      <InfoBlock title={"CurrentClasses"} />

      <InfoBlock title={"PastClasses"} />
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 10
  },
  thumbnailStyle: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    backgroundColor: "red"
  },
};

export default StudentProfile;
