import React, {Component} from 'react';

import {TextInput, View, StyleSheet} from 'react-native';

export default class BasicDetails extends Component {

  constructor(){
    super();
    this.state = {
      name : "",
      email : "",
      phone : "",
    }
  }

  validateAndUpdateName = () => {
    let name = this.state.name;
    if(name && name.length > 0){
      this.props.setName(name, true);
    }
  }

  validateAndUpdatePhoneNumber = () => {
    if(this.state.phone){
      let phoneNumber = this.state.phone;
      let isValidPhoneNumber = (phoneNumber.length === 10) && /^\d+$/.test(phoneNumber);
      if(isValidPhoneNumber) {
        this.props.setPhoneNumber(phoneNumber, true);
      } else {
        this.props.setPhoneNumber(phoneNumber, false);
      }
    }
  }

  validateAndUpdateEmail = () => {
    if(this.state.email){
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(this.state.email)) {
        this.props.setEmailId(this.state.email, true);
      } else {
        this.props.setEmailId(this.state.email, false);
      }
    }
  }

  render(){
    return(
      <View>
        <TextInput
          placeholder = "Name"
          placeHolderStyle = {styles.placeHolderStyle}
          onChangeText = {(text) => this.setState({name:text})}
          onBlur = {(e) => this.validateAndUpdateName()}
        />

        <TextInput
          placeholder = "Mobile"
          keyboardType="phone-pad"
          onChangeText = {(text) => this.setState({phone:text})}
          onBlur = {(e) => this.validateAndUpdatePhoneNumber()}
        />

        <TextInput placeholder = "Email ID"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText = {(text) => this.setState({email:text})}
          onBlur = {(e) => this.validateAndUpdateEmail()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  placeHolderStyle: {
    color: '#111',
    opacity: 0.8,
  },
});
