import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner, Header } from "./components/common";
import StudentProfile from "./screens/StudentProfile";
import { StackNavigator } from "react-navigation";
import formattingStyles from './components/styles/formatting';
import Icon from "react-native-vector-icons/dist/FontAwesome";

class LoginForm extends Component {
  state = { userID: "", password: "", error: "", loading: false, currentUser: [] };

  listenForCurrentUserValues(userRef) {
    userRef.on('value', (dataSnapshot) => {
      var currentUser =[];
      this.setState({
        currentUser: dataSnapshot.val()
      });

    });
  }

  onButtonPress() {
    const { userID, password } = this.state;

    this.setState({ error: "", loading: true });
    Alert.alert(this.state.userID, this.state.password)
    firebase
      .auth()
      .signInWithEmailAndPassword(userID, password)
      .then(this.onLoginSuccess.bind(this));
      //.catch((this.onLoginFail.bind(this)));
    }

  onLoginFail() {
    this.setState({ error: "Authentication Failed", loading: false });
    
  }

  onLoginSuccess() {
    userRef = firebase.database().ref('users/' + this.state.userID.split('@')[0]);
    this.listenForCurrentUserValues(userRef)
    this.props.navigation.setParams({ ID: this.state.userID.split('@')[0] });
    this.props.navigation.navigate('checkInfo', this.props.navigation.state.params);
    
    this.setState({
      userID: "",
      password: "",
      loading: false,
      error: ""
    });
    
    
    
    
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
);
  }

  render() {
    return (
     
      <Card>
        <CardSection style={{flex: 1}}>
          <Input
            placeholder="ab1234"
            label="User ID"
            value={this.state.userID}
            onChangeText={userID => this.setState({ userID })}
          />
        </CardSection>

        <CardSection style={{flex: 1}}>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
        {/* <CardSection>
              {this.state.majors}
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  this.state.majors.push(
                    <AddInput
                      text="Major(s)"
                      labels={["1", "2", "3"]}
                      key={this.state.majors.length}
                    />
                  );
                }}
              >
                <Icon name="plus-circle" size={30} color="#253A66" />
              </TouchableOpacity>
              </CardSection> */}

      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  headerStyle: {
    fontSize: 35,
    alignSelf: "center",
    color: "blue",

  }
};

export default LoginForm;
