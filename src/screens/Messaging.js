import React, { Component } from 'react';
import { View, Text, Image, TextInput, listView, TouchableHighlight, StyleSheet } from 'react-native';
import { Header } from "../components/common";
import UserBlock from "../components/UserBlock";

class Messaging extends Component {
  state = {
    users: [
      {
        "name": "Elizabeth Pinkham",
        "img" : "https://upload.wikimedia.org/wikipedia/commons/9/9b/Fashion-person-woman-girl-2_%2823957415829%29.jpg"
      },
      {
        "name": "Hoang Nguyen",
        "img" : "https://upload.wikimedia.org/wikipedia/commons/0/08/Omri_Levy_Picture.jpg"
      },
      {
        "name": "Mary Green",
        "img" : "https://commons.wikimedia.org/wiki/Category:Images#/media/File:Simisola_Omotoso_Silhouette_(Signature).png"
      },{
        "name": "John Doe",
        "img" : "https://commons.wikimedia.org/wiki/Category:Images#/media/File:Sean_Kandel_Photo.png"
      },

    ]
  }
  render(){
    return (
      <View>
        <Header headerText="Messages"/>
        {this.state.users.map(e => <UserBlock key={e.name} image={e.img} name={e.name} />)}
      </View>

    )
  }
}

export default Messaging;
