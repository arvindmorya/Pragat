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
      email: "",
      isValidEmail: true,
      failedMessgae: "Invalid Email"
    };
  }

  validateEmail = ():any => {
    if (this.state.email) {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return filter.test(this.state.email);
    }
  };
  
  onCLickRequestOTP = () => {
    let isValid:boolean = this.validateEmail();
    this.setState({ isValidEmail: isValid });
    if(isValid) {
      let request = {"email": this.state.email}
      NetworkApis.requestTokenForForgotPassword(request)
      .then((response:any) => {
        if(response.status === 200) {
          this.props.navigation.navigate("resetPassword")
        } else {
          this.setState({isValidEmail:false, failedMessgae:"Request Failed"})
        }
      })
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
            onPress={() => {
              this.props.navigation.navigate("resetPassword");
            }}
          >
            <Text style={styles.buttonText}>Already have OTP</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, { marginTop: 30 }]}
            onPress={this.onCLickRequestOTP}
          >
            <Text style={styles.buttonText}>Request OTP</Text>
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
    marginLeft:40,
    marginRight:40,
    marginBottom:20,
    padding: 5,
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
