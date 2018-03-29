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
import WelcomeScreen from "./screens/WelcomeScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

console.disableYellowBox = true;

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
    resetPassword: {
      screen: ResetPasswordScreen,
    },
    welcomeScreen: {
      screen: WelcomeScreen,
    },
    dashBoard: {
      screen: DashBoardScreen,
    },
  },
  {
    initialRouteName: 'login',

    navigationOptions : {
      headerStyle: {
        backgroundColor: "#2B8CD6"
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
