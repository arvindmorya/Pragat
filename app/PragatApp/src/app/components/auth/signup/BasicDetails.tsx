import * as React from "react";

import { TextInput, View, StyleSheet, Image } from "react-native";

import authStyles from "../../../styles/authstyles";

interface state {
  name: string;
  email: string;
  phone: string;
  isValidEmail:boolean;
  isValidPhone:boolean;
}
interface props {
  setName: Function;
  setPhoneNumber: Function;
  setEmailId: Function;
}
export default class BasicDetails extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      isValidEmail: true,
      isValidPhone: true,
    };
  }

  validateAndUpdateName = () => {
    let name = this.state.name;
    if (name && name.length > 0) {
      this.props.setName(name, true);
    } else {
      this.props.setName(name, false);
    }
  };

  validateAndUpdatePhoneNumber = () => {
    if (this.state.phone) {
      let phoneNumber = this.state.phone;
      let isValidPhoneNumber =
        phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
        this.setState({isValidPhone: isValidPhoneNumber});
      if (isValidPhoneNumber) {
        this.props.setPhoneNumber(phoneNumber, true);
      } else {
        this.props.setPhoneNumber(phoneNumber, false);
      }
    }
  };

  validateAndUpdateEmail = () => {
    if (this.state.email) {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(this.state.email)) {
        this.setState({isValidEmail: true});
        this.props.setEmailId(this.state.email, true);
      } else {
        this.setState({isValidEmail: false});
        this.props.setEmailId(this.state.email, false);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          underlineColorAndroid={"transparent"}
          style={authStyles.textInput}
          onChangeText={text => this.setState({ name: text })}
          onBlur={() => this.validateAndUpdateName()}
        />

        <View style={authStyles.lineH} />
        <View style = {styles.inputContainerView}>
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Mobile"
            keyboardType="phone-pad"
            style={[authStyles.textInput,{flex:11}]}
            onChangeText={text => this.setState({ phone: text })}
            onBlur={() => this.validateAndUpdatePhoneNumber()}
          />
          { !this.state.isValidPhone && 
          <Image style={[styles.errorImg,{flex:1}]} source={require("../../../../../res/images/ic_error.png")} />}

        </View>

        <View style={authStyles.lineH} />

        <View style = {styles.inputContainerView}>
        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[authStyles.textInput,{flex:11}]}
          onChangeText={text => this.setState({ email: text })}
          onBlur={() => this.validateAndUpdateEmail()}
        />
        { !this.state.isValidEmail && 
          <Image style={[styles.errorImg,{flex:1}]} source={require("../../../../../res/images/ic_error.png")} />}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  placeHolderStyle: {
    color: "#111",
    opacity: 0.8
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  }, errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  }
});
