import * as React from "react";

import { View, TouchableHighlight, Text, StyleSheet } from "react-native";

interface Props {
  navigation: any;
}
export default class PreSignUpScreen extends React.Component<Props, any> {
  static navigationOptions = {
    title: "Sign Up",
    headerBackTitle: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style= {styles.buttonText}>Sign Up as</Text>

        <TouchableHighlight
          style={styles.button}
          underlayColor= "#268811"
          onPress={() =>
            this.props.navigation.navigate("signUp", { role: "Teacher" })
          }
        >
          <Text style={styles.buttonText}>Teacher</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor= "#268811"
          onPress={() =>
            this.props.navigation.navigate("signUp", { role: "Kendra Pramukh" })
          }
        >
          <Text style={styles.buttonText}>Kendra Pramukh</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 160,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26B363",
    borderRadius: 80
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "600"
  },
  container: {
    paddingTop: 60,
    paddingBottom: 60,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#217ebc"
  }
});
