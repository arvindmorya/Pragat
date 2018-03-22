import * as React from "react";

import { View, TextInput, Text, StyleSheet } from "react-native";

import { fetchClusterDetails } from "../../../utils/NetworkManager";
import authStyles from "../../../styles/authstyles";

interface state {
  cluster_udise: string;
  cluster: string;
  block: string;
  district: string;
  hasClusterDetail: boolean;
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
        .then((responseJson: any) => {
          if (responseJson.error) {
            let errorObj: any = responseJson.error;
            if (errorObj.message) {
              alert(
                "Not able to fetch cluster details.\n Reason".concat(
                  errorObj.message
                )
              );
            } else {
              alert("Not able to fetch cluster details");
            }
          } else {
            let cluster = responseJson[0];
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
        .catch((error: any) => {
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
          onBlur={() => this.getClusterDetail()}
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

interface ClusterProps {
  cluster: string;
  block: string;
  district: string;
}
class ClusterDetailsView extends React.Component<ClusterProps, any> {
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
