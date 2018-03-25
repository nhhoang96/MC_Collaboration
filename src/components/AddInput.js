import React from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";
const AddInput = ({ text, placeholder, value, onChangeText }) => {
  state = {
    number: "1",
    classes: ["First Year", "Sophomore", "Junior", "Senoir"],
    labels: labels
  };
  const { containerStyle, rowStyle, inputStyle, textStyle } = Styles;
  return (
    <View style={containerStyle}>
      <Text style={textStyles.label}>{text}</Text>
      <View style={rowStyle}>
        <Picker
          style={inputStyle}
          selectedValue={this.state.number}
          onValueChange={itemValue => {
            this.setState({ number: itemValue });
          }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
        </Picker>
        <TextInput 
          style={inputStyle} 
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText} 
        />
        <Icon name="address-book" style={{ fontSize: 25, color: "green" }} />
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
