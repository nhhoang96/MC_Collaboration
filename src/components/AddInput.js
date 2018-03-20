import React from "react";
import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
const AddInput = ({ text, placeholder }) => {
  const { containerStyle, rowStyle, inputStyle, textStyle } = Styles;
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
      <View style={rowStyle}>
        <TextInput style={inputStyle} placeholder={placeholder} />
        <Icon name="plus-circle" size={30} color="#000000" />
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
    flex: 2,
    lineHeight: 20
  },
  textStyle: {
    fontSize: 18
  }
};

export default AddInput;
