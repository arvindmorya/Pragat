import * as React from "react";

import { View, Text, Image, StyleSheet, Button } from "react-native";
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
}

export default class MyClassesScreen extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFileSelected: false,
      file: {name:"", type:"", uri:""},
      //fileName: "",
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
      NetworkApis.uploadReport(file)
        .then(responseJson => console.log(JSON.stringify(responseJson)))
        .catch(error => console.log(error));
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
              style={{ color: "white", fontWeight: "300", marginBottom: 10 }}>
              {this.state.file.name}
            </Text>
            <Button onPress={this.uploadFile} title="Upload" color="orange" />
          </View>
        )}
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
