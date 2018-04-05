import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

interface props {
  navigation: any;
}
export default class AuthLoadingScreen extends React.Component<props, any> {
  constructor(props: any) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let user: string = await AsyncStorage.getItem("user");
    let userToken;
    if (user) {
      try {
        let userJson: any = JSON.parse(user);
        userToken = userJson.accessToken;
      } catch (e) {
        console.log("Exception : " + e.message);
      }
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
