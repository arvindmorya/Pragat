import * as React from "react";

import {
  View,
  TextInput,
  Text,
  Platform,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import authStyles from "../styles/authstyles";

interface state {
  hasToken: boolean;
  email: string;
  password: string;
}
interface props {}
export default class ForgotPasswordScreen extends React.Component<
  props,
  state
> {
  static navigationOptions = {
    title: "Forgot Password"
  };

  constructor(props: any) {
    super(props);
    this.state = {
      hasToken: false,
      email: "",
      password: ""
    };
  }

  setHasToken = () => {
    this.setState({ hasToken: true });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          style={authStyles.textInput}
          onChangeText={text => this.setState({ email: text })}
        />

        {!this.state.hasToken && (
          <View style={{ marginTop: 30 }}>
            <TouchableHighlight
              style={[styles.button, styles.clickButton, { marginTop: 30 }]}
              onPress={this.setHasToken}
            >
              <Text style={styles.buttonText}>Already have access code</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.button, styles.clickButton, { marginTop: 30 }]}
            >
              <Text style={styles.buttonText}>Get Access Token</Text>
            </TouchableHighlight>
          </View>
        )}

        {this.state.hasToken && (
          <View style={{ marginTop: 30 }}>

            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Enter your access token here"
              autoCapitalize="none"
              style={authStyles.textInput}
              onChangeText={text => this.setState({ email: text })}
            />

            <View style={authStyles.lineH} />

            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Password"
              secureTextEntry={true}
              style={authStyles.textInput}
            />

            <View style={authStyles.lineH} />

            <TextInput
              underlineColorAndroid={"transparent"}
              placeholder="Re-Type Password"
              style={authStyles.textInput}
              secureTextEntry={true}
            />

            <TouchableHighlight
              style={[styles.button, styles.clickButton, { marginTop: 30 }]}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  placeHolderStyle: {
    color: "#111",
    opacity: 0.8
  },

  textInput: {
    backgroundColor: "#f5f5f5",
    opacity: 0.8,
    ...Platform.select({
      ios: {
        height: 40
      }
    }),
    paddingLeft: 15,
    borderRadius: 30
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  clickButton: {
    backgroundColor: "#00cc66",
    borderRadius: 30
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "600"
  },

  label: {
    color: "#FAFAFA",
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center"
  },

  errorView: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ff4444",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    backgroundColor: "#111",
    opacity: 0.6
  }
});
