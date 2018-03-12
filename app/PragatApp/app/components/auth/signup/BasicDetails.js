import React, {Component} from 'react';

import {TextInput, View, StyleSheet} from 'react-native';

export default class BasicDetails extends Component {

  render(){
    return(
      <View>
        <TextInput
          placeholder = "Name"
          placeHolderStyle = {styles.placeHolderStyle}/>
        <TextInput placeholder = "Mobile"/>

        <TextInput placeholder = "Email ID (Optional)"/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  placeHolderStyle: {
    color: '#111',
    opacity: 0.8,
  },
});
