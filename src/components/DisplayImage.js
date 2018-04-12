import { TouchableOpacity, Text, StyleSheet, Platform, View, PixelRatio, Image } from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

var options = {
  title: 'Select your profile picture',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class DisplayImage extends Component {

  constructor(){
    super();
    this.checkImage.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
      image_uri: null,
      loggedIn: true,
    }
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
      
}
    checkImage() {
      const imageRef = firebase.storage().ref('profile_images');
      imageRef.child("ep1247").getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.setState({image_uri: url});
        return (<Text>image_uri</Text>);
      
      });
    }
    // Prepare Blob support
  
    uploadImage(uri, mime= 'application/octet-stream') {
      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios'? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebase.storage().ref('profile_images').child('ep1247.png')
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then (() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    getImage(){

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          // let source = { uri: response.uri };
          // this.setState({image_uri: response.uri})
  
          // You can also display the image using data:
          // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.uploadImage(response.uri)
            .then(url => { alert('Your photo has been updated'); this.setState({image_uri: url}) })
            .catch(error => console.log(error))
  
        }
      });
  
  }

render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.getImage}>
          <View style={[styles.profile, styles.profileContainer, {marginBottom: 20, marginLeft: 10}]}>
          { this.state.image_uri === null ? <Text>Select Photo</Text> :
            <Image style={styles.profile} 
              source={{uri:this.state.image_uri}} 
            />
          }
          </View>
        </TouchableOpacity>
      </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    profileContainer: {
      borderColor: '#9B9B9B',
      justifyContent: 'center',
      alignItems: 'center'
    },
    profile: {
      borderRadius: 75,
      width: 150,
      height: 150
    }
  });

export default DisplayImage;