import * as React from "react";

import {
  View,
  TouchableHighlight,
  Image,
  PixelRatio,
  StyleSheet
} from "react-native";

import ImagePicker from "react-native-image-picker";

interface state {
  avatarSource: any;
  resizeMode: any;
}
export default class ProfilePic extends React.Component<any, state> {
  state = {
    avatarSource: require("../../../../../res/images/addphoto.png"),
    resizeMode: "center"
  };

  selectPhotoTapped = () => {
    const options = {
      title: "Select Avatar",
      quality: 0.1,
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        //console.log(JSON.stringify(response))
        let source = { uri: response.uri };
        console.log("uri = "+source.uri);
        console.log("fileSize = "+response.fileSize);
        console.log("fileName = "+response.fileName);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          resizeMode: "stretch"
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.button, styles.avatarContainer]}
          onPress={this.selectPhotoTapped}
        >
          <Image
            style={styles.avatar}
            source={this.state.avatarSource}
            //TODO:
            //resizeMode={this.state.resizeMode}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    backgroundColor: "#e6e6e6"
  },

  button: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccc",
    borderRadius: 50
  },

  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },

  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100
  }
});
