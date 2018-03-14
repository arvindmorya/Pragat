import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import ProfilePic from "../components/auth/signup/ProfilePic";
import BasicDetails from "../components/auth/signup/BasicDetails";
import SchoolDetails from "../components/auth/signup/SchoolDetails";
import AuthDetails from "../components/auth/signup/AuthDetails";

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameValidated: false,
      role: "",
      phone_number: "",
      phoneValidated: false,
      email: "",
      emailValidated: false,
      schoolDetails: { clusterId: "", schoolId: "", kpId: "" },
      schoolDetailsValidated: false,
      udaisId: "",
      udaisIdValidated: false,
      password: "",
      passwordValidated: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    var signup = "SignUp";
    return {
      title: signup.concat(" - ", params ? params.type : "")
    };
  };

  setName = (nameFromChild, isValid) => {
    //alert(String(nameFromChild).concat(" : name"));
    this.setState({ name: nameFromChild, nameValidated: isValid });
  };

  setPhoneNumber = (phoneNumber, isValid) => {
    this.setState({ phone_number: phoneNumber, phoneValidated: isValid });
  };

  setEmailId = (emailId, isValid) => {
    //alert(String(emailId).concat(" : email"));
    this.setState({ email: emailId, emailValidated: isValid });
  };

  setSchoolDetails = schoolDetails => {
    this.setState({ schoolDetails: schoolDetails });
  };

  setUdaisId = (udaisId, isValid) => {
    this.setState({ udaisId: udaisId, udaisIdValidated: true });
  };

  setPassword = (password, isValid) => {
    this.setState({ password: password, passwordValidated: true });
  };

  onPressSignUp;
  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.insideContainer}>
        <ProfilePic />
        <BasicDetails
          setName={this.setName}
          setPhoneNumber={this.setPhoneNumber}
          setEmailId={this.setEmailId}
        />

        <SchoolDetails
          style={{ marginTop: 30 }}
          setSchoolDetails={this.setSchoolDetails}
        />

        <AuthDetails
          style={{ marginTop: 30 }}
          setUdaisId={this.setUdaisId}
          setPassword={this.setPassword}
        />

        <TouchableHighlight
          onPress={this.onPressSignUp}
          style={[styles.button, { marginTop: 30 }]} >
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6"
  },

  insideContainer: {
    marginLeft: 30,
    marginRight: 30,
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 30
  },
  buttonText: {
    color: "#595959",
    fontSize: 20,
    fontWeight: "600"
  }
});
