import * as React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Alert,
  AsyncStorage
} from "react-native";

import { NetworkApis } from "../../utils/NetworkManager";

interface props {
  onPressSignUp: any;
  onPressForgotPassword: any;
  onSuccessfullyLoggedIn: any;
}

interface state {
  identifier: string;
  isIdentifierValid: boolean;
  password: string;
  isPasswordValid: boolean;
  identifier_type: string;
  errorMsg: string;
  isLoginFailed: boolean;
}
export default class LoginForm extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      identifier: "",
      isIdentifierValid: true,

      password: "",
      isPasswordValid: true,

      isLoginFailed: false,
      errorMsg: "",
      identifier_type: "phone_number"
    };
  }

  onLoginBtnClicked = () => {
    this.setState({ isLoginFailed: false });
    let identifier = this.state.identifier;
    let type;
    if (!identifier) {
      this.setState({
        isIdentifierValid: false,
        errorMsg: "Invalid Email/Phone Number"
      });
      return;
    } else {
      type = this.findIdentifierType(identifier);
      if (type === "") {
        return;
      }
      this.setState({ isIdentifierValid: true });
    }

    let password = this.state.password;
    if (password === "") {
      this.setState({
        isPasswordValid: false,
        errorMsg: "Password is empty"
      });
      return;
    } else {
      this.setState({ isPasswordValid: true });
    }

    let loginDetails = { email: "", password: "" };
    loginDetails["email"] = identifier;
    loginDetails["password"] = password;

    this.loginUser(loginDetails);
  };

  showAlert = (alertTitle: string, alertMessage: string) => {
    Alert.alert(
      alertTitle,
      alertMessage,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  loginUser = async (loginDetails: any) => {
    NetworkApis.loginUser(loginDetails)
      .then(loginResponse => {
       // alert(JSON.stringify(loginResponse));
        try {
          if (loginResponse.accessToken) {
            // try {
            //   let promise = await AsyncStorage.setItem("auth-key", loginResponse.accessToken);

            // } catch (error) {

            // }
            this.props.onSuccessfullyLoggedIn();
          } else if (
            loginResponse.content &&
            loginResponse.content.statusCode === 401
          ) {
            this.showAlert("Login Failed", loginResponse.content.code);
          } else {
            this.showAlert(
              "Login Failed",
              "Failed to login, Please check username and password."
            );
          }
        } catch (error) {
          this.showAlert("Login Failed", "Failed to login".concat(error.message));
        }
      })
      .catch(error => {
        this.showAlert("Login Failed", "Failed to login");
      });
  };

  findIdentifierType = (identifier: string) => {
    if (this.checkIfIdentifierIsEmailId(identifier)) {
      this.setState({ identifier_type: "email" });
      return "email";
    } else if (this.checkIfIdentifierIsPhoneNumber(identifier)) {
      this.setState({ identifier_type: "phone_number" });
      return "phone_number";
    } else {
      this.setState({ identifier_type: "username" });
      return "username";
    }
  };
  checkIfIdentifierIsPhoneNumber = (identifier: string) => {
    let isValidPhoneNumber =
      identifier.length === 10 && /^\d+$/.test(identifier);
    return isValidPhoneNumber;
  };

  checkIfIdentifierIsEmailId = (identifier: string) => {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(identifier);
  };

  render() {
    return (
      <View style={styles.container}>
        {(!this.state.isIdentifierValid || !this.state.isPasswordValid) && (
          <View style={styles.errorView}>
            <Text style={[styles.label, { fontWeight: "900", color: "#fff" }]}>
              {this.state.errorMsg}
            </Text>
          </View>
        )}

        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="UDISE Id"
          autoCapitalize="none"
          onChangeText={text => this.setState({ identifier: text })}
          style={styles.textInput}
        />

        <TextInput
          underlineColorAndroid={"transparent"}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={text => this.setState({ password: text })}
          style={[styles.textInput, { marginTop: 20 }]}
        />

        <TouchableHighlight
          style={[styles.button, styles.clickButton, { marginTop: 30 }]}
          onPress={this.onLoginBtnClicked}
        >
          <Text style={styles.buttonText}> Login </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.props.onPressForgotPassword}
        >
          <Text style={styles.buttonText}> Forgot Password? </Text>
        </TouchableHighlight>

        <Text style={styles.label}>Or</Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.props.onPressSignUp}
        >
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
  },
  placeHolderStyle: {
    color: "#111",
    opacity: 0.8
  },

  textInput: {
    backgroundColor: "#f5f5f5",
    opacity: 0.8,
    ...Platform.select({
      ios: {
        height: 40
      }
    }),
    paddingLeft: 15,
    borderRadius: 30
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  clickButton: {
    backgroundColor: "#00cc66",
    borderRadius: 30
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "600"
  },

  label: {
    color: "#FAFAFA",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center"
  },

  errorView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ff4444",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    backgroundColor: "#111",
    opacity: 0.6
  }
});
