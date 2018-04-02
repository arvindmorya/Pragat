import * as React from "react";

import {
  View,
  TextInput,
  Text,
  Platform,
  Image,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import authStyles from "../styles/authstyles";
import { NetworkApis } from "../utils/NetworkManager";

interface state {}
interface props {
  navigation: any;
}

export default class ForgotPasswordScreen extends React.Component<
  props,
  state
> {
  static navigationOptions = {
    title: "Forgot Password"
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.buttonCotainer}>
        <TouchableHighlight
          style={[styles.button, { marginTop: 50 }]}
          onPress={() => {
            this.props.navigation.navigate("requestOTP");
          }}
        >
          <Text style={styles.buttonText}>Request OTP</Text>
        </TouchableHighlight>

        <View style={{ marginTop: 30 }}>
          <Text style={{marginBottom:10, marginLeft:30}}>Already have OTP?</Text>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("resetPassword");
            }}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonCotainer: {
    flex:1,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#26B363",
    borderRadius: 30
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "400"
  },

  errorView: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 5,
    height: 40,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    padding: 5
  },

  errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    marginLeft: 10
  }
});
