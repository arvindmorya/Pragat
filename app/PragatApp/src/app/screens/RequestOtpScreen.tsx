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

interface state {
  email: string;
  isValidEmail: boolean;
  failedMessgae: string;
}
interface props {
  navigation: any;
}

export default class RequestOtpScreen extends React.Component<
  props,
  state> {
  static navigationOptions = {
    title: "Request OTP"
  };

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      isValidEmail: true,
      failedMessgae: "Invalid Email"
    };
  }

  validateEmail = (): any => {
    if (this.state.email) {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return filter.test(this.state.email);
    }
  };

  onCLickRequestOTP = () => {
    let isValid: boolean = this.validateEmail();
    this.setState({ isValidEmail: isValid });
    if (isValid) {
      let request = { email: this.state.email };
      NetworkApis.requestTokenForForgotPassword(request).then(
         (responseJson: any) => {
          //let responseJson =  response.json();
          //console.log("resp: "+JSON.stringify(response));
          console.log("json: "+JSON.stringify(responseJson));
          if (responseJson && responseJson.title) {
            this.props.navigation.navigate("resetPassword");
          } else if (responseJson && responseJson.error) {
            let errorObj = responseJson.error;
            console.log(JSON.stringify(errorObj));
            if(errorObj && errorObj.message) {
              this.setState({ isValidEmail: false, failedMessgae: errorObj.message });
            } else {
              this.setState({ isValidEmail: false, failedMessgae: "Internal Error - (2)" });
            }
          }
          else {
            this.setState({ isValidEmail: false, failedMessgae: "Internal Error - (1)" });
          }
        } 
      );
    }
  };

  render() {
    return (
      <View>
        {/* <View style={styles.inputTextContainerView}>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Email ID"
            placeholderTextColor= "red"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[authStyles.textInput, { flex: 11 }]}
            onChangeText={text => this.setState({ email: text })}
            onBlur={() => this.validateAndUpdateEmail()}
          />
          {!this.state.isValidEmail && (
            <Image
              style={[styles.errorImg, { flex: 1 }]}
              source={require("../../../res/images/ic_error.png")}
            />
          )}
        </View> */}

        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[
            authStyles.textInput,
            {
              marginTop: 30,
              backgroundColor: "#fff",
              padding: 20
            }
          ]}
          onChangeText={text => this.setState({ email: text })}
        />

        <View style={{ height: 30, marginBottom: 20 }}>
          {!this.state.isValidEmail && (
            <View style={styles.errorView}>
              <Image
                style={styles.errorImg}
                source={require("../../../res/images/ic_error.png")}
              />
              <Text style={styles.label}>{this.state.failedMessgae}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonCotainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onCLickRequestOTP}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonCotainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
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
