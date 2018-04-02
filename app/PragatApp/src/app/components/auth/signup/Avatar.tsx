import * as React from "react";

import {
  View,
  TouchableHighlight,
  Image,
  PixelRatio,
  StyleSheet, ImageResizeMode,
} from "react-native";

import ImagePicker from "react-native-image-picker";

interface props {
  setAvatar: Function;
}
interface state {
  avatarSource: any;
  resizeMode: any;
}
// var imageResizeMode = {
//   SMALL: 'center',
//   MEDIUM: 2,
//   LARGE: 3,
// };
export default class Avatar extends React.Component<props, state> {
  state = {
    avatarSource: require("../../../../../res/images/ic_add_a_photo.png"),
    resizeMode: "center"
  };

  selectPhotoTapped = () => {
    const options = {
      title: "Select Avatar",
      quality: 0.4,
      maxWidth: 160,
      maxHeight: 160,
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
        let avatar = {uri: response.uri, type: response.type}
        console.log("avatar = "+ JSON.stringify(avatar));
        
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
          resizeMode: 'center',
        });
        this.props.setAvatar(avatar);
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
