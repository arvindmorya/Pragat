import React,{Component} from 'react';

import {ScrollView, Text, Button, TouchableHighlight, StyleSheet} from 'react-native';

import ProfilePic from '../components/auth/signup/ProfilePic';
import BasicDetails from '../components/auth/signup/BasicDetails';
import SchoolDetails from '../components/auth/signup/SchoolDetails';
import AuthDetails from '../components/auth/signup/AuthDetails';


export default class SignUpScreen extends Component{
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    var signup = "SignUp"
    return {
      title: signup.concat(" - ",params ? params.type : ""),
    };
  }

  render(){
    return(
      <ScrollView>
        <ProfilePic />
        <BasicDetails/>
        <SchoolDetails />
        <AuthDetails />
        <TouchableHighlight
          style = {[styles.button,{marginTop:30}]}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  button:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#d9d9d9",
    borderRadius: 30,
  },
  buttonText: {
    color: '#595959',
    fontSize: 20,
    fontWeight: '600',
  },

});
