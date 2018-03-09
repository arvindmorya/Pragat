import React,{Component} from 'react';

import {Text} from 'react-native';


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
      <Text>SignUpScreen</Text>
    );
  }
}
