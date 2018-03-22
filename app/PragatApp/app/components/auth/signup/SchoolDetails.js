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
      kp: "kp",
      hasSchoolDetail: false
    };
  }

  updateSchoolDetails = () => {
    if (this.state.kp) {
      this.props.setSchoolDetails(
        {
          clusterId: this.state.cluster,
          schoolId: this.state.school_name,
          kpId: this.state.kp
        },
        true
      );
    } else {
      this.props.setSchoolDetails(
        {
          clusterId: this.state.cluster,
          schoolId: this.state.school_name,
          kpId: this.state.kp
        },
        false
      );
    }
  };

  getSchoolDetail() {
    let schoolUdiseId = this.state.school_udise;
    if (schoolUdiseId) {
      fetchSchoolDetails(schoolUdiseId)
        .then(responseJson => {
          if (responseJson.error) {
            errorObj = responseJson.error;
            if (errorObj.message) {
              alert("Not able to fetch school details.\n Reason : ".concat(errorObj.message));
            } else {
              alert("Not able to fetch school details.");
            }
          } else {
            school = responseJson[0];
            this.setState(
              {
                hasSchoolDetail: true,
                school_name: school.name,
                cluster: school.cluster
              },
              () => this.updateSchoolDetails()
            );
          }
        })
        .catch(error => {
          this.setState({ hasSchoolDetail: false });
          alert("Not able to fetch school details.");
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
        <Text style={styles.schoolText}>{this.props.school}</Text>
        <Text>Cluster - {this.props.cluster}</Text>
        <Text>Kendra Pramukh - {this.props.kp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schoolText: {
    fontSize: 20,
    fontWeight: "600"
  }
});
