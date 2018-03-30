import * as React from "react";

import { View, TextInput, Text, StyleSheet, Platform } from "react-native";

import authStyles from "../../../styles/authstyles";

interface props {
  setUdiseId: Function;
  setPassword: Function;
}

interface state {
  udiseId: string;
  password: string;
  isPasswordValidated: boolean;
  re_password: string;
  isRePasswordMatchedWithRePassword: boolean;
  passwordText: string;
  passwordTextColor: string;
}
export default class AuthDetails extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      udiseId: "",
      password: "",
      isPasswordValidated: false,
      re_password: "",
      isRePasswordMatchedWithRePassword: false,

      passwordText: "* Password should be of minimum eight characters ",
      passwordTextColor: "#333333"
    };
  }

  validateAndUpdateUdiseId = () => {
    if (this.state.udiseId) {
      this.props.setUdiseId(this.state.udiseId, true);
    } else {
      this.props.setUdiseId(this.state.udiseId, false);
    }
  };

  validateAndUpdatePassword = () => {
    let password = this.state.password;
    if (this.validatePassword(password)) {
      this.setState({
        passwordText: "Strong password",
        passwordTextColor: "#33AA33"
      });
      this.setState({ password: password, isPasswordValidated: true });
    } else {
      this.setState({
        passwordText: "weak password",
        passwordTextColor: "#AA3333"
      });
      this.setState({ password: password, isPasswordValidated: false });
    }
  };

  validateRePassword = () => {
    let password = this.state.password;
    let re_password = this.state.re_password;
    let isPasswordValidated = this.state.isPasswordValidated;
    if (isPasswordValidated && password === re_password) {
      this.setState({ isRePasswordMatchedWithRePassword: true });
      this.props.setPassword(re_password, true);
    } else {
      this.setState({ isRePasswordMatchedWithRePassword: false });
      this.props.setPassword(re_password, false);
    }
  };

  validatePassword = (password: string) => {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder="My UDISE ID"
            underlineColorAndroid={"transparent"}
            style={authStyles.textInput}
            onChangeText={text => this.setState({ udiseId: text })}
            onBlur={() => {
              this.validateAndUpdateUdiseId();
            }}
          />
          <View style={authStyles.lineH} />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Password"
            secureTextEntry={true}
            style={authStyles.textInput}
            onChangeText={text => this.setState({ password: text })}
            onBlur={() => {
              this.validateAndUpdatePassword();
            }}
          />
          
          <View style={authStyles.lineH} />

          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Re-Type Password"
            style={authStyles.textInput}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ re_password: text }, () =>
                this.validateRePassword()
              );
            }}
          />
        </View>

        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            color: this.state.passwordTextColor
          }}
        >
          {this.state.passwordText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
});
