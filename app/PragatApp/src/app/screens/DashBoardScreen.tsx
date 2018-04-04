import * as React from "react";

import { View, Text, Image, StyleSheet, Button, AsyncStorage } from "react-native";

interface props {
  navigation:any;
}

interface state {}

export default class DashBoardScreen extends React.Component<props,state> {
  static navigationOptions = {
    title: "Dash Board"
  };

  logout = async () => {
    await AsyncStorage.removeItem("user");
    this.props.navigation.navigate("Auth")
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, color: "white" }}>DashBoardScreen</Text>
        <Button onPress={this.logout} title="Logout" color="red" />
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
