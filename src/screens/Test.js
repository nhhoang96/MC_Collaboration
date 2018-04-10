import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Input, CardSection } from "../components/common";
import AddInput from "../components/AddInput";

class Test extends Component {
    constructor (props){
        super(props);
    }

    render () {
        return (
        <View>
            <AddInput title={["Crazy","Terrible","Horrible"]}/>
        </View>
        )}
}
export default Test;