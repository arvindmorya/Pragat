import * as React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Alert,
  Image,
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
    let type:string;
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

    let loginDetails:any = { password: "" };
    loginDetails[type] = identifier;
    loginDetails["password"] = password;

    this.loginUser(loginDetails);
  };

  loginUser = async (loginDetails: any) => {
    NetworkApis.loginUser(loginDetails)
      .then(async loginResponse => {
        console.log("login response: "+JSON.stringify(loginResponse))
        try {
          if (loginResponse.accessToken) {
            // try {
            //   

            // } catch (error) {

            // }
            await AsyncStorage.setItem("auth-key", loginResponse.accessToken);
            this.props.onSuccessfullyLoggedIn();
          } else if (
            loginResponse.content &&
            loginResponse.content.statusCode === 401
          ) {
            this.setState({ isLoginFailed: true, errorMsg: "Login Failed" });
          } else {
            this.setState({ isLoginFailed: true, errorMsg: "Login Failed" });
          }
        } catch (error) {
          this.setState({ isLoginFailed: true, errorMsg: "Login Failed" });
        }
      })
      .catch(error => {
        this.setState({ isLoginFailed: true, errorMsg: "Login Failed" });
      });
  };

  findIdentifierType = (identifier: string):string => {
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
        {(!this.state.isIdentifierValid ||
          !this.state.isPasswordValid ||
          this.state.isLoginFailed) && (
          <View style={styles.errorView}>
            <Image
              style={styles.errorImg}
              source={require("../../../../res/images/ic_error.png")}
            />
            <Text
              style={[
                styles.label,
                { fontWeight: "600", color: "white", marginLeft: 10 }
              ]}
            >
              {this.state.errorMsg}
            </Text>
          </View>
        )}

        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Email Id or Phone Number"
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

        <TouchableHighlight style={styles.button}>
          <View style={{ flexDirection: "row",
          justifyContent:'center', alignContent: 'center', }}>
            <View style={styles.line} />
            <Text style={{marginLeft:30,marginRight:30, color:"white"}}>or</Text>
            <View style={styles.line} />
          </View>
        </TouchableHighlight>

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
    fontWeight: "400"
  },

  label: {
    color: "#FAFAFA",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center"
  },

  errorView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    padding: 5,
    backgroundColor: "#111",
    opacity: 0.6
  },
  errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  },
  line: {
    width: 50,
    height: 1,
    backgroundColor: "#FAFAFA"
  }
});
