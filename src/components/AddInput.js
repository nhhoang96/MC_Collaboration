import React, { Component } from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";


class AddInput extends Component {
  constructor(props) {
    super(props);
    text = this.props.text;
    label = this.props.label;
    placeholder = this.props.placeholder;
    value = this.props.value;
    onChangeText = this.props.onChangeText;
  }
  //const { containerStyle, rowStyle, inputStyle, textStyle } = Styles;

  state = {
    number: "1",
    classes: ["First Year", "Sophomore", "Junior", "Senior"],
  };


  updateValue = (value) => {
    this.setState({ value: value })
 }
 
  render () {
  return (
    <View style={Styles.containerStyle}>
      <Text style={textStyles.label}>{text}</Text>
      <View style={Styles.rowStyle}>
        <TextInput
          style={Styles.inputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
}

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
