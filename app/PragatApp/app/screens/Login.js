import React, {Component} from 'react';

import {View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

import LoginForm from '../components/LoginForm'

export default class Login extends Component {
  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.loginContainer}>
          <Image resizeMode="cover" style={styles.logo} source={require('../images/gpimage.png')} />
        </View>

        <View style={styles.formContainer}>
          <LoginForm />
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
