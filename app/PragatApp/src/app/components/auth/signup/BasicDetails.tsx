import * as React from "react";

import { TextInput, View, StyleSheet } from "react-native";

import authStyles from "../../../styles/authstyles";

interface state {
  name: string;
  email: string;
  phone: string;
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
      phone: ""
    };
  }

  validateAndUpdateName = () => {
    let name = this.state.name;
    if (name && name.length > 0) {
      this.props.setName(name, true);
    }
  };

  validateAndUpdatePhoneNumber = () => {
    if (this.state.phone) {
      let phoneNumber = this.state.phone;
      let isValidPhoneNumber =
        phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
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
        this.props.setEmailId(this.state.email, true);
      } else {
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
          // TODO:
          //placeHolderStyle = {styles.placeHolderStyle}
          onChangeText={text => this.setState({ name: text })}
          onBlur={() => this.validateAndUpdateName()}
        />

        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Mobile"
          keyboardType="phone-pad"
          style={authStyles.textInput}
          onChangeText={text => this.setState({ phone: text })}
          onBlur={() => this.validateAndUpdatePhoneNumber()}
        />

        <TextInput
          underlineColorAndroid={"transparent"}
          placeholder="Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          style={authStyles.textInput}
          onChangeText={text => this.setState({ email: text })}
          onBlur={() => this.validateAndUpdateEmail()}
        />
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
    paddingRight: 20
  }
});
