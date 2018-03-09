import React,{Component} from 'react';

import {View, TouchableHighlight,Text, StyleSheet} from 'react-native'

export default class PreSignUpScreen extends Component {
  static navigationOptions = {
    title: "Sign Up"
  }

  render(){
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>

        <TouchableHighlight
          style={styles.button}
          onPress = { () => this.props.navigation.navigate('signUp', {type: "Teacher"})} >

          <Text style={styles.buttonText}>Teacher</Text>

        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress = { () => this.props.navigation.navigate('signUp', {type: "Cluster Head"})}>

          <Text style={styles.buttonText}>Cluster Head</Text>

        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    height: 200,
    width:200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00cc66",
    borderRadius: 100,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
});
