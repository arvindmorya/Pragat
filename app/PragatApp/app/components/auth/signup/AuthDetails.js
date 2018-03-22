import React, { Component } from "react";

import { View, TextInput, Text, StyleSheet, Platform } from "react-native";

import authStyles from "../../../styles/authstyles";

export default class AuthDetails extends Component {
  constructor() {
    super();
    this.state = {
      udaisId: "",
      password: "",
      isPasswordValidated: false,
      re_password: "",
      isRePasswordMatchedWithRePassword: false,

      passwordText: "* Password should be of minimum eight characters ",
      passwordTextColor: "#333333"
    };
  }

  validateAndUpdateUdaisId = () => {
    if (this.state.udaisId) {
      this.props.setUdaisId(this.state.udaisId, true);
    } else {
      this.props.setUdaisId(this.state.udaisId, false);
    }
  };

  validateAndUpdatePassword = () => {
    let password = this.state.password;
    if (this.validatePassword(password)) {
      this.setState({ passwordText: "Strong password" , passwordTextColor:"#33AA33"});
      this.setState({ password: password, isPasswordValidated: true });
    } else {
      this.setState({ passwordText: "weak password", passwordTextColor:"#AA3333"});
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

  validatePassword = password => {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="My UDISE ID"
          style={authStyles.textInput}
          onChangeText={text => this.setState({ udaisId: text })}
          onBlur={e => {
            this.validateAndUpdateUdaisId();
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={authStyles.textInput}
          onChangeText={text => this.setState({ password: text })}
          onBlur={e => {
            this.validateAndUpdatePassword();
          }}
        />

        <TextInput
          placeholder="Re-Type Password"
          style={authStyles.textInput}
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({ re_password: text },() => this.validateRePassword());
        }}

        />

        <Text style={{ color: this.state.passwordTextColor }}>
          {this.state.passwordText}
        </Text>
      </View>
    );
  }
}