import * as React from "react";

import { View, TextInput, Text, StyleSheet, Alert, Image } from "react-native";

import { NetworkApis } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

interface state {
  cluster_udise: string;
  clusterId: number;
  cluster: string;
  block_name: string;
  blockId: number;
  hasClusterDetail: boolean;
  failedToFetchDetails: boolean;
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
      clusterId: NaN,
      cluster: "",
      block_name: "",
      blockId: NaN,
      hasClusterDetail: false,
      failedToFetchDetails: false
    };
  }

  updateClusterDetails = () => {
    this.props.setClusterDetails(
      {
        clusterId: this.state.clusterId,
        clusterName: this.state.cluster
      },
      true
    );
  };

  getClusterDetail() {
    let clusterUdiseId = this.state.cluster_udise;
    if (clusterUdiseId) {
      NetworkApis.fetchClusterDetails(clusterUdiseId)
        .then((clusterDetail: any) => {
          if (clusterDetail !== undefined && clusterDetail.error) {
            this.setState({failedToFetchDetails: true});
          } else if (clusterDetail) {
            this.setState(
              {
                hasClusterDetail: true,
                failedToFetchDetails: false,
                cluster: clusterDetail.cluster,
                clusterId: clusterDetail.clusterId,
                block_name: clusterDetail.block_name
              },
              () => this.updateClusterDetails()
            );
          } else {
            this.setState({hasClusterDetail: false,failedToFetchDetails: true});
          }
        })
        .catch((error: any) => {
          this.setState({hasClusterDetail: false,failedToFetchDetails: true});
        });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={authStyles.textInput}
          placeholder="Cluster UDISE"
          onChangeText={text => this.setState({ cluster_udise: text })}
          onBlur={() => this.getClusterDetail()}
        />

        {this.state.hasClusterDetail && (
          <ClusterDetailsView
            cluster={this.state.cluster}
            block={this.state.block_name}
          />
        )}

        {this.state.failedToFetchDetails && !this.state.hasClusterDetail && 
        <ClusterDetailsViewFailed />}
      </View>
    );
  }
}

interface ClusterProps {
  cluster: string;
  block: string;
}

class ClusterDetailsView extends React.Component<ClusterProps, any> {
  render() {
    return (
      <View>
        <View style={authStyles.lineH} />
        <Text style={styles.clusterText}>{this.props.cluster}</Text>
        <Text>Block : {this.props.block}</Text>
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
          <Text style={{marginLeft:30, color:"red"}}>Failed to fetch school details</Text>
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
    marginTop:10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: 'center',
    height: 30
  }
});