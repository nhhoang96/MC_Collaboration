import React from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";
const AddInput = ({ text, placeholder, value, onChangeText }) => {
  state = {
    number: "1",
    classes: ["First Year", "Sophomore", "Junior", "Senior"],
    //labels: labels
  };
  const { containerStyle, rowStyle, inputStyle, textStyle } = Styles;
  return (
    <View style={containerStyle}>
      <Text style={textStyles.label}>{text}</Text>
      <View style={rowStyle}>
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const Styles = {
  containerStyle: {
    paddingLeft: 10,
    height: 60,
    flex: 1,
    flexDirection: "column"
  },
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 15
  },
  inputStyle: {
    flex: 2
  }
};

export default AddInput;