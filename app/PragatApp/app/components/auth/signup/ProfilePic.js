import React, {Component} from 'react';

import {View, TouchableHighlight, Image, StyleSheet} from 'react-native';

export default class ProfilePic extends Component {
  render () {
    return (
      <View style = {styles.container}>
        <TouchableHighlight
          style = {styles.button}>
          <Image resizeMode="center" source={require('../../../images/addphoto.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:200,
    backgroundColor: "#e6e6e6"
  },

  button:{
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#cccccc",
    borderRadius: 50,
  },

});
