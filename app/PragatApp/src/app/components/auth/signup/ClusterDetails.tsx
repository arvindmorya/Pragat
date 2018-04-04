import * as React from "react";

import { View, TextInput, Text, StyleSheet, Alert, Image } from "react-native";

import { NetworkApis } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

interface state {
  cluster_udise: string;
  // clusterId: number;
  cluster_name: string;
  // block_name: string;
  // blockId: number;
  hasClusterDetail: boolean;
  failedToFetchDetails: boolean;
  errorMsg: string;
}

interface props {
  style: any;
  setClusterDetails: Function;
}

export default class ClusterDetails extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      cluster_udise: "",
      // clusterId: NaN,
      cluster_name: "",
      // block_name: "",
      // blockId: NaN,
      hasClusterDetail: false,
      failedToFetchDetails: false,
      errorMsg: "Failed to fetch cluster details"
    };
  }

  updateClusterDetails = () => {
    this.props.setClusterDetails(
      {
        cluster_udise_id: this.state.cluster_udise
      },
      true
    );
  };

  getClusterDetail() {
    let clusterUdiseId = this.state.cluster_udise;
    if (clusterUdiseId) {
      NetworkApis.fetchClusterDetails(clusterUdiseId)
        .then((clusterDetail: any) => {
          console.log(JSON.stringify(clusterDetail));
          if (clusterDetail !== undefined && clusterDetail.error) {
            this.setState({
              hasClusterDetail: false,
              failedToFetchDetails: true
            });
          } else if (clusterDetail) {
            if (!clusterDetail.cluster_name) {
              this.setState({
                hasClusterDetail: false,
                failedToFetchDetails: true,
                errorMsg: "Cluster Not Found"
              });
            } else {
              this.setState(
                {
                  hasClusterDetail: true,
                  failedToFetchDetails: false,
                  cluster_name: clusterDetail.cluster_name
                  // clusterId: clusterDetail.clusterId,
                  // block_name: clusterDetail.block_name
                },
                () => this.updateClusterDetails()
              );
            }
          } else {
            this.setState({
              hasClusterDetail: false,
              failedToFetchDetails: true,
              errorMsg: "Cluster Not Found"
            });
          }
        })
        .catch((error: any) => {
          this.setState({
            hasClusterDetail: false,
            failedToFetchDetails: true,
            errorMsg: "Cluster Not Found"
          });
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={authStyles.textInput}
          placeholder="Cluster UDISE ID"
          onChangeText={text => this.setState({ cluster_udise: text })}
          onBlur={() => this.getClusterDetail()}
        />

        {this.state.hasClusterDetail && (
          <ClusterDetailsView cluster={this.state.cluster_name} />
        )}

        {this.state.failedToFetchDetails &&
          !this.state.hasClusterDetail && (
            <ClusterDetailsViewFailed errorMsg={this.state.errorMsg} />
          )}
      </View>
    );
  }
}

interface ClusterProps {
  cluster: string;
}

class ClusterDetailsView extends React.Component<ClusterProps, any> {
  render() {
    return (
      <View>
        <View style={authStyles.lineH} />
        <Text style={styles.clusterText}>{this.props.cluster}</Text>
      </View>
    );
  }
}

class ClusterDetailsViewFailed extends React.Component<any, any> {
  render() {
    return (
      <View>
        <View style={authStyles.lineH} />
        <View style={styles.failedErrorView}>
          <Image source={require("../../../../../res/images/ic_error.png")} />
          <Text style={{ marginLeft: 30, color: "red" }}>
            {this.props.errorMsg}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clusterText: {
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
  }
});
