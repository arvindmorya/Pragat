import React, {Component} from 'react';

import {View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

import LoginForm from '../components/auth/LoginForm';

export default class LoginScreen extends Component {

  static navigationOptions = {
      header: null
    }

  onPressForgotPassword = () => {this.props.navigation.navigate("forgotPassword")};

  onPressSignUp = () => {this.props.navigation.navigate("preSignUp")};

  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.loginContainer}>
          <Image resizeMode="cover" style={styles.logo} source={require('../images/gpimage.png')} />
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            onPressForgotPassword = {this.onPressForgotPassword}
            onPressSignUp = {this.onPressSignUp} />
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

    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute'
    }
});
