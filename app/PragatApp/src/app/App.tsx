import * as React from 'react';
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
import DashBoardScreen from "./screens/DashBoardScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AuthSuccessScreen from "./screens/AuthSuccessScreen";

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
    },
    authSuccess: {
      screen: AuthSuccessScreen,
    },
    dashBoard: {
      screen: DashBoardScreen,
    },
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


export default class App extends React.Component {
  render() {
    return (
      <LoginStack />
    );
  }
}
