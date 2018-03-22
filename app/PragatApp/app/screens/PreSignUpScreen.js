import React,{Component} from 'react';

import {View, TouchableHighlight,Text, StyleSheet} from 'react-native'

export default class PreSignUpScreen extends Component {
  static navigationOptions = {
    title: "Sign Up",
    headerBackTitle : null,
  }

  render(){
    return(
      <View style={{flex: 1, justifyContent: "space-around", alignItems: 'center'}}>

        <Text>Sign up As</Text>

        <TouchableHighlight
          style={styles.button}
          onPress = { () => this.props.navigation.navigate('signUp', {role: "Teacher"})} >

          <Text style={styles.buttonText}>Teacher</Text>

        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress = { () => this.props.navigation.navigate('signUp', {role: "Kendra Pramukh"})}>

          <Text style={styles.buttonText}>Kendra Pramukh</Text>

        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    height: 160,
    width:160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00cc66",
    borderRadius: 80,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
});
