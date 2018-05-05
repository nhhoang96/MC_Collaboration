import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  PixelRatio,
  Modal,
  Alert,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ListView
} from 'react-native';
import { Button } from "../components/common";
import moment from 'moment';

const ChatView = Platform.select({
  ios: () => KeyboardAvoidingView,
  android: () => View,
})();

import SendBird from 'sendbird';
import firebase from 'firebase';

var sb = null;

class Chat extends Component {
  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      channel: props.navigation.state.params.channel,
      name: props.navigation.state.params.name,
      dataSource: ds.cloneWithRows([]),
      messageQuery: props.navigation.state.params.channel.createPreviousMessageListQuery(),
      messages: [],
      text: '',
      disabled: true,
      show: false,
      lastMessage: null,
      hasRendered: false,
      image_uri: null
    };
    // this._onBackPress = this._onBackPress.bind(this);
    this._onSend = this._onSend.bind(this);
    // this._onPhoto = this._onPhoto.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    // this._onPressParticipants = this._onPressParticipants.bind(this);
    // this._onPressBlockList = this._onPressBlockList.bind(this);
  }

  componentWillUnmount() {
    sb.removeChannelHandler('ChatView');
    sb.removeConnectionHandler('ChatView');
  }

  componentDidMount() {
    var _SELF = this;
    this.preloadImage();
    if (!_SELF.state.hasRendered){
      _SELF.state.hasRendered = true;
      _SELF._getChannelMessage(false);
      if (_SELF.state.channel.channelType == 'group') {
          _SELF.state.channel.markAsRead();
      }

      // channel handler
      var ChannelHandler = new sb.ChannelHandler();
      ChannelHandler.onMessageReceived = function(channel, message){
        if (channel.url == _SELF.state.channel.url) {
          var _messages = [];
          _messages.push(message);
          var _newMessageList = _messages.concat(_SELF.state.messages);
          _SELF.setState({
            messages: _newMessageList,
            dataSource: _SELF.state.dataSource.cloneWithRows(_newMessageList)
          });
          _SELF.state.lastMessage = message;
          if (_SELF.state.channel.channelType == 'group') {
            _SELF.state.channel.markAsRead();
          }
        }
      };

      sb.addChannelHandler('ChatView', ChannelHandler);

      var ConnectionHandler = new sb.ConnectionHandler();
      ConnectionHandler.onReconnectSucceeded = function(){
        _SELF._getChannelMessage(true);
        _SELF.state.channel.refresh();
      }
      sb.addConnectionHandler('ChatView', ConnectionHandler);
    }
  }

  _getChannelMessage(refresh) {
   var _SELF = this;

   if(refresh){
     _SELF.state.messageQuery = _SELF.props.route.channel.createPreviousMessageListQuery();
     _SELF.state.messages = [];
   }

   if (!this.state.messageQuery.hasMore) {
     return;
   }
   this.state.messageQuery.load(20, false, function(response, error){
     if (error) {
       console.log('Get Message List Fail.', error);
       return;
     }

     var _messages = [];
     for (var i = 0 ; i < response.length ; i++) {
       var _curr = response[i];
       if (i > 0) {
         var _prev = response[i-1];
         if (_curr.createdAt - _prev.createdAt > (1000 * 60 * 60)) {
           if (i > 1 && !_messages[i-2].hasOwnProperty('isDate')) {
             _messages.splice((i-1), 0, {isDate: true, createdAt: _prev.createdAt});
           }
         }
       }
       _messages.push(_curr);
       _SELF.state.lastMessage = _curr;
     }

     var _newMessageList = _SELF.state.messages.concat(_messages.reverse());
     _SELF.setState({
       messages: _newMessageList,
       dataSource: _SELF.state.dataSource.cloneWithRows(_newMessageList)
     });
   });
 }

 _onSend() {
  var _SELF = this;
  if (!_SELF.state.text){
    return;
  }
  _SELF.state.channel.sendUserMessage(_SELF.state.text, '', function(message, error) {
    if (error) {
      console.log(error);
      return;
    }

    var _messages = [];
    _messages.push(message);
    if (_SELF.state.lastMessage && message.createdAt - _SELF.state.lastMessage.createdAt  > (1000 * 60 * 60)) {
      _messages.push({isDate: true, createdAt: message.createdAt});
    }

    var _newMessageList = _messages.concat(_SELF.state.messages);
    _SELF.setState({
      messages: _newMessageList,
      dataSource: _SELF.state.dataSource.cloneWithRows(_newMessageList)
    });
    _SELF.state.lastMessage = message;
    _SELF.setState({text: '', disabled: true});
  });
}

