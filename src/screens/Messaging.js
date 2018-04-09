import React, { Component } from 'react';
import { View, Text, Image, TextInput, listView, TouchableHighlight, StyleSheet } from 'react-native';
import { Header } from "../components/common";
import UserBlock from "../components/UserBlock";

class Messaging extends Component {
  state = {
    users: [
      {
        "name": "Elizabeth Pinkham",
        "img" : "../img/male-circle-512.png"
      },
      {
        "name": "Hoang Nguyen",
        "img" : "../img/male-circle-512.png"
      },
      {
        "name": "Kelly Hopkins",
        "img" : "../img/male-circle-512.png"
      },{
        "name": "David Park",
        "img" : "../img/male-circle-512.png"
      },

    ]
  }
  render(){
    return (
      <View>
        <Header headerText="Messages"/>
        {this.state.users.map((e, i) => <UserBlock key={i} image={e.img} name={e.name} />)}
      </View>

    )
  }
}

export default Messaging;
