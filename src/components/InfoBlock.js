import React, { Component } from "react";
import { View, Text } from "react-native";
import textStyles from "./styles/text";

class InfoBlock extends Component {
  render = () => {
    return (
      <View style={styles.container}>
        <Text style={textStyles.subHeaderText}>Interests</Text>
        <Text>
          Artificial Intelligence, Human Computer Interaction, Web Development,
          Mobile Development{" "}
        </Text>
      </View>
    );
  };
}

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 5
  }
};

export default InfoBlock;
