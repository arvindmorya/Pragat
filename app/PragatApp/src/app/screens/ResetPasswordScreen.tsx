import * as React from "react";

import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";

import authStyles from "../styles/authstyles";
import { NetworkApis } from "../utils/NetworkManager";

interface state {
  accessToken: string;
  password: string;
  isPasswordValidated: boolean;
  re_password: string;
  isRePasswordMatchedWithRePassword: boolean;
  passwordStrengthText: string;
  passwordStrengthTextColor: string;

  showError: boolean;
  errorMessgae: string;
}

interface props {
  navigation: any;
}

export default class ResetPasswordScreen extends React.Component<props, state> {
  static navigationOptions = {
    title: "Reset Password"
  };

  constructor(props: any) {
    super(props);
    this.state = {
      accessToken: "",
      password: "",
      isPasswordValidated: false,
      re_password: "",
      isRePasswordMatchedWithRePassword: false,
      passwordStrengthText: "",
      passwordStrengthTextColor: "",
      showError: false,
      errorMessgae: ""
    };
  }

  showError = (message: string) => {
    this.setState({ showError: true, errorMessgae: message });
  };

  validate = () => {
    if (!this.validateToken()) {
      this.showError("Invalid Token");
      return false;
    } else if (!this.isValidPassword()) {
      this.showError("Weak Password");
      return false;
    } else if (!this.validateRePassword()) {
      this.showError("Re-Password Not matched");
      return false;
    } else {
      this.setState({ showError: false });
      return true;
    }
  };

  isValidPassword = () => {
    let password = this.state.password;
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  validateRePassword = () => {
    let password = this.state.password;
    let re_password = this.state.re_password;
    if (password === re_password) {
      return true;
    } else {
      return false;
    }
  };

  validateToken = () => {
    if (this.state.accessToken) {
      let token = this.state.accessToken;
      let isValidToken = token.length === 6 && /^\d+$/.test(token);
      return isValidToken;
    }
  };

  resetPassword = () => {
    let isAllFieldValidated = this.validate();
    let request = {
      token: this.state.accessToken,
      password: this.state.password
    };
    NetworkApis.resetPassword(request).then((response: any) => {
      console.log("reset Password = "+response.status);
      if (response.status === 200) {
        this.props.navigation.navigate("login");
      } else if (response.status === 404) {
        this.showError("Invalid Token");
      } else {
        this.showError("Invalid Token");
      }
    });
  };
  render() {
    return (
      <View>
        <View style={styles.innerCotainer}>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Enter your 6-digit OTP"
            keyboardType="numeric"
            style={authStyles.textInput}
            onChangeText={text => this.setState({ accessToken: text })}
          />

          <View style={authStyles.lineH} />

          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Password (Min 8 chars)"
            secureTextEntry={true}
            style={authStyles.textInput}
            onChangeText={text => this.setState({ password: text })}
          />

          <View style={authStyles.lineH} />

          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Re-Type Password"
            style={authStyles.textInput}
            secureTextEntry={true}
            onChangeText={text => this.setState({ re_password: text })}
          />
        </View>
        <View style={{ height: 30, marginBottom: 20 }}>
          {this.state.showError && (
            <View style={styles.errorView}>
              <Image
                style={styles.errorImg}
                source={require("../../../res/images/ic_error.png")}
              />
              <Text style={styles.label}>{this.state.errorMessgae}</Text>
            </View>
          )}
        </View>

        <TouchableHighlight
          style={[styles.button, { margin: 30 }]}
          onPress={this.resetPassword}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerCotainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },

  placeHolderStyle: {
    color: "#111",
    opacity: 0.8
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26B363",
    borderRadius: 30
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "400"
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    marginLeft: 10
  },

  errorView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 5
  },

  errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  }
});
