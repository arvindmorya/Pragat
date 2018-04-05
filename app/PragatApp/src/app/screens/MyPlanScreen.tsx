import * as React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

interface props {}

interface state {}

export default class MyPlanScreen extends React.Component {
  static navigationOptions = {
    title: "My Plan"
  };
  
  render() {
    return (
      <View style={styles.container}>
          <Text style={{ fontSize: 40, color: "white" }}>My Plans</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#2a8bcc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 24,
    height: 24
  }
});
