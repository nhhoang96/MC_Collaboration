import React, { Component } from "react";
import { View, Text, Image } from "react-native";

const UserBlock = ({ image, name }) => {
  return(
    <View style={{ height: 70, borderBottomColor: "#ddd", borderBottomWidth: 1.0 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" source={{ uri: image }} style={styles.image}/>
        </View>
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    padding: 10,
    marginTop: 5,
    marginBottom: 5
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 5
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  text: {
    paddingLeft: 10,
    paddingTop: 5
  },
  name: {
    fontSize: 18
  }
}

export default UserBlock;