_onChangeText(text) {
  this.setState({
    text: text,
    disabled: (text.trim().length > 0) ? false : true
  })
}
preloadImage () {
  firebase.storage().ref('profile_images/' + this.props.navigation.state.params.id+ '.png').getDownloadURL().then((url) => {
    this.setState({image_uri: url});
  })
}

render() {
  return (
    <ChatView behavior="padding" style={styles.container}>
        <View style={[styles.chatContainer, {transform: [{ scaleY: -1 }]}]}>
          <ListView
            enableEmptySections={true}
            onEndReached={() => this._getChannelMessage(false)}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              if (rowData.hasOwnProperty('isDate')) {
                return (
                  <View style={[styles.listItem, {transform: [{ scaleY: -1 }]}, {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={styles.dateText}>{moment(rowData.createdAt).calendar()}</Text>
                  </View>
                )
              } else if (rowData.messageType == 'user') {
                return (
                    <TouchableHighlight underlayColor='#f7f8fc' onPress={() => this._onUserPress(rowData.sender)}>
                      <View style={[styles.listItem, {transform: [{ scaleY: -1 }]}]}>
                        <View style={styles.listIcon}>
                          <Image style={styles.senderIcon} key={rowData.sender.url} source={{uri: this.state.image_uri}} />
                        </View>
                        <View style={styles.senderContainer}>
                          <Text style={[styles.senderText, {color: '#3e3e55'}]}>{rowData.sender.nickname}</Text>
                          <Text style={[styles.senderText, {color: '#343434', fontWeight: 'bold'}]}>{rowData.message}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  )
                } else if (rowData.messageType == 'file') {
                  return (
                    <TouchableHighlight underlayColor='#f7f8fc' onPress={() => this._onUserPress(rowData.sender)}>
                      <View style={[styles.listItem, {transform: [{ scaleY: -1 }]}]}>
                        <View style={styles.listIcon}>
                          <Image style={styles.senderIcon} key={rowData.sender.url} source={{uri: this.state.image_uri}} />
                        </View>
                        <View style={styles.senderContainer}>
                          <Text style={[styles.senderText, {color: '#3e3e55'}]}>{rowData.sender.nickname}</Text>
                          <Image style={{width: 100, height: 70}} key={rowData.url} source={{uri: this.state.image_uri}} />
                        </View>
                      </View>
                    </TouchableHighlight>
                  )
                } else if (rowData.messageType == 'admin') {
                  return (
                      <View style={[styles.adListItem, {transform: [{ scaleY: -1 }]}, {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>
                        <View style={styles.senderContainer}>
                          <Text style={[styles.senderText, {color: '#343434', fontWeight: 'bold'}]}>{rowData.message}</Text>
                        </View>
                      </View>
                      )
                } else {
                  return null
                }
              }
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'Please type mesasge...'}
            ref='textInput'
            onChangeText={this._onChangeText}
            value={this.state.text}
            autoFocus={false}
            blurOnSubmit={false}
          />
          <Button
            onPress={this._onSend}
          >Send</Button>
        </View>
      </ChatView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  chatContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f7f8fc'
  },
  inputContainer: {
    height: 44,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#b2b2b2',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    backgroundColor: '#FFF',
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 15,
  },
  photoButton: {
    marginTop: 11,
    marginRight: 10,
  },
  sendButton: {
    marginTop: 11,
    marginLeft: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f7f8fc',
    padding: 5,
  },

  adListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e6e9f0',
    padding: 5,
    margin: 5,
  },

  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  senderIcon: {
    width: 30,
    height: 30
  },
  senderContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  senderText: {
    fontSize: 12,
    color: '#ababab'
  },
  dateText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ababab',
    fontWeight: 'bold'
  }
});

export default Chat;
