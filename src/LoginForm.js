import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner, Header } from "./components/common";
import StudentProfile from "./screens/StudentProfile";

class LoginForm extends Component {
  state = { userID: "", password: "", error: "", loading: false };

  onButtonPress() {
    const { userID, password } = this.state;

    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(userID, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(userID, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
       });
    }

  onLoginFail() {
    this.setState({ error: "Authentication Failed", loading: false });
  }

  onLoginSuccess() {
    this.setState({
      userID: "",
      password: "",
      loading: false,
      error: ""
    });
  }


  renderButton() {
    // if (this.state.loading) {
    //   return <Spinner size="small" />;
    // }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="ab1234"
            label="User ID"
            value={this.state.userID}
            onChangeText={userID => this.setState({ userID })}
          />
        </CardSection>

        <CardSection>
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
      </Card>
    );
  }
}

const styles = {
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
