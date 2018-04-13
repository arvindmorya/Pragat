import * as React from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { NetworkApis } from "../utils/NetworkManager";

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

interface props {}

interface state {
  isFileSelected: boolean;
  file: any;
  //fileName:string;
  uploadMessage: string;
  showActivityIndicator: boolean;
  isReportSuccessfullyUploaded: boolean;
}

export default class MyClassesScreen extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFileSelected: false,
      file: { name: "", type: "", uri: "" },
      //fileName: "",
      uploadMessage: "",
      showActivityIndicator: false,
      isReportSuccessfullyUploaded: false
    };
  }
  static navigationOptions = {
    title: "My Classes"
  };

  addClass = () => {
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error: any, res: any) => {
        // Android
        console.log("error: " + JSON.stringify(error));
        console.log("res: " + JSON.stringify(res));

        if (error) {
          this.setState({ isFileSelected: false });
        } else if (res) {
          console.log(res.uri, res.type, res.fileName, res.fileSize);
          this.setState({
            isFileSelected: true,
            uploadMessage:"",
            //fileName: res.fileName,
            file: {
              name: res.fileName,
              type: res.type,
              uri: res.uri
            }
          });
        } else {
          this.setState({ isFileSelected: false });
        }
      }
    );
  };

  uploadFile = () => {
    let file = this.state.file;
    if (file && file.uri) {
      this.setState({ uploadMessage: "", showActivityIndicator: true });
      NetworkApis.uploadReport(file)
        .then((responseJson: any) => {
          this.setState({ showActivityIndicator: false });
          if (responseJson && responseJson.error) {
            let error = responseJson.error;
            console.log("response = " + responseJson.error);
            if (error && error.message) {
              this.setState({
                uploadMessage: error.message,
                isReportSuccessfullyUploaded: false
              });
            } else {
              this.setState({
                uploadMessage: "Failed to upload.",
                isReportSuccessfullyUploaded: false
              });
            }
          } else if (responseJson && responseJson.message) {
            console.log("response = " + responseJson.message);
            this.setState({
              uploadMessage: responseJson.message,
              isReportSuccessfullyUploaded: false
            });
          } else if (responseJson && responseJson.result) {
            console.log("successfully uploaded");
            this.setState({
              uploadMessage: "Successfully uploaded",
              isReportSuccessfullyUploaded: true,
              isFileSelected: false
            });
          } else {
            console.log("unkown error");
            this.setState({
              uploadMessage: "Failed to upload.",
              isReportSuccessfullyUploaded: false
            });
          }
        })
        .catch(error => {
          console.log("error : " + JSON.stringify(error));
          this.setState({
            showActivityIndicator: false,
            isReportSuccessfullyUploaded: false,
            uploadMessage: "Failed to upload."
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.isFileSelected && (
          <Button onPress={this.addClass} title="Add Class" color="orange" />
        )}
        {this.state.isFileSelected && (
          <View>
            <Text
              style={{ color: "white", fontWeight: "300", marginBottom: 10 }}
            >
              {this.state.file.name}
            </Text>
            <Button onPress={this.uploadFile} title="Upload" color="orange" />
          </View>
        )}

        <ActivityIndicator
          animating={this.state.showActivityIndicator}
          color="orange"
        />
        <Text style={{ color: "white", fontWeight:"300" }}>{this.state.uploadMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#2a8bcc",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 24,
    height: 24
  }
});
