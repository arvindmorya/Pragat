import React, { Component } from "react";

import { TextInput, StyleSheet, View, Text } from "react-native";

import { fetchSchoolDetails } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

export default class SchoolDetails extends Component {
  constructor() {
    super();
    this.state = {
      school_udise: "",
      cluster: "",
      school_name: "",
      kp: "Kendra Pramukh",
      hasSchoolDetail: false
    };
  }

  updateSchoolDetails = () => {
    this.props.setSchoolDetails({
      clusterId: this.state.cluster,
      schoolId: this.state.school_name,
      kpId: this.state.kp
    });
  };

  getSchoolDetail() {
    let schoolUdiseId = this.state.school_udise;
    if (schoolUdiseId) {
      fetchSchoolDetails(schoolUdiseId)
        .then(responseJson => {
          school = responseJson[0];
          this.setState({
            hasSchoolDetail: true,
            school_name: school.name,
            cluster: school.cluster
          });
        })
        .then(this.updateSchoolDetails())
        .catch(error => {
          this.setState({ hasSchoolDetail: false });
          console.error(error);
        });
    }
  }
  render() {
    return (
      <View>
        <TextInput
          style={authStyles.textInput}
          placeholder="School UDISE"
          onChangeText={text => this.setState({ school_udise: text })}
          onBlur={e => this.getSchoolDetail()}
        />

        {this.state.hasSchoolDetail && (
          <SchoolDetailsView
            school={this.state.school_name}
            cluster={this.state.cluster}
            kp={this.state.kp}
          />
        )}
      </View>
    );
  }
}

class SchoolDetailsView extends Component {
  render() {
    return (
      <View>
        <Text style ={styles.schoolText}>{this.props.school}</Text>
        <Text>Cluster - {this.props.cluster}</Text>
        <Text>Kendra Pramukh - {this.props.kp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schoolText: {
    fontSize: 20,
    fontWeight: "300"
  }
});
