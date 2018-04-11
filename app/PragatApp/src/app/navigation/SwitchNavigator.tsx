import { StackNavigator, SwitchNavigator } from "react-navigation";

import {Text} from "react-native";
//Auth screens
import LoginScreen from "./../screens/LoginScreen";
import PreSignUpScreen from "./../screens/PreSignUpScreen";
import SignUpScreen from "./../screens/SignUpScreen";
import ForgotPasswordScreen from "./../screens/ForgotPasswordScreen";
import WelcomeScreen from "./../screens/WelcomeScreen";
import ResetPasswordScreen from "./../screens/ResetPasswordScreen";
import RequestOtpScreen from "./../screens/RequestOtpScreen";

//AuthLoadingscreen
import AuthLoadingscreen from "../navigation/AuthLoadingScreen";

//
import { DrawerStack } from "../navigation/DrawerNavigator";

const LoginStack = StackNavigator(
  {
    login: {
      screen: LoginScreen
    },
    preSignUp: {
      screen: PreSignUpScreen
    },
    signUp: {
      screen: SignUpScreen
    },
    forgotPassword: {
      screen: ForgotPasswordScreen
    },
    requestOTP: {
      screen: RequestOtpScreen
    },
    resetPassword: {
      screen: ResetPasswordScreen
    },
    welcomeScreen: {
      screen: WelcomeScreen
    }
  },
  {
    initialRouteName: "login",

    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2B8CD6"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppStackDrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: "#2B8CD6"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  })
})


export default SwitchNavigator(
  {
    AuthLoading:{ screen: AuthLoadingscreen},
    App: { screen:AppStackDrawerNavigation},
    Auth: {screen: LoginStack}
  },
  {
    initialRouteName: "AuthLoading"
  }
);
