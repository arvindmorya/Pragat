import * as React from "react";

import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Image
} from "react-native";

import Avatar from "../components/auth/signup/Avatar";
import BasicDetails from "../components/auth/signup/BasicDetails";
import SchoolDetails from "../components/auth/signup/SchoolDetails";
import AuthDetails from "../components/auth/signup/AuthDetails";
import ClusterDetails from "../components/auth/signup/ClusterDetails";

import { signUp, NetworkApis } from "../utils/NetworkManager";

interface state {
  name: string;
  nameValidated: boolean;
  role: string;
  phone_number: string;
  phoneValidated: boolean;
  email: string;
  emailValidated: boolean;
  schoolorClusterDetails: any;
  schoolorClusterDetailsValidated: boolean;
  udiseId: string;
  udiseIdValidated: boolean;
  password: string;
  passwordValidated: boolean;
  isAllDeailsFilled: boolean;
  signUpBtnColor: string;
  signUpBtnTextColor: string;
  signUpErrorMessage: string;
  isSignUpFailed: boolean;

  avatar: any;
}

interface props {
  navigation: any;
}

export default class SignUpScreen extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      nameValidated: false,
      role: "",
      phone_number: "",
      phoneValidated: false,
      email: "",
      emailValidated: false,
      schoolorClusterDetails: undefined,
      schoolorClusterDetailsValidated: false,
      udiseId: "",
      udiseIdValidated: false,
      password: "",
      passwordValidated: false,
      isAllDeailsFilled: false,
      signUpBtnColor: "#d9d9d9",
      signUpBtnTextColor: "",
      signUpErrorMessage: "",
      isSignUpFailed: false,
      avatar: undefined
    };
  }

  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state;
    var roleP = params ? params.role : "";
    var signupTitle = "Sign Up - ".concat(roleP);
    return {
      title: signupTitle,
      headerBackTitle: null
    };
  };

  setName = (nameFromChild: string, isValid: boolean) => {
    //alert(String(nameFromChild).concat(" : name"));
    this.setState({ name: nameFromChild, nameValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setPhoneNumber = (phoneNumber: string, isValid: boolean) => {
    this.setState({ phone_number: phoneNumber, phoneValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setEmailId = (emailId: string, isValid: boolean) => {
    //alert(String(emailId).concat(" : email"));
    this.setState({ email: emailId, emailValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setSchoolOrClusterDetails = (details: object, isValid: boolean) => {
    //  alert(JSON.stringify(details));
    this.setState(
      {
        schoolorClusterDetails: details,
        schoolorClusterDetailsValidated: isValid
      },
      () => this.validateIfAllDetailsFiled()
    );
  };

  setUdiseId = (udiseId: string, isValid: boolean) => {
    this.setState({ udiseId: udiseId, udiseIdValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setPassword = (password: string, isValid: boolean) => {
    this.setState({ password: password, passwordValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  // setAvatar = (userAvatar: any) => {
  //   this.setState({avatar: userAvatar})
  // };

  validateIfAllDetailsFiled = () => {
    let isNameValidated: boolean = this.state.nameValidated;
    let isPhoneValidated: boolean = this.state.phoneValidated;
    let isEmailValidated: boolean = this.state.emailValidated;
    let isSchoolorClusterValidated: boolean = this.state
      .schoolorClusterDetailsValidated;
    let isUdiseIdValidated: boolean = this.state.udiseIdValidated;
    let isPasswordValidated: boolean = this.state.passwordValidated;
    let valid: boolean =
      isNameValidated &&
      isPhoneValidated &&
      isEmailValidated &&
      isUdiseIdValidated &&
      isSchoolorClusterValidated &&
      isPasswordValidated;
    this.setState({
      isAllDeailsFilled: valid,
      signUpBtnColor: valid ? "#00cc66" : "#d9d9d9",
      signUpBtnTextColor: valid ? "#FAFAFA" : "#595959"
    });
  };

  // showAlert = (alertTitle: string, alertMessage: string) => {
  //   Alert.alert(
  //     alertTitle,
  //     alertMessage,
  //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
  //     { cancelable: false }
  //   );
  // };
  handleErrorMessage = (error: any) => {
    if (error) {
      if (error.message) {
        this.setState({ signUpErrorMessage: error.message });
      } else {
        this.setState({ signUpErrorMessage: "Invalid Details" });
      } 

      if(error.statusCode && error.statusCode === 701){
        this.handleMultipleError(error)
      }
    } else {
      this.setState({ signUpErrorMessage: "Invalid Details" });
    }
  };

  handleMultipleError = (error:any) => {
    if (error && error.details) {
      let details = error.details;
      if (details && details.messages) {
        let messages = details.messages;
        if (messages && messages.phone_number) {
          let msg = messages.phone_number;
          if (msg && msg[0]) {
            //this.setState({ signUpErrorMessage: msg[0] });
          }
        } else if (messages && messages.udise_id) {
          let msg = messages.udise_id;
          if (msg && msg[0]) {
            //this.setState({ signUpErrorMessage: msg[0] });
          }
        } else if (messages && messages.username) {
          let msg = messages.username;
          if (msg && msg[0]) {
            //this.setState({ signUpErrorMessage: msg[0] });
          }
        } else if (messages && messages.email) {
          let msg = messages.email;
          if (msg && msg[0]) {
            //this.setState({ signUpErrorMessage: msg[0] });
          }
        } else {
          //this.setState({ signUpErrorMessage: "Sign Up Failed" });
        }
      }
    }
  };

  onPressSignUp = () => {
    if (this.state.isAllDeailsFilled) {
      let signUpDetails: any = {
        name: this.state.name,
        role: this.props.navigation.state.params.role,
        email: this.state.email,
        phone_number: this.state.phone_number,
        udise_id: this.state.udiseId,
        password: this.state.password
      };

      for (var info in this.state.schoolorClusterDetails) {
        if (this.state.schoolorClusterDetails.hasOwnProperty(info)) {
          signUpDetails[info] = Number(this.state.schoolorClusterDetails[info]);
        }
      }
      signUp(signUpDetails).then(responseJson => {
        console.log("responseJson = " + JSON.stringify(responseJson));
        if (responseJson.error) {
          let errorObj = responseJson.error;
          console.log("errorObj = " + JSON.stringify(errorObj));
          if (errorObj) {
            this.setState({ isSignUpFailed: true });
            this.handleErrorMessage(errorObj);
          } else {
            this.setState({
              isSignUpFailed: true,
              signUpErrorMessage: "Sign Up Failed"
            });
          }
        } else {
          this.props.navigation.navigate("welcomeScreen");
        }
      });

      //this.uploadAvatar(this.state.avatar);
    } else {
      this.setState({ signUpErrorMessage: "Invalid Details" });
    }
  };

  uploadAvatar = (avatarObj: any) => {
    if (avatarObj && avatarObj.uri) {
      avatarObj.name = this.state.udiseId;
      NetworkApis.uploadAvatar(avatarObj)
        .then(responseJson => JSON.stringify(responseJson))
        .catch(error => console.log(error));
    }
  };

  setAvatar = (userAvatar: any) => {
    this.setState({ avatar: userAvatar });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Avatar setAvatar={this.setAvatar} />

          <BasicDetails
            setName={this.setName}
            setPhoneNumber={this.setPhoneNumber}
            setEmailId={this.setEmailId}
          />

          {this.props.navigation.state.params.role === "Teacher" && (
            <SchoolDetails
              style={{ marginTop: 60 }}
              setSchoolDetails={this.setSchoolOrClusterDetails}
            />
          )}

          {this.props.navigation.state.params.role === "Kendra Pramukh" && (
            <ClusterDetails
              style={{ marginTop: 60 }}
              setClusterDetails={this.setSchoolOrClusterDetails}
            />
          )}

          <AuthDetails
            setUdiseId={this.setUdiseId}
            setPassword={this.setPassword}
          />

          <View style={{ height: 40 }}>
            {this.state.isSignUpFailed && (
              <View style={styles.errorView}>
                <Image
                  style={styles.errorImg}
                  source={require("../../../res/images/ic_error.png")}
                />
                <Text style={styles.label}>
                  {this.state.signUpErrorMessage}
                </Text>
              </View>
            )}
          </View>

          <TouchableHighlight
            onPress={this.onPressSignUp}
            style={[
              styles.button,
              { margin: 30, backgroundColor: this.state.signUpBtnColor }
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: this.state.signUpBtnTextColor }
              ]}
            >
              Sign Up
            </Text>
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

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 30
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400"
  },
  errorView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    padding: 5
  },
  errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    marginLeft: 10
  }
});
