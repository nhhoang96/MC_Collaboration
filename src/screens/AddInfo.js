import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Header,
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from "../components/common";
import textStyles from "../components/styles/text";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import AddInput from "../components/AddInput";
import firebase from "firebase";

class AddInfo extends Component {
  state = { minor: "", concentration: "", interest: ""};
  onButtonPress() {
    const { minor, concentration, interest } = this.state;
    var db = firebase.database();
    var ref = db.ref();
    var userRef = ref.child('users');
    userRef.set({
      ep1247: {
        minor: this.state.minor,
        concentration: this.state.concentration,
        interest: this.state.interest
      }
    })
    // database.ref('users/hn1174').set({
    //   user
    // });
    //this.setState({ error: "", loading: true });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(this.onLoginSuccess.bind(this))
    //   .catch(() => {
    //     firebase
    //       .auth()
    //       .createUserWithEmailAndPassword(email, password)
    //       .then(this.onLoginSuccess.bind(this))
    //       .catch(this.onLoginFail.bind(this));
    //   });
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.infoContainerStyle}>
          <View style={styles.headerContentStyle}>
            <Text style={textStyles.headerText}>Welcome, Elizabeth!</Text>
            <Text>
              To get started, review your information and add additional
              information to help connect with others
            </Text>
          </View>
          <CardSection>
          <AddInput
            text="Minor(s)"
            placeholder="ex.: Math"
            value={this.state.minor}
            onChangeText={minor => this.setState({ minor })}
          />
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
          </CardSection>
          <CardSection>
          <AddInput
            text="Interest(s)"
            placeholder="ex.: iOS Development"
            value={this.state.interest}
            onChangeText={interest => this.setState({ interest })}
          />
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
          </CardSection>
          <CardSection>
            <AddInput text="Interest(s)" placeholder="ex.: iOS Development" />
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
          </CardSection>
        <CardSection>
        <Button onPress={this.onButtonPress.bind(this)} >Submit</Button>
        </CardSection>
        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('checkInfo')}>
          <Text style={textStyles.label}>Back</Text>
          <Icon name="arrow-circle-left" size={30} style={{ color: "#253A66" }}/>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('addClass')}>
            <Text style={textStyles.label}>Next</Text>
            <Icon name="arrow-circle-right" size={30} style={{ color: "#253A66" }}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  infoContainerStyle: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 20
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  footerContainer: {
    height: 20,
    flex: 1,
    flexDirection: "row"
  },
  next: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 10
  }
};

export default AddInfo;
