import React, {Component} from 'react';

import {View, TextInput, Text} from 'react-native'
export default class AuthDetails extends Component {
  render () {
    return (
      <View style={{flex:1}}>
        <TextInput placeholder = "UDAIS ID"/>

        <TextInput placeholder = "Password"/>

        <TextInput placeholder = "Re-Type Password"/>

        <Text> * Password should be of minimum eight characters </Text>
      </View>
    );
  }
}
