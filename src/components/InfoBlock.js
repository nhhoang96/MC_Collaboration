import React, { Component } from "react";
import { View, Text } from "react-native";
import textStyles from "./styles/text";

const InfoBlock = ({ info, title }) => {
  return (
    <View style={styles.container}>
      <Text style={textStyles.subHeaderText}>{title}</Text>
      <Text>{info}</Text>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 5
  }
};

export default InfoBlock;
