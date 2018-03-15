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

import {signUp} from "../utils/NetworkManager"

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
      passwordValidated: false,

      isAllDeailsFilled: false,
      signUpBtnColor: "#d9d9d9",
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    var roleP = params ? params.role : "";
    var signupTitle = "SignUp - ".concat(roleP);
    return {
      title: signupTitle
    };
  };

  setName = (nameFromChild, isValid) => {
    //alert(String(nameFromChild).concat(" : name"));
    this.setState({ name: nameFromChild, nameValidated: isValid },
      () => this.validateIfAllDetailsFiled());
  };

  setPhoneNumber = (phoneNumber, isValid) => {
    this.setState({ phone_number: phoneNumber, phoneValidated: isValid },
      () => this.validateIfAllDetailsFiled());
  };

  setEmailId = (emailId, isValid) => {
    //alert(String(emailId).concat(" : email"));
    this.setState({ email: emailId, emailValidated: isValid },
      () => this.validateIfAllDetailsFiled());
  };

  setSchoolDetails = (schoolDetails) => {
    alert(schoolDetails);
    this.setState({ schoolDetails: schoolDetails },
      () => this.validateIfAllDetailsFiled());
  };

  setUdaisId = (udaisId, isValid) => {
    this.setState({ udaisId: udaisId, udaisIdValidated: isValid },
      () => this.validateIfAllDetailsFiled());
  };

  setPassword = (password, isValid) => {
    this.setState({ password: password, passwordValidated: isValid },
       () => this.validateIfAllDetailsFiled());
    ;
  };


  validateIfAllDetailsFiled = () => {
    isNameValidated = this.state.nameValidated;
    isPhoneValidated = this.state.phoneValidated;
    isEmailValidated = this.state.emailValidated;
    isUdaisIdValidated = this.state.udaisIdValidated;
    isPasswordValidated = this.state.passwordValidated;
    valid = isNameValidated && isPhoneValidated && isEmailValidated && isUdaisIdValidated && isPasswordValidated;
    this.setState({isAllDeailsFilled: valid, signUpBtnColor:valid?"#00cc66":"#d9d9d9"});
  }

  onPressSignUp = () => {
    if(this.state.isAllDeailsFilled){
        signUpDetails = {
          "name": this.state.name,
          "role": this.props.navigation.state.params.role,
          "email" : this.state.email,
          "phone_number" : this.state.phone_number,
          "school_id" : this.state.schoolDetails.school_id,
          "cluster_id" : this.state.schoolDetails.cluster_id,
          "kp_id" : this.state.schoolDetails.kp_id,
          "udise_id" : this.state.udaisId,
          "password" : this.state.password
        }
        signUp(signUpDetails)
        .then(responseJson => alert(JSON.stringify(responseJson)));
    } else {
      var str = "name ".concat(this.state.nameValidated) + 
      "\nphone ".concat(this.state.phoneValidated) + 
      "\nemail ".concat(this.state.emailValidated) +
      "\nschool ".concat(this.state.schoolDetailsValidated) +
      "\nudaise ".concat(this.state.udaisIdValidated) +
      "\npassword ".concat(this.state.passwordValidated);
      alert("Some details are not complete\n".concat(str));
    }
  }

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
            style={[styles.button, { marginTop: 30, backgroundColor: this.state.signUpBtnColor}]}
          >
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
    marginRight: 30
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
