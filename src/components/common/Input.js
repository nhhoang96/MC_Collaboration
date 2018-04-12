import React from "react";
import { TextInput, View, Text } from "react-native";
import textStyles from "../styles/text";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyles.label}>{label}</Text>
      <TextInput
        // Default true
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autocorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    alignSelf: "stretch"
    // Allocate proportions (Take 2/3 of available space
    // for input, 1/3 for label)
    //flex: 2
  },
  labelStyle: {
    fontSize: 18
    //flex: 1
  },
  containerStyle: {
    height: 80,
    flex: 1,
    // Appear on the same row
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 10
  }
};
// Export instantly
export { Input };
