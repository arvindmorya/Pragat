import React, {Component} from 'react';

import {View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

export default class LoginForm extends Component {
  render(){
    return(
      <View style = {styles.container}>
        <TextInput
          underlineColorAndroid={'transparent'}
          placeHolderText = {"Username"}
          placeHolderStyle = {styles.placeHolderStyle}
          style = {styles.textInput}
          />

        <TextInput
          underlineColorAndroid={'transparent'}
          placeHolderStyle = {styles.placeHolderStyle}
          style = {[styles.textInput, {marginTop:20}]}
        />

        <TouchableHighlight
          style = {[styles.button, styles.clickButton,{marginTop:30}]}>
          <Text style= {styles.buttonText}> Login </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style = {styles.button}>
          <Text  style= {styles.buttonText}> Forgot Password? </Text>
        </TouchableHighlight>

        <Text style= {styles.label}>Or</Text>

        <TouchableHighlight
          style = {styles.button}>
          <Text style= {styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    padding:40
  },
  placeHolderStyle: {
    color: '#111',
  },

  textInput:{
    backgroundColor: "#f5f5f5",
    opacity: 0.8,
    borderRadius: 30
  },

  button:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  clickButton: {
    backgroundColor: "#00cc66",
    borderRadius: 30,
  },

  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },

  label: {
    color: '#FAFAFA',
    fontSize: 15,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
