import * as React from "react";

import { TextInput, StyleSheet, View, Text } from "react-native";

import { NetworkApis } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

interface Props {
  style: any;
  setSchoolDetails: Function;
}

interface state {
  school_udise: string;
  school_name: string;
  schoolId:number
  cluster_udise: string;
  cluster_name: string;
  clusterId: number,
  kp_udise: string,
  kp_name: string,
  kpId:number,
  hasSchoolDetail: boolean;
}
export default class SchoolDetails extends React.Component<Props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      school_udise: "",
      school_name: "",
      schoolId: NaN,
      cluster_udise : "",
      clusterId:NaN,
      cluster_name : "",
      kp_udise:"",
      kp_name: "",
      kpId:NaN,
      hasSchoolDetail: false
    };
  }

  updateSchoolDetails = () => {
    if (this.state.kp_udise) {
      this.props.setSchoolDetails(
        {
          clusterId: this.state.clusterId,
          schoolId: this.state.schoolId,
          kpId: this.state.kpId
        },
        true
      );
    } else {
      this.props.setSchoolDetails(
        {
          clusterId: this.state.cluster_udise,
          schoolId: this.state.school_udise,
          kpId: this.state.kp_udise
        },
        false
      );
    }
  };
  errorFun = (error: any) => {
    alert("Error \n ".concat(JSON.stringify(error)));
  };
  // let schoolDetail: any = {
  //   school_name: "",
  //   cluster: "",
  //   cluster_udise_id: "",
  //   kp_name: "",
  //   kp_udise_id: ""
  // };
  getSchoolDetail() {
    let schoolUdiseId = this.state.school_udise;
    if (schoolUdiseId) {
      NetworkApis.fetchSchoolDetails(schoolUdiseId, this.errorFun)
        .then(data => {
          if (data !== undefined) {
            this.setState(
              {
                hasSchoolDetail: true,
                school_name: data.school_name,
                cluster_udise: data.cluster_udise_id,
                cluster_name: data.cluster,
                kp_name: data.kp_name,
                kp_udise:data.kp_udise_id,
              },
              () => this.updateSchoolDetails()
            );
          } else {
            alert("not able to fetch the data");
          }
        })
        .catch((error: any) => {
          this.setState({ hasSchoolDetail: false });
          alert("Not able to fetch school details.\n".concat(error));
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={authStyles.textInput}
          placeholder="School UDISE"
          onChangeText={text => this.setState({ school_udise: text })}
          onBlur={() => this.getSchoolDetail()}
        />

        {this.state.hasSchoolDetail && (
          <SchoolDetailsView
            school={this.state.school_name}
            cluster={this.state.cluster_udise.concat(" / ").concat(this.state.cluster_name)}
            kp={this.state.kp_name}
          />
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
  }
});
