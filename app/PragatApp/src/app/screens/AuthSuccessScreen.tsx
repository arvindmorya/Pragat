import * as React from "react";

import { View, Text, Image } from "react-native";

interface props {}

interface state {}

export default class AuthSuccessScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View>
          <Text>Plan your Day & Month</Text>
          <Text>Manage Classes & Assesment</Text>
          <Text>Track Sikshan Parishad Meetings</Text>
          <Text>and</Text>
          <Text>Collaborate With other teachers</Text>
        </View>
      </View>
    );
  }
}
