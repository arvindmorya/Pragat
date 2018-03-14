import React, { Component } from "react";

import { TextInput , StyleSheet, View} from "react-native";

import { fetchSchoolDetails } from "../../../utils/NetworkManager";

export default class SchoolDetails extends Component {
  constructor() {
    super();
    this.state = {
      school_udise: "",
      cluster: "",
      school_name: "",
      kp: "kp",

      hasSchoolDetail: false
    };
  }

  getSchoolDetail() {
    let schoolUdiseId = this.state.school_udise;
    if (schoolUdiseId) {
      fetchSchoolDetails(schoolUdiseId)
        .then(responseJson => {
          this.setState({hasSchoolDetail:true, school_name: responseJson.name, cluster: responseJson.cluster})
        }).catch(error => {
          this.setState({hasSchoolDetail:false})
          console.error(error)});
    }
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="School UdISE"
          onChangeText={text => this.setState({ school_udise: text })}
          onBlur={e => fetchSchoolDetails()}
        />

        {this.state.hasSchoolDetail && <SchoolDetailsView 
        school={this.state.school} cluster={this.state.school} kp = {this.state.kp} />}
      </View>
    );
  }
}

class SchoolDetailsView extends Component {
  render() {
    return (
      <View>
        <Text school>{this.props.school}</Text>
        <Text>Cluster - {this.props.cluster}</Text>
        <Text>Kendra Pramukh - {this.props.kp}</Text>
      </View>
    );
  }
}


const style = StyleSheet.create({
  schoolText:{
    fontSize: 20,
    fontWeight: '300',
  }
})