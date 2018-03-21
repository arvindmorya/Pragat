import React, { Component } from "react";

import { View, TextInput, Text, StyleSheet } from "react-native";

import { fetchClusterDetails } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

export default class ClusterDetails extends Component {
  constructor() {
    super();
    this.state = {
      cluster_udise: "",
      cluster: "",
      block: "",
      district: "",
      hasClusterDetail: false
    };
  }

  updateClusterDetails = () => {
    this.props.setClusterDetails(
      {
        clusterId: this.state.cluster_udise,
        clusterName: this.state.cluster
      },
      true
    );
  };

  getClusterDetail() {
    let clusterUdiseId = this.state.cluster_udise;
    if (clusterUdiseId) {
      fetchClusterDetails(clusterUdiseId)
        .then(responseJson => {
          if (responseJson.error) {
            errorObj = responseJson.error;
            if (errorObj.message) {
              alert("Not able to fetch cluster details.\n Reason".concat(errorObj.message));
            } else {
              alert("Not able to fetch cluster details");
            }
          } else {
            cluster = responseJson[0];
            this.setState(
              {
                hasClusterDetail: true,
                cluster: cluster.cluster,
                block: cluster.block,
                district: cluster.district
              },
              () => this.updateClusterDetails()
            );
          }
        })
        .catch(error => {
          this.setState({
            hasClusterDetail: false,
            cluster: "",
            block: "",
            district: ""
          });
          alert("Not able to fetch cluster details.");
        });
    }
  }
  render() {
    return (
      <View>
        <TextInput
          style={authStyles.textInput}
          placeholder="Cluster UDISE"
          onChangeText={text => this.setState({ cluster_udise: text })}
          onBlur={e => this.getClusterDetail()}
        />

        {this.state.hasClusterDetail && (
          <ClusterDetailsView
            cluster={this.state.cluster}
            block={this.state.block}
            district={this.state.district}
          />
        )}
      </View>
    );
  }
}

class ClusterDetailsView extends Component {
  render() {
    return (
      <View>
        <Text style={styles.clusterText}>Cluster - {this.props.cluster}</Text>
        <Text>Block - {this.props.block}</Text>
        <Text>District - {this.props.district}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clusterText: {
    fontSize: 20,
    fontWeight: "600"
  }
});
