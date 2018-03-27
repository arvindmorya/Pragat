import * as React from "react";

import { View, Text, Image, StyleSheet} from "react-native";

interface props {}

interface state {}

export default class DashBoardScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={styles.container}>
        <View>
          <Text style={{ fontSize: 40, color: "white"}}>DashBoardScreen</Text>
        </View>
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
  }
});
