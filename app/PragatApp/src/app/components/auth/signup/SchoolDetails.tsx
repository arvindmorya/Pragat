import * as React from "react";

import { TextInput, StyleSheet, View, Text, Alert, Image } from "react-native";

import { NetworkApis } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

interface Props {
  style: any;
  setSchoolDetails: Function;
}

interface state {
  school_udise: string;
  school_name: string;
  schoolId: number;
  cluster_udise: string;
  cluster_name: string;
  clusterId: number;
  kp_udise: string;
  kp_name: string;
  kpId: number;
  hasSchoolDetail: boolean;
  failedToFetchDetails: boolean;
  errorMsg: string;
}
export default class SchoolDetails extends React.Component<Props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      school_udise: "",
      school_name: "",
      schoolId: NaN,
      cluster_udise: "",
      clusterId: NaN,
      cluster_name: "",
      kp_udise: "",
      kp_name: "",
      kpId: NaN,
      hasSchoolDetail: false,
      failedToFetchDetails: false,
      errorMsg: "Failed to fetch school details"
    };
  }

  updateSchoolDetails = () => {
    if (this.state.kp_udise) {
      this.props.setSchoolDetails(
        {
          school_udise_id: this.state.school_udise,
        },
        true
      );
    } else {
      this.props.setSchoolDetails(
        {
          school_udise_id: this.state.school_udise,
        },
        false
      );
    }
  };

  errorFun = (error: any) => {
    this.setState({ failedToFetchDetails: true });
  };
  getSchoolDetail() {
    let schoolUdiseId = this.state.school_udise;
    if (schoolUdiseId) {
      NetworkApis.fetchSchoolDetails(schoolUdiseId, this.errorFun)
        .then(data => {
          console.log(JSON.stringify(data));
          if (data !== undefined && data.error) {
            this.setState({
              hasSchoolDetail: false,
              failedToFetchDetails: true
            });
          } else if (data !== undefined) {
            if (!data.school_name) {
              this.setState({
                hasSchoolDetail: false,
                failedToFetchDetails: true,
                errorMsg: "School Not Found"
              });
            } else if (!data.cluster) {
              this.setState({
                hasSchoolDetail: false,
                failedToFetchDetails: true,
                errorMsg: "Cluster Not Found"
              });
            } else if (!data.kp_name) {
              this.setState({
                hasSchoolDetail: false,
                failedToFetchDetails: true,
                errorMsg: "Kendra Pramukh Not Found"
              });
            } else {
              this.setState(
                {
                  hasSchoolDetail: true,
                  school_name: data.school_name,
                  cluster_udise: data.cluster_udise_id,
                  cluster_name: data.cluster,
                  kp_name: data.kp_name,
                  kp_udise: data.kp_udise_id,
                  schoolId: data.schoolId,
                  clusterId: data.clusterId,
                  kpId: data.kpId,
                },
                () => this.updateSchoolDetails()
              );
            }
          } else {
            this.setState({
              hasSchoolDetail: false,
              failedToFetchDetails: true
            });
          }
        })
        .catch((error: any) => {
          console.log(JSON.stringify(error.message));
          this.setState({ hasSchoolDetail: false, failedToFetchDetails: true });
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={authStyles.textInput}
          placeholder="School UDISE ID"
          onChangeText={text => this.setState({ school_udise: text })}
          onBlur={() => this.getSchoolDetail()}
        />

        {this.state.hasSchoolDetail && (
          <SchoolDetailsView
            school={this.state.school_name}
            cluster={this.state.cluster_udise
              .concat(" / ")
              .concat(this.state.cluster_name)}
            kp={this.state.kp_name}
          />
        )}

        {this.state.failedToFetchDetails &&
          !this.state.hasSchoolDetail && (
            <SchoolDetailsViewFailed errorMsg={this.state.errorMsg} />
          )}
      </View>
    );
  }
}

class SchoolDetailsView extends React.Component<any, any> {
  render() {
    return (
      <View>
        <View style={authStyles.lineH} />
        <Text style={styles.schoolText}>{this.props.school}</Text>
        <Text>Cluster - {this.props.cluster}</Text>
        <Text>Kendra Pramukh - {this.props.kp}</Text>
      </View>
    );
  }
}

class SchoolDetailsViewFailed extends React.Component<any, any> {
  render() {
    return (
      <View>
        <View style={authStyles.lineH} />
        <View style={styles.failedErrorView}>
          <Image style={styles.errorImg} source={require("../../../../../res/images/ic_error.png")} />
          <Text style={{ marginLeft: 30, color: "red" }}>
            {this.props.errorMsg}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schoolText: {
    fontSize: 20,
    fontWeight: "600"
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
  failedErrorView: {
    flex: 1,
    marginTop: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 30
  },
  errorImg: {
    marginLeft: 10,
    height: 25,
    width: 25
  }
});
