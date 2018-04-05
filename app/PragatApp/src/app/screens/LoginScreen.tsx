import * as React from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet
} from "react-native";

import LoginForm from "../components/auth/LoginForm";

interface Props {
  navigation: any;
}
interface State {}
export default class LoginScreen extends React.Component<Props, State> {
  componentDidMount() {
    //this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    //this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {}

  _keyboardDidHide() {}

  static navigationOptions = {
    header: null
  };

  onPressForgotPassword = () => {
    this.props.navigation.navigate("forgotPassword");
    Keyboard.dismiss();
  };

  onPressSignUp = () => {
    this.props.navigation.navigate("preSignUp");
    Keyboard.dismiss();
  };

  onSuccessfullyLoggedIn = () => {
    this.props.navigation.navigate("App");
    Keyboard.dismiss();
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="cover"
            style={styles.logo}
            source={require("../../../res/images/bg_image.png")}
          />
        </View>
        <View>
          <LoginForm
            onPressForgotPassword={this.onPressForgotPassword}
            onPressSignUp={this.onPressSignUp}
            onSuccessfullyLoggedIn={this.onSuccessfullyLoggedIn}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute"
  }
});
