import * as React from "react";

import { View, Text, Image } from "react-native";

interface props {}

interface state {}

export default class DashBoardScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
        <View>
          <Text style={{fontSize:20}}>Successfully logged In</Text>
        </View>
      </View>
    );
  }
}
