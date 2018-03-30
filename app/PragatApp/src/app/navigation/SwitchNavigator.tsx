import { StackNavigator, SwitchNavigator } from 'react-navigation';

//Auth screens
import LoginScreen from "./../screens/LoginScreen";
import PreSignUpScreen from "./../screens/PreSignUpScreen";
import SignUpScreen from "./../screens/SignUpScreen";
import ForgotPasswordScreen from "./../screens/ForgotPasswordScreen";
import WelcomeScreen from "./../screens/WelcomeScreen";
import ResetPasswordScreen from "./../screens/ResetPasswordScreen";
import RequestOtpScreen from "./../screens/RequestOtpScreen";


// dashboard screen
import DashBoardScreen from "./../screens/DashBoardScreen";

//AuthLoadingscreen
import AuthLoadingscreen from "../navigation/AuthLoadingScreen";
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
      requestOTP: {
        screen: RequestOtpScreen,
      },
      resetPassword: {
        screen: ResetPasswordScreen,
      },
      welcomeScreen: {
        screen: WelcomeScreen,
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
  

const AppStack = StackNavigator({
    dashBoard: {
        screen: DashBoardScreen,
      },
    });

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingscreen,
    App: AppStack,
    Auth: LoginStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);