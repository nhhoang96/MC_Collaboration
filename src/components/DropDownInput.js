import React, { Component} from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";


class DropDownInput extends Component {
  constructor(props) {
    super(props);
     //this.title = props.title;

     if (props.getValue) {
       props.getValue(this.returnValue.bind(this));
     }
  }
  //const { containerStyle, rowStyle, inputStyle, textStyle } = Styles;
  
  state = {
    title: this.props.title,
    options: this.props.options,
    value: "",
  };

 
  updateValue = (value) => {
    this.setState({ value: value })
 }

 returnValue() {
   return this.state.value;
 }

  render () {
    let pickerItems = this.state.options.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
  });
  return (
    <View style={Styles.containerStyle}>
      <Text style={textStyles.label}>{this.state.title}</Text>
      <View style={Styles.rowStyle}>
        <Picker
          style={Styles.inputStyle}
          selectedValue={this.state.value}
          onValueChange={this.updateValue}
        >
        {pickerItems}
        </Picker>
      </View>
    </View>
  );
  return this.state.value;
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

export default DropDownInput;
