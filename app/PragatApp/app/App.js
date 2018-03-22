import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation';

import LoginScreen from "./screens/LoginScreen";
import PreSignUpScreen from "./screens/PreSignUpScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const LoginStack = StackNavigator(
  {
    login: {
      screen: LoginScreen,
    },
    preSignUp :{
      screen: PreSignUpScreen,
    },
    signUp: {
      screen: SignUpScreen,
    },
    forgotPassword: {
      screen: ForgotPasswordScreen,
    }
  },
  {
    initialRouteName: 'login',

    navigationOptions : {
      headerStyle: {
        backgroundColor: "#33adff"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


export default class App extends Component {
  render() {
    return (
      <LoginStack />
    );
  }
}
