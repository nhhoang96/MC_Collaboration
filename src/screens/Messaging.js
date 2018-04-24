import React, { Component } from 'react';
import { View, Text, Image, TextInput, listView, TouchableHighlight, ListView, StyleSheet, Alert } from 'react-native';
import { Header } from "../components/common";
import UserBlock from "../components/UserBlock";

import SendBird from 'sendbird';

var sb = null;

class Messaging extends Component {
  constructor(props) {
    super(props);
    sb = SendBird.getInstance();
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userId: 'ep1247',
      username: 'Elizabeth Pinkham',
      channelList: [],
      dataSource: ds.cloneWithRows([]),
      listQuery: sb.GroupChannel.createMyGroupChannelListQuery()
    };
    this.state.listQuery.includeEmpty = true;
    this._getChannelList = this._getChannelList.bind(this);
    // this._onHideChannel = this._onHideChannel.bind(this);
    this._refresh = this._refresh.bind(this);
    this._channelUpdate = this._channelUpdate.bind(this);
    this._refreshChannelList = this._refreshChannelList.bind(this);
  }

  componentDidMount() {
    this._getChannelList();

    var _SELF = this;
    var ChannelHandler = new sb.ChannelHandler();
    ChannelHandler.onUserJoined = function(channel, user) {
      _SELF._channelUpdate(channel);
    };
    ChannelHandler.onUserLeft = function(channel, user) {
      _SELF._channelUpdate(channel);
    };
    ChannelHandler.onChannelChanged = function(channel) {
      _SELF._channelUpdate(channel);
    };
    sb.addChannelHandler('ChannelHandlerInList', ChannelHandler);

    var ConnectionHandler = new sb.ConnectionHandler();
    ConnectionHandler.onReconnectSucceeded = function(){
      _SELF._refreshChannelList();
    }
    sb.addConnectionHandler('ConnectionHandlerInList', ConnectionHandler);
};

componentWillUnmount() {
  sb.removeChannelHandler('ChannelHandlerInList');
  sb.removeChannelHandler('ConnectionHandlerInList');
};

_channelUpdate(channel) {
  if(!channel) return;

  var _SELF = this;
  var _exist = false;
  var _list = _SELF.state.channelList.filter(function(ch) {
    return channel.url != ch.url
  });

  _list.unshift(channel);

  _SELF.setState({
    channelList: _list,
    dataSource: ds.cloneWithRows(_list)
  });
}

_refresh(channel) {
 this._channelUpdate(channel);
}

_channelTitle(members) {
  var _members = [];
  members.forEach(function(user) {
    if (user.userId != sb.currentUser.userId) {
      _members.push(user);
  }
  });
  var _title = members.map(function(elem){
    if (elem.userId != sb.currentUser.userId) {
      return elem.nickname;
    }
  }).join(" ");
  _title = _title.replace(",,", "");
  return (_title.length > 15) ? _title.substring(0,11) + '...' : _title;
}

_refreshChannelList() {
  var _SELF = this;
  var listQuery = sb.GroupChannel.createMyGroupChannelListQuery();
  listQuery.next(function(channelList, error){
    if (error) {
      console.log(error);
      return;
    }
    _SELF.setState({ listQuery: listQuery, channelList: channelList, dataSource: ds.cloneWithRows(channelList)});
  });
}

  _getChannelList() {
    var _SELF = this;
    _SELF.state.listQuery.next(function(channelList, error){
      if (error) {
        console.log(error);
        return;
      }
      var newList = _SELF.state.channelList.concat(channelList);
      _SELF.setState({ channelList: newList, dataSource: ds.cloneWithRows(newList)});
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText="Messages"/>
        <View style={styles.listContainer}>
          <ListView
            removeClippedSubviews={false}
            enableEmptySections={true}
            onEndReached={() => this._getChannelList()}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableHighlight>
                <View style={styles.listItem}>
                  <View style={styles.listIcon}>
                    <Image key={rowData.coverUrl} source={{uri: rowData.coverUrl.replace('http://', 'https://')}} />
                  </View>
                  <View style={styles.listInfo}>
                    <Text>{this._channelTitle(rowData.members)}</Text>
                    <Text>{rowData.lastMessage ? ( rowData.lastMessage.message && rowData.lastMessage.message.length > 15 ? rowData.lastMessage.message.substring(0, 11) + '...' : rowData.lastMessage.message ) : '' }</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginRight: 4}}>
                      <Text style={{color: '#861729'}}>{rowData.unreadMessageCount}</Text>
                    </View>
                     <View style={{flex: 1, alignItems: 'flex-end'}}>
                       <Text style={styles.descText}>{rowData.memberCount} members</Text>
                       <Text style={styles.descText}>{(!rowData.lastMessage || rowData.lastMessage.createdAt == 0) ? '-' : moment(rowData.lastMessage.createdAt).format('MM/DD HH:mm')}</Text>
                     </View>
                  </View>
                </View>
              </TouchableHighlight>
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  listContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#abb8c4',
  },
  descText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ababab'
  }
});

export default Messaging;
